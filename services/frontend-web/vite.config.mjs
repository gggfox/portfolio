import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import glsl from 'vite-plugin-glsl';
import path from 'node:path';

export default defineConfig({
  plugins: [react(), tsconfigPaths(), glsl()],
  publicDir: 'public',
  base: './',
  assetsInclude: ['**/*.glb'],
  esbuild: {
    target: 'es2020', // You can adjust this for your needs
    keepNames: true, // Helps reduce memory usage during tree-shaking
  },
  server: {
    port: 5173, // Ensure Vite always uses port 5173
    strictPort: true, // Fail if the port is already in use
    host: '0.0.0.0',
    historyApiFallback: true,
    hmr: {
      overlay: false, // Disable HMR overlay to reduce memory consumption
    },
    watch: {
      usePolling: true, // This ensures the file watcher works in Docker
      interval: 1000, // Adjust polling interval for better performance
    },
  },
  resolve: {
    alias: [{ find: '@shared', replacement: path.resolve(__dirname, '../shared') }],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.mjs',
  },
});
