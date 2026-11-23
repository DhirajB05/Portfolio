import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { tailwindLocal } from './scripts/tailwind-vite-plugin.mjs';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.VERCEL ? '/' : '/Portfolio/',
  plugins: [react(), tailwindLocal()],
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
