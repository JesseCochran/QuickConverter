import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/quickConverter/',
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
})