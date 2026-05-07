import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/uploads": {
        target: "http://172.31.92.141:5000",
        changeOrigin: true,
      },
      "/api": {
        target: "http://172.31.92.141:5000",
        changeOrigin: true,
      },
    },
  },
})
