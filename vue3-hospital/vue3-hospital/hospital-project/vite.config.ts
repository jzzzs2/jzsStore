/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-07-18 18:56:03
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-07-24 19:46:01
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  server: {
    proxy: {
      '/api': {
        // target: 'http://syt.atguigu.cn',
        target: 'http://127.0.0.1:4523/m1/1347722-0-default',
        // target: 'http://syt.atguigu.cn',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, 'api')
      }
    }
  }
})
