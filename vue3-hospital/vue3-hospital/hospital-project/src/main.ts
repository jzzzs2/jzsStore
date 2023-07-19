/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-07-17 17:26:43
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-07-18 19:39:36
 */
import { createApp } from 'vue'
import './reset.scss'
import App from "@/App.vue"
import Top from "@/components/top/index.vue"
import Bottom from "@/components/bottom/index.vue"
import router from "@/router/router.ts"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
let app = createApp(App)
app.use(ElementPlus)
app.use(router)
app.component("Top",Top)
app.component("Bottom",Bottom)
app.mount('#app')
