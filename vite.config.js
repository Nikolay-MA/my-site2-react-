import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // ИСПРАВЛЕНО:plugin-react вместо config-react

// https://vitejs.dev
export default defineConfig({
  plugins: [react()],
  base: '/my-site2-react-/', // Сохраняем правильный базовый путь для GitHub Pages
})
