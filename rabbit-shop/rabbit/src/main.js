/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-07-28 14:01:43
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-07-31 19:05:19
 */

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
// 导入清除样式表文件
import "@/styles/common.scss"
// 导入全局组件
import regis from "@/plugin/componentReg"
const app = createApp(App)
// 图片懒加载插件
import imgLazy from "@/plugin/imgLazy.js"
//全局注册图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
//使用pinia持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
let pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(regis)
app.use(router)
app.use(imgLazy)
app.mount('#app')
