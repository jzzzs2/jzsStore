/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-05-22 16:10:03
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-06-10 13:40:33
 */
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { UserConfigExport, ConfigEnv, loadEnv } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
// https://vitejs.dev/config/

export default ({command,mode} : ConfigEnv) : UserConfigExport =>  {
  //获取变量对象
  let envObj = loadEnv(mode,process.cwd())
  return {
  plugins: [vue(),
    createSvgIconsPlugin({
      // Specify the icon folder to be cached
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // Specify symbolId format
      symbolId: 'icon-[dir]-[name]',
    }),
    // viteMockServe({
    //   "localEnabled": command === 'serve',
    // })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: '@import "./src/style/var.scss";',
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve("./src") // 相对路径别名配置，使用 @ 代替 src
    }
  },
  server: {
    proxy: {
      [envObj.VITE_APP_BASE_API] : {
        target: envObj["VITE_APP_SERVE"],
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
}
  
}
