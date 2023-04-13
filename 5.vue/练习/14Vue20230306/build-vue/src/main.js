/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-03-04 17:18:56
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-03-04 17:36:58
 */
import App from "./App"
import Vue from "vue"
let app = new Vue({
  components: {
    App
  },
  el: "#app",
  template: "<App />",
  data () {
    return {
      message: "我是VM message"
    }
  }
})