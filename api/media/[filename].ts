import type { IncomingMessage, ServerResponse } from 'http';
import * as fs from 'fs';
import * as path from 'path';
import {
  loadEnvConfig,
  parseCookies,
  verifySessionToken,
  getMimeType,
  sendJson
} from '../../server/authMiddleware.ts';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    return sendJson(res, 405, { error: 'Method Not Allowed' });
  }

  const config = loadEnvConfig(process.cwd());
  const cookies = (req as any).cookies || parseCookies(req.headers.cookie);
  const isAuthenticated = verifySessionToken(cookies.chitra_session, config.sessionSecret);

  if (!isAuthenticated) {
    res.setHeader('Cache-Control', 'no-store, private');
    return sendJson(res, 401, {
      error: 'Unauthorized: Private memories are locked 🔒. Please unlock the scrapbook with the secret passphrase.'
    });
  }

  // Extract filename from query parameter or url
  const rawParam = (req as any).query?.filename || (req.url || '').replace(/^\/api\/media\/?/, '').split('?')[0];
  const decodedFilename = decodeURIComponent(String(rawParam || ''));

  if (!decodedFilename || decodedFilename.includes('..') || decodedFilename.includes('/') || decodedFilename.includes('\\')) {
    return sendJson(res, 403, { error: 'Forbidden: Path traversal characters are not permitted' });
  }

  const safeFilename = path.basename(decodedFilename);
  const targetFilePath = path.join(config.privateMediaDir, safeFilename);

  // Strictly verify path stays within privateMediaDir
  const relative = path.relative(config.privateMediaDir, targetFilePath);
  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    return sendJson(res, 403, { error: 'Forbidden path traversal attempt' });
  }

  if (!fs.existsSync(targetFilePath) || !fs.statSync(targetFilePath).isFile()) {
    return sendJson(res, 404, { error: 'Media file not found in private storage' });
  }

  const mimeType = getMimeType(targetFilePath);
  res.statusCode = 200;
  res.setHeader('Content-Type', mimeType);
  res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  const stream = fs.createReadStream(targetFilePath);
  stream.pipe(res);
}
