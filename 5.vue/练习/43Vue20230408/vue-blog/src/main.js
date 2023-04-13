/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-03-30 21:29:10
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-03 15:30:13
 */
/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-03-30 21:29:10
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-03-31 15:13:38
 */
/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-03-15 15:27:37
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-03-23 15:16:13
 */
import Vue from 'vue'
import App from './App.vue'
import "./plugins/vant.js"
import './plugins/element.js'
import "./plugins/scroll"
import 'element-ui/lib/theme-chalk/display.css'
import store from './store'
import router from './router'
import "./assets/css/reset.styl"
import http from "@/http/http"
import animated from "animate.css"
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
import 'github-markdown-css/github-markdown.css'
Vue.component(VueCropper);
Vue.use(animated)
Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.prototype.$bus = new Vue()
new Vue({
 store,
 router,
 render: h => h(App)
}).$mount('#app')
