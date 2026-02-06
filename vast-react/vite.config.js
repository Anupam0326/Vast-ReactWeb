import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 5173,
    allowedHosts: true
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-helmet-async'],
          'animation-vendor': ['motion', 'gsap'],
          'three-vendor': ['three', '@react-three/fiber', 'ogl']
        }
      }
    }
  }
})
