/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Relative asset paths so the build can be served from any sub-path.
  base: './',
  // Keep supporting the REACT_APP_API variable from the Create React App days.
  envPrefix: ['VITE_', 'REACT_APP_'],
  build: {
    outDir: 'build',
  },
  server: {
    port: 3000,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setupTests.ts'],
  },
});
