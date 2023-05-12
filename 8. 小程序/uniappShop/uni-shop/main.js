import Vue from 'vue'
import App from './App'
import store from "@/store/store.js"
import { $http } from '@escook/request-miniprogram'
uni.$http = $http
$http.baseUrl = 'https://api-hmugo-web.itheima.net'

uni.$showMessage = function (title='数据加载失败',duration=1500) {
  uni.showToast({
    duration,
    icon:'none',
    title,
    mask: true
  })
}
$http.beforeRequest = function(option) {
    console.log("option",option)
    if (option.data.isBase===false) {
      option.baseUrl = ""
      option.url = option.url.replace("https://api-hmugo-web.itheima.net","")
    }
    if (option.url.indexOf("my") !== -1) {
      option.header["Authorization"] = store.state.address.token
    }
    uni.showLoading({ title: '数据加载ing' })
}
$http.afterRequest = function () {
  uni.hideLoading()
}
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
  store
  })
app.$mount()
