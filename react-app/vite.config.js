import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
       allowedHosts: ["react-app-8n4d.onrender.com", "martinsfeathersandfurs.com"],
  },
  
})
