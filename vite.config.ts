import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  build: {
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      }
    },
    assetsInclude: ['**/*.mp3', '**/*.wav', '**/*.png', '**/*.jpg'],
    assetsDir: 'assets',
  },
  server: {
    port: 3000
  },
  // Явно укажите публичную папку
  publicDir: 'assets'
})
