/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-07-28 14:48:56
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-08-04 20:22:54
 */
import request from "@/util/request.js"
let reqMap = {
  login: "/login",
}
// * @param {Number} id - 商品id
//  * @param {Number} type - 1代表24小时热销榜 2代表周热销榜
//  * @param {Number} limit - 获取个数
export let reqLogin = ({ account,password }) => {
  return request.post(reqMap["login"],{
      account,
      password
  },
  {
    headers: {
      token: 123
    }
  })
}