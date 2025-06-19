import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      overlay: false
    }
  },
  build: {
    target: 'esnext',
    minify: false,
    cssMinify: false,
    modulePreload: false,
    reportCompressedSize: false
  },
  optimizeDeps: {
    force: true,
    esbuildOptions: {
      target: 'esnext'
    }
  }
});
