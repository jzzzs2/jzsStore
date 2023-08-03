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
  hot: "/goods/hot",
}
// * @param {Number} id - 商品id
//  * @param {Number} type - 1代表24小时热销榜 2代表周热销榜
//  * @param {Number} limit - 获取个数
export let reqHotList = ({ id, type, limit = 3 }) => {
  return request.get(reqMap["hot"],{
    params: {
      id,
      type,
      limit
    }
  })
}