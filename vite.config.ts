import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    dedupe: ['react', 'react-dom'],
  },
  // Images are emitted as separate, cacheable files instead of being inlined
  // into index.html, so the first page load stays light.
  assetsInclude: ['**/*.svg', '**/*.csv', '**/*.pdf'],
})
