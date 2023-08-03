/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-07-28 14:01:43
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-07-28 17:59:48
 */
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 按需引入插件
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      // 1.配色方案使用 sass文件
      resolvers: [ElementPlusResolver({importStyle: "sass"})],
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // 自定义主题文件配置位置 并进行覆盖
  css: {
    preprocessorOptions: {
      scss: {
        //自动导入scss样式
        additionalData: `
        @use "@/styles/element/index.scss" as *;
        @use "@/styles/variable.scss" as *;
        `,
      },
    },
  },
})
