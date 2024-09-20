import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
  plugins: [react(), tsconfigPaths(), glsl()],
  publicDir: 'public',
  base: './',
  assetsInclude: ['**/*.glb'],

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.mjs',
  },
});
