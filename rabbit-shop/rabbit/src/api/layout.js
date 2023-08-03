/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-07-28 14:48:56
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-08-01 14:59:03
 */
import request from "@/util/request.js"
let reqMap = {
  "category": "/home/category/head",
  "swiper": "/home/banner",
  "niceGood":"/home/new",
  "brand": "/home/brand",
  "goods": "/home/goods",
  "categoryTwo": "/category"
}
export let reqCategory = () => {
  return request.get(reqMap["category"])
}
export let reqSwiperList = (type = 1) => {
  // return request.get(`${reqMap["swiper"]}?distributionSite=${type}`)
  return request({
    url: reqMap["swiper"],
    params: {
      distributionSite: type
    }
  })
}
export let reqGoodList = () => {
  return request.get(reqMap["niceGood"])
}
export let reqBrandList = () => {
  return request.get(reqMap["brand"])
}
export let reqGoods = () => {
  return request.get(reqMap["goods"])
}
export let reqCategoryTwo = (id) => {
  return request.get(`${reqMap["categoryTwo"]}?id=${id}`)
}