import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Ustawienie base dla GitHub Pages (repo: weather-app)
  base: '/weather-app/',
})
