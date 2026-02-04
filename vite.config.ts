import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import removeConsole from 'vite-plugin-remove-console';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss(), removeConsole()],
  preview: {
    port: 5173,
    strictPort: true, // 이미 사용 중이면 실패
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
