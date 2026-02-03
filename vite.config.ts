import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import removeConsole from 'vite-plugin-remove-console';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss(), removeConsole()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
