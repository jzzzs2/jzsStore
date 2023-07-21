/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-07-19 19:48:35
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-07-19 20:35:52
 */
import axios from "axios"
import {ElMessage} from "element-plus"
let request = axios.create({
  baseURL: "/api",
  timeout: 5000
})
request.interceptors.request.use((config) => {
  return config
})
request.interceptors.response.use((response) => {
  return response.data
},(error) => {
  console.log(error,"error");
  error.response.status == 404 ? ElMessage({
    type: "error",
    message: "资源不存在呢"
  }) : ""
  new RegExp('^5').test(error.response.status) ? ElMessage({
    type: "error",
    message: "服务器出错"
  }) : ""
  return Promise.reject(new Error(error.message))
})
export default request