/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-05-25 16:31:42
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-05-25 17:20:44
 */
import {defineStore} from "pinia"
export default defineStore("nav", {
  state: () => {
    return {
      isFold: false,
      isFresh: true
    }
  }
})