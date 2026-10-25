/**
 * Standalone Zero-Dependency Production Server for "A Little World of Chitra 💌"
 * Can be deployed to Render, Railway, Fly.io, or any Node.js hosting platform.
 * 
 * Usage:
 *   npm run build
 *   node server/productionServer.js
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createAuthMiddleware, loadEnvConfig } from './authMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

const authConfig = loadEnvConfig(rootDir);
const authMiddleware = createAuthMiddleware(authConfig);

const PORT = process.env.PORT || 3000;

function serveStatic(req, res) {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';

  const safePath = path.normalize(reqPath).replace(/^(\.\.[\/\\])+/, '');
  let filePath = path.join(distDir, safePath);

  // If path is a SPA route, fallback to index.html
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(distDir, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
  };

  const contentType = mimeTypes[ext] || 'application/octet-stream';
  res.statusCode = 200;
  res.setHeader('Content-Type', contentType);
  fs.createReadStream(filePath).pipe(res);
}

const server = http.createServer((req, res) => {
  // Pass through auth middleware first
  authMiddleware(req, res, () => {
    // If not handled by /api/auth or /api/media, serve static files
    serveStatic(req, res);
  });
});

server.listen(PORT, () => {
  console.log(`🌸 Chitra Production Server listening on http://localhost:${PORT}`);
  console.log(`🔒 Private media storage: ${authConfig.privateMediaDir}`);
});
