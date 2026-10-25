import type { IncomingMessage, ServerResponse } from 'http';
import { sendJson } from '../../server/authMiddleware.ts';

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendJson(res, 405, { error: 'Method Not Allowed' });
  }

  const isSecure = process.env.NODE_ENV === 'production' || req.headers['x-forwarded-proto'] === 'https';
  res.setHeader(
    'Set-Cookie',
    `chitra_session=; Path=/; Max-Age=0; HttpOnly; SameSite=Strict${isSecure ? '; Secure' : ''}`
  );

  return sendJson(res, 200, {
    success: true,
    message: 'Logged out successfully'
  });
}
