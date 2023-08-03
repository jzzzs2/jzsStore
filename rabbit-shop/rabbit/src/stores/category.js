/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-07-31 17:25:43
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-07-31 17:43:18
 */
import { defineStore } from "pinia"
import { reqCategory } from "@/api/layout.js"
export default defineStore("category", {
  state: () => {
    return {
      cateList: []
    }
  },
  getters: () => {

  },
  actions: {
    // 所有分类的数据存放
    async getCategoryList() {
      let result = await reqCategory()
      if (result.code == 1) {
        // console.log(result?.result,"result");
        this.cateList = result.result
      }
    }
  }
})