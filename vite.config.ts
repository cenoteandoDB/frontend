import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
// TODO improve chunk size using lazy import when bundle size > 2 MB
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1500
  }
});
