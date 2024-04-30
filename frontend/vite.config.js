import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { 
    port: 3000,   
    proxy: {
      '/api': {
        // target: 'http://localhost:5000',
        target: 'http://http://13.234.34.97:5000',
        changeOrigin: true
      }
    }
  }
})
