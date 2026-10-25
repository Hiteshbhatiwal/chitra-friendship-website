import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import { createAuthMiddleware, loadEnvConfig } from './server/authMiddleware.ts';

// https://vite.dev/config/
export default defineConfig(() => {
  const rootDir = process.cwd();
  const authConfig = loadEnvConfig(rootDir);

  return {
    plugins: [
      react(),
      {
        name: 'chitra-auth-and-media-gate',
        configureServer(server) {
          server.middlewares.use(createAuthMiddleware(authConfig));
        },
        configurePreviewServer(server) {
          server.middlewares.use(createAuthMiddleware(authConfig));
        }
      }
    ],
    resolve: {
      alias: {
        '@': path.resolve(rootDir, './src')
      }
    }
  };
});
