import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // 👇 REEMPLAZA por el nombre exacto de tu repo
  base: '/computadoras/',
})
