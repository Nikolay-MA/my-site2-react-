import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev
export default defineConfig({
  plugins: [react()],
  base: '/brochure-website-M/', // Ссылка будет строиться правильно на GitHub Pages
})
