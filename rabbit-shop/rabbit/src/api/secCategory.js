/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-07-28 14:48:56
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-08-02 14:40:12
 */
import request from "@/util/request.js"
let reqMap = {
  type: "/category/sub/filter",
  filterGood: "/category/goods/temporary",
  detail: "/goods"
}
export let reqCategoryTwo = (id) => {
  return request.get(`${reqMap["type"]}?id=${id}`)
}
export let reqCategoryGoodsFilterd = (data) => {
  return request.post(reqMap["filterGood"],{
    data
  })
}
export let reqGoodDetail = (id) => {
  return request.get(`${reqMap["detail"]}?id=${id}`)
}