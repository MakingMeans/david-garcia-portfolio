import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// The site is served from https://makingmeans.github.io/david-garcia-portfolio/,
// so every asset has to be resolved against that sub-path.
export default defineConfig({
  base: '/david-garcia-portfolio/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
