import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      base: './', // Ensures assets load correctly on GitHub Pages (subpaths & custom domains)
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: './tests/setup.ts',
      },
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});

