/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-08-07 15:12:23
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-08-09 13:34:28
 */
import $router from "@/router/index.js"
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { reqLogin } from "@/api/login"
import { defineStore } from "pinia"
import useCartStore from "./cartList.js"
import {reqGetCart,reqMergeCart} from "@/api/cartList.js"
export default defineStore("user", {
  state: () => {
    return {
      userInfo: {}
    }
  },
  getters: {

  },
  actions: {
    async loginOperate({ password, account }) {
      let cartStore = useCartStore()
      let result = await reqLogin({ password, account })
      // console.log(result,"result");
      this.userInfo = result.result
      ElMessage({
        message: "登录成功",
        type: "success"
      })
      $router.replace("/")
      //将本地购物车数据与用户购物车数据进行1合并
      await reqMergeCart(cartStore.cartList.map(item => {
        return {
          skuId : item.skuId,
          selected : item.selected,
          count : item.count
        }
      }))
      let result2 = await reqGetCart()
      // console.log(result2,"resultxxx");
      cartStore.cartList = result2.result
    },
    userQuit () {
      let cartStore = useCartStore()
      this.userInfo = {}
      $router.push("/login")
      //清空本地购物车数据
      cartStore.clearCartList()
    }
  },
  persist: true
})