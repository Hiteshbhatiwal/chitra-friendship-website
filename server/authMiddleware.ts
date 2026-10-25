import type { IncomingMessage, ServerResponse } from 'http';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';

export interface AuthConfig {
  passphrase?: string;
  sessionSecret: string;
  maxAgeHours: number;
  privateMediaDir: string;
}

// In-memory rate limiting to protect against brute-force attacks
interface RateLimitRecord {
  attempts: number;
  lockedUntil: number;
}
const rateLimitMap = new Map<string, RateLimitRecord>();

// Simple .env parser in case environment variables aren't yet loaded in Node process
export function loadEnvConfig(rootDir: string): AuthConfig {
  const envPath = path.join(rootDir, '.env');
  let passphrase = process.env.SITE_PASSPHRASE;
  let sessionSecret = process.env.SESSION_SECRET;
  let maxAgeHours = parseInt(process.env.SESSION_MAX_AGE_HOURS || '24', 10);

  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const [key, ...vals] = trimmed.split('=');
      const val = vals.join('=').trim().replace(/^["']|["']$/g, '');
      if (key === 'SITE_PASSPHRASE' && !passphrase) passphrase = val;
      if (key === 'SESSION_SECRET' && !sessionSecret) sessionSecret = val;
      if (key === 'SESSION_MAX_AGE_HOURS' && !process.env.SESSION_MAX_AGE_HOURS) {
        maxAgeHours = parseInt(val, 10) || 24;
      }
    }
  }

  // Fallback secret for development if none configured
  if (!sessionSecret) {
    sessionSecret = 'chitra-dev-fallback-secret-minimum-32-chars-long';
  }

  return {
    passphrase,
    sessionSecret,
    maxAgeHours,
    privateMediaDir: path.join(rootDir, 'private_media')
  };
}

// Cookie parser helper
export function parseCookies(header?: string): Record<string, string> {
  const list: Record<string, string> = {};
  if (!header) return list;
  for (const cookie of header.split(';')) {
    const parts = cookie.split('=');
    if (parts.length >= 2) {
      list[parts[0].trim()] = decodeURIComponent(parts.slice(1).join('=').trim());
    }
  }
  return list;
}

// Session token generator (HMAC-SHA256)
export function createSessionToken(secret: string, maxAgeHours: number): string {
  const exp = Date.now() + maxAgeHours * 60 * 60 * 1000;
  const payload = JSON.stringify({ exp, iat: Date.now(), user: 'chitra' });
  const b64Payload = Buffer.from(payload).toString('base64url');
  const signature = crypto.createHmac('sha256', secret).update(b64Payload).digest('base64url');
  return `${b64Payload}.${signature}`;
}

// Session token validator
export function verifySessionToken(token: string | undefined, secret: string): boolean {
  if (!token || !token.includes('.')) return false;
  const [b64Payload, signature] = token.split('.');
  if (!b64Payload || !signature) return false;

  const expectedSignature = crypto.createHmac('sha256', secret).update(b64Payload).digest('base64url');
  
  // Timing-safe comparison of signatures
  const sigBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);
  if (sigBuffer.length !== expectedBuffer.length) return false;
  if (!crypto.timingSafeEqual(sigBuffer, expectedBuffer)) return false;

  try {
    const payload = JSON.parse(Buffer.from(b64Payload, 'base64url').toString('utf8'));
    if (!payload.exp || typeof payload.exp !== 'number') return false;
    return Date.now() < payload.exp;
  } catch {
    return false;
  }
}

// Timing-safe passphrase checker
export function verifyPassphrase(input: string, correct: string): boolean {
  const inputHash = crypto.createHash('sha256').update(input).digest();
  const correctHash = crypto.createHash('sha256').update(correct).digest();
  return crypto.timingSafeEqual(inputHash, correctHash);
}

// Helper to send JSON response
export function sendJson(res: ServerResponse, statusCode: number, data: unknown) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

// Helper to determine Content-Type
export function getMimeType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.webp':
      return 'image/webp';
    case '.mp4':
      return 'video/mp4';
    case '.webm':
      return 'video/webm';
    case '.mp3':
      return 'audio/mpeg';
    case '.txt':
      return 'text/plain; charset=utf-8';
    default:
      return 'application/octet-stream';
  }
}

// Helper to read JSON request body
export function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 1e5) {
        req.destroy();
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

/**
 * Main Auth & Media Middleware for Connect/Express/Vite
 */
export function createAuthMiddleware(config: AuthConfig) {
  return async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
    const url = req.url || '';
    const ip = req.socket.remoteAddress || 'unknown';

    // Route: POST /api/auth/login
    if (url === '/api/auth/login' && req.method === 'POST') {
      // Check rate limit
      const now = Date.now();
      const limit = rateLimitMap.get(ip);
      if (limit && limit.lockedUntil > now) {
        const remainingSeconds = Math.ceil((limit.lockedUntil - now) / 1000);
        return sendJson(res, 429, {
          success: false,
          error: `Too many attempts. Please try again in ${remainingSeconds} seconds.`
        });
      }

      try {
        const rawBody = await readBody(req);
        const data = JSON.parse(rawBody || '{}');
        const inputPassphrase = typeof data.passphrase === 'string' ? data.passphrase.trim() : '';

        if (!config.passphrase) {
          return sendJson(res, 500, {
            success: false,
            error: 'Authentication is not configured on this server. Please set SITE_PASSPHRASE in .env'
          });
        }

        // Artificial delay (350ms) to prevent brute-force timing
        await new Promise((r) => setTimeout(r, 350));

        if (!inputPassphrase || !verifyPassphrase(inputPassphrase, config.passphrase)) {
          // Increment rate limit attempts
          const currentRecord = rateLimitMap.get(ip) || { attempts: 0, lockedUntil: 0 };
          currentRecord.attempts += 1;
          if (currentRecord.attempts >= 6) {
            currentRecord.lockedUntil = now + 60 * 1000; // Lock for 60 seconds
          }
          rateLimitMap.set(ip, currentRecord);

          return sendJson(res, 401, {
            success: false,
            error: 'Incorrect passphrase. Please try again! 🌸'
          });
        }

        // Reset rate limit on success
        rateLimitMap.delete(ip);

        // Generate session token and set secure HttpOnly cookie
        const token = createSessionToken(config.sessionSecret, config.maxAgeHours);
        const maxAgeSeconds = config.maxAgeHours * 3600;
        
        res.setHeader(
          'Set-Cookie',
          `chitra_session=${token}; Path=/; Max-Age=${maxAgeSeconds}; HttpOnly; SameSite=Strict`
        );

        return sendJson(res, 200, {
          success: true,
          message: 'Welcome to Chitra\'s Little World! 💖'
        });
      } catch (err) {
        return sendJson(res, 400, {
          success: false,
          error: 'Invalid request body'
        });
      }
    }

    // Route: GET /api/auth/status
    if (url === '/api/auth/status' && req.method === 'GET') {
      const cookies = parseCookies(req.headers.cookie);
      const isAuthenticated = verifySessionToken(cookies.chitra_session, config.sessionSecret);
      return sendJson(res, 200, { authenticated: isAuthenticated });
    }

    // Route: POST /api/auth/logout
    if (url === '/api/auth/logout' && req.method === 'POST') {
      res.setHeader(
        'Set-Cookie',
        `chitra_session=; Path=/; Max-Age=0; HttpOnly; SameSite=Strict`
      );
      return sendJson(res, 200, {
        success: true,
        message: 'Logged out successfully'
      });
    }

    // Route: GET /api/media/* (PROTECTED MEDIA DELIVERY)
    if (url.startsWith('/api/media/')) {
      const cookies = parseCookies(req.headers.cookie);
      const isAuthenticated = verifySessionToken(cookies.chitra_session, config.sessionSecret);

      if (!isAuthenticated) {
        res.setHeader('Cache-Control', 'no-store, private');
        return sendJson(res, 401, {
          error: 'Unauthorized: Private memories are locked 🔒. Please unlock the scrapbook with the secret passphrase.'
        });
      }

      // Extract filename and strictly sanitize to prevent directory traversal
      const rawFilename = url.replace('/api/media/', '').split('?')[0];
      const decodedFilename = decodeURIComponent(rawFilename);

      if (rawFilename.includes('..') || decodedFilename.includes('..') || decodedFilename.includes('/') || decodedFilename.includes('\\')) {
        return sendJson(res, 403, { error: 'Forbidden: Path traversal characters are not permitted' });
      }

      const safeFilename = path.basename(decodedFilename);
      const targetFilePath = path.join(config.privateMediaDir, safeFilename);

      // Verify that the resolved path is strictly inside the privateMediaDir
      const relative = path.relative(config.privateMediaDir, targetFilePath);
      if (relative.startsWith('..') || path.isAbsolute(relative)) {
        return sendJson(res, 403, { error: 'Forbidden path traversal attempt' });
      }

      if (!fs.existsSync(targetFilePath) || !fs.statSync(targetFilePath).isFile()) {
        return sendJson(res, 404, { error: 'Media file not found in private storage' });
      }

      // Stream the private media file with secure caching headers
      const mimeType = getMimeType(targetFilePath);
      res.statusCode = 200;
      res.setHeader('Content-Type', mimeType);
      res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      res.setHeader('X-Content-Type-Options', 'nosniff');

      const stream = fs.createReadStream(targetFilePath);
      stream.pipe(res);
      return;
    }

    // Continue to next middleware
    next();
  };
}
