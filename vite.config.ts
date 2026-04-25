import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
    viteSingleFile(), // inlines all JS + CSS into a single index.html
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    dedupe: ['react', 'react-dom'],
  },
  build: {
    assetsInlineLimit: 100_000_000, // inline all assets (SVG, PNG, JPG) into the bundle
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
  assetsInclude: ['**/*.svg', '**/*.csv', '**/*.pdf'],
})
