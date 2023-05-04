import Vue from 'vue'
import App from './App'
import {$http} from "@escook/request-miniprogram"
uni.$http = $http
$http.baseUrl = "https://api-hmugo-web.itheima.net"

uni.$showMessage = function (title="数据加载失败",duration=1500) {
  uni.showToast({
    duration,
    icon:'none',
    title,
    mask: true
  })
}
$http.beforeRequest = function(option) {
}
$http.afterRequest = function () {
}
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
