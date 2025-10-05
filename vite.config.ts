import { svelte } from '@sveltejs/vite-plugin-svelte'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [svelte()],

  base: './',
  assetsInclude: ['**/*.mp3', '**/*.wav', '**/*.png', '**/*.jpg'],
  build: {
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      }
    },
    assetsDir: 'assets',
  },
  server: {
    port: 3000
  },
  publicDir: 'assets',
  css: {
    devSourcemap: true
  }
})
