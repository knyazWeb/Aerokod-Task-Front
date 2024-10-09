import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
// import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // svgr({
    //   svgrOptions: {},
    //   include: '**/*.svg',
    // }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: '/Aerokod-Task-Front'
});
