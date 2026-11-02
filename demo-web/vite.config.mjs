import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
const path = value => fileURLToPath(new URL(value, import.meta.url));
export default defineConfig({
  root: path('./'), base: '/product-preview/', plugins: [react()],
  resolve: { alias: { '@plural/client': path('../../Plural/client/src/index.ts'), react: path('../node_modules/react'), 'react-dom': path('../node_modules/react-dom'), sucrase: path('../node_modules/sucrase/dist/index.js') } },
  build: { outDir: path('../public/product-preview'), emptyOutDir: true },
});
