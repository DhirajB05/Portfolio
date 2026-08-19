import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@bklitui/ui/charts': path.resolve(__dirname, './src/components/calendar/bklitui-charts.tsx'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
