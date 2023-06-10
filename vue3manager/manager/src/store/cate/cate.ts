/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-05-29 16:05:34
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-05-29 16:40:26
 */
import {defineStore} from "pinia"
import {cateStoreType} from "@/api/product/propType"
import {getC1,getC2,getC3} from "@/api/product/prop"
export default defineStore("category",{
  state: () :cateStoreType => {
    return {
      c1Arr: [],
      c1Id: "",
      c2Arr: [],
      c2Id: "",
      c3Arr: [],
      c3Id: ""
    }
  },
  actions: {
    async getC1AndStore() {
      let result = await getC1()
      if (result.code === 200) {
        this.c1Arr = result.data
      }
    },
    async getC2AndStore() {
      this.c2Id = ""
      this.c3Arr = []
      this.c3Id = ""
      let result = await getC2(this.c1Id)
      if (result.code === 200) {
        this.c2Arr = result.data
      }
    },
    async getC3AndStore() {
      this.c3Id = ""
      let result = await getC3(this.c2Id)
      if (result.code === 200) {
        this.c3Arr = result.data
      }
    }
  },
  getters: {
    
  }
})