import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev
export default defineConfig({
  plugins: [react()],
  base: '/', // ИСПРАВЛЕНО: Меняем на корневой путь, так как сайт развернут на главной странице github.io
})