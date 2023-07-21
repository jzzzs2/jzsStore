/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-07-17 17:26:43
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-07-19 20:04:53
 */
import { createApp } from 'vue'
import './reset.scss'
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import App from "@/App.vue"
import Top from "@/components/top/index.vue"
import Bottom from "@/components/bottom/index.vue"
import router from "@/router/router.ts"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
let app = createApp(App)
app.use(ElementPlus,{
  locale: zhCn
})
app.use(router)
app.component("Top",Top)
app.component("Bottom",Bottom)
app.mount('#app')
