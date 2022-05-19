import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: { '@/': `${path.resolve(__dirname, 'src')}/` },
  },
  css: {
    // 全域css
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/css/style.scss";'
      }
    }
  }
})
