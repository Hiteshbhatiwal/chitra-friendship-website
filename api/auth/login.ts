import type { IncomingMessage, ServerResponse } from 'http';
import {
  loadEnvConfig,
  verifyPassphrase,
  createSessionToken,
  sendJson,
  readBody
} from '../../server/authMiddleware.ts';

// In-memory rate limiting per serverless container
const loginAttempts = new Map<string, { attempts: number; lockedUntil: number }>();

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendJson(res, 405, { error: 'Method Not Allowed' });
  }

  const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const limit = loginAttempts.get(ip);
  if (limit && limit.lockedUntil > now) {
    const remainingSeconds = Math.ceil((limit.lockedUntil - now) / 1000);
    return sendJson(res, 429, {
      success: false,
      error: `Too many attempts. Please try again in ${remainingSeconds} seconds.`
    });
  }

  const config = loadEnvConfig(process.cwd());

  if (!config.passphrase) {
    return sendJson(res, 500, {
      success: false,
      error: 'Authentication is not configured on this server. Please set SITE_PASSPHRASE in Vercel Environment Variables.'
    });
  }

  try {
    let data: any = (req as any).body;
    if (!data || typeof data === 'string') {
      const raw = typeof data === 'string' ? data : await readBody(req);
      try {
        data = JSON.parse(raw || '{}');
      } catch {
        data = {};
      }
    }

    const inputPassphrase = typeof data?.passphrase === 'string' ? data.passphrase.trim() : '';

    // Artificial delay to prevent timing attacks
    await new Promise((r) => setTimeout(r, 300));

    if (!inputPassphrase || !verifyPassphrase(inputPassphrase, config.passphrase)) {
      const current = loginAttempts.get(ip) || { attempts: 0, lockedUntil: 0 };
      current.attempts += 1;
      if (current.attempts >= 6) {
        current.lockedUntil = now + 60 * 1000;
      }
      loginAttempts.set(ip, current);

      return sendJson(res, 401, {
        success: false,
        error: 'Incorrect passphrase. Please try again! 🌸'
      });
    }

    // Reset rate limit on success
    loginAttempts.delete(ip);

    const token = createSessionToken(config.sessionSecret, config.maxAgeHours);
    const maxAgeSeconds = config.maxAgeHours * 3600;
    const isSecure = process.env.NODE_ENV === 'production' || req.headers['x-forwarded-proto'] === 'https';

    res.setHeader(
      'Set-Cookie',
      `chitra_session=${token}; Path=/; Max-Age=${maxAgeSeconds}; HttpOnly; SameSite=Strict${isSecure ? '; Secure' : ''}`
    );

    return sendJson(res, 200, {
      success: true,
      message: "Welcome to Chitra's Little World! 💖"
    });
  } catch (err) {
    return sendJson(res, 400, {
      success: false,
      error: 'Invalid request payload'
    });
  }
}
