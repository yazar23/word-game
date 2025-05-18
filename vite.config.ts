// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/word-game/', // <-- THIS IS THE FIX
  plugins: [react()],
})
