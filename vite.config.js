import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

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
  build: {
    target: 'es2020',
    minify: 'terser',
    cssMinify: true,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2,
      },
      mangle: {
        safari10: true,
      },
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      output: {
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    chunkSizeWarningLimit: 1500,
    sourcemap: false,
    reportCompressedSize: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'gsap', 'three', '@react-three/fiber', '@react-three/drei', 'lenis'],
    esbuildOptions: {
      target: 'es2020',
    },
  },
  esbuildOptions: {
    target: 'es2020',
  },
})
