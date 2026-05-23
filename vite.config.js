import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VitePages from 'vite-plugin-pages'

// https://vitejs.dev/config/
export default defineConfig({
<<<<<<< HEAD
  plugins: [  
=======
  plugins: [
>>>>>>> 76e237d54cf98249cefd13e80c326b480c9e13e3
    vue(),
    VitePages()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
<<<<<<< HEAD
    css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/scss/global.scss" as *;`,
      },
    },
  },  
=======
>>>>>>> 76e237d54cf98249cefd13e80c326b480c9e13e3
})