import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:54321/functions/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
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
