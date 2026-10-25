import type { IncomingMessage, ServerResponse } from 'http';
import { loadEnvConfig, parseCookies, verifySessionToken, sendJson } from '../../server/authMiddleware.ts';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    return sendJson(res, 405, { error: 'Method Not Allowed' });
  }

  const config = loadEnvConfig(process.cwd());
  const cookies = (req as any).cookies || parseCookies(req.headers.cookie);
  const token = cookies.chitra_session;
  const isAuthenticated = verifySessionToken(token, config.sessionSecret);

  return sendJson(res, 200, { authenticated: isAuthenticated });
}
