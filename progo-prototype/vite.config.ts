import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Served from the existing GitHub Pages site of ariel-silvio/loreal, folder /progo/.
export default defineConfig({
  base: '/loreal/progo/',
  plugins: [react(), tailwindcss()],
  build: { outDir: '../progo', emptyOutDir: true },
});
