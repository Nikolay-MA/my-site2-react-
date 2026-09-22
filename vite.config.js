import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev
export default defineConfig({
  plugins: [react()],
  base: '/my-site2-react-/', // Укажите именно это имя с косыми чертами по бокам
})
