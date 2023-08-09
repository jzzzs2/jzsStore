/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-08-07 16:14:20
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-08-09 13:23:02
 */
import { defineStore } from "pinia"
import useUserStore from "@/stores/user.js"
import {reqGetCart,reqDeleteGood,reqAddCart,reqMergeCart} from "@/api/cartList.js"
export default defineStore("cart", {
  state: () => {
    return {
      cartList: []
    }
  },
  getters: {
    allCounts() {
      return this.cartList.reduce((acc, item) => {
        return acc + item.count
      }, 0)
    },
    allPrices() {
      return this.cartList.reduce((acc, item) => {
        return acc + item?.price * item.count
      }, 0)
    },
    isAllSelected() {
      return this.cartList.every(item => {
        return item.selected
      })
    },
    selectedCounts() {
      return this.cartList.filter(item => {
        return item.selected
      }).length
    },
    selectedPrices() {
      return this.cartList.filter(item => {
        return item.selected
      }).reduce((acc, item) => acc + item.price * item.count, 0)
    }
  },
  actions: {
    async addGood(obj) {
      let {skuId,count} = obj
      let userStore = useUserStore()
      //根据是否存在token决定进行通过接口新增商品还是本地新增商品
      if (userStore.userInfo.token) {
        await reqAddCart({skuId,count})
        let result = await reqGetCart()
        // console.log(result,"result");
        this.cartList = result.result
      } else {
        let item = this.cartList.find(item => {
          return item.skuId === obj.skuId
        })
        item && (item.count += obj.count) || this.cartList.push(obj)
      }

    },
    async deleteGood(id) {
      // console.log(id,"id");
      let userStore = useUserStore()
      if (userStore.userInfo.token) {
        await reqDeleteGood([id])
        let result = await reqGetCart()
        this.cartList = result.result
      } else {
        this.cartList = this.cartList.filter(item => {
          return item.skuId !== id
        })
      }
      
    },
    singleChange(position, skuId) {
      let obj = this.cartList.find(item => {
        return item.skuId === skuId
      })
      obj.selected = position
    },
    multipleChange(selected) {
      this.cartList.forEach(item => {
        item.selected = selected
      })
    },
    clearCartList () {
      this.cartList = []
    }
  },
  persist: true
})