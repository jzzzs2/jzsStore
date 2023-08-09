/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-08-09 12:43:46
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-08-09 12:59:11
 */
import request from "@/util/request.js"
let reqMap = {
  getCart: "/member/cart",
  deleteGood: "/member/cart",//del ids:[skuId1,skuId2]
  addCart: "/member/cart", //post {skuId,count}
  mergeCart: "/member/cart/merge" //post [{skuId,selected,count}]
}
export const reqGetCart = () => {
  return request.get(reqMap["getCart"])
}
export const reqDeleteGood = (ids) => {
  return request.delete(reqMap["deleteGood"],{
    data: {
      ids
    }
  })
}
export const reqAddCart = ({skuId,count}) => {
  return request.post(reqMap["addCart"],{
    skuId,
    count
  })
}
export const reqMergeCart = (goodArr) => {
  return request.post(reqMap["mergeCart"],goodArr)
}