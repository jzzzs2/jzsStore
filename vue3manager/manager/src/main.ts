/*
 * @Descripttion:
 * @version:
 * @Author: sueRimn
 * @Date: 2023-05-22 16:10:03
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-05-26 16:22:51
 */
import { createApp } from "vue"
import ElementPlus from 'element-plus'
import 'virtual:svg-icons-register'
import 'element-plus/dist/index.css'
import "./style/index.scss"
import router from "@/router/router"
import store from "@/store/pinia"
// import "@/style.css"
import App from "@/App.vue"
// @ts-ignore 忽略ts类型检测
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import globalComponent from "@/index.ts"
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import "@/routerProtect/protect.ts"
// 暗黑模式样式
import 'element-plus/theme-chalk/dark/css-vars.css'
// 自定义指令
import Has from "@/directive/has.ts"
const app = createApp(App)
Has(app)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router as any)
app.use(store)
app.use(globalComponent)
app.use(ElementPlus,{
  locale: zhCn
})
app.mount("#app")
