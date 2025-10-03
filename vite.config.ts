import { defineConfig } from 'vite'

export default defineConfig({
  base: '/game/', // Важно: именно 'game' - имя вашего репозитория
  build: {
    // Оптимизации для игры
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Убирает console.log в продакшене
      }
    }
  },
  server: {
    port: 3000
  }
})
