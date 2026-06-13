import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  // served from https://<user>.github.io/monkeygrove/ via `npm run deploy`
  base: '/monkeygrove/',
  server: {
    port: 5173,
    open: true,
  },
  build: {
    outDir: 'dist',
    target: 'es2022',
    chunkSizeWarningLimit: 1200, // three.js in one vendor chunk is fine
  },
  test: {
    environment: 'node',
    include: ['tests/**/*.test.mjs'],
  },
});
