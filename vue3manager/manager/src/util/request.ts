/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-05-23 14:52:04
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-05-26 15:04:39
 */
/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-05-23 14:52:04
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-05-26 14:32:57
 */
import axios from "axios"
import {ElMessage} from "element-plus"
import userStoreFnc from "@/store/user.ts"
let request = axios.create({
  timeout: 3000,
  baseURL: import.meta.env["VITE_APP_BASE_API"]
})
request.interceptors.request.use((config) => {
  let store = userStoreFnc() 
  if(store.token) {
    // console.log(store.token,"token")
    config.headers.token = store.token
  }
  // console.log(config,"config")
  return config
})
request.interceptors.response.use((response) => {
  // console.log(response,"response")
  return response.data
},(error) => {
  // console.log(error.response.message,"xxx",error.message)
  ElMessage({
    message: "请求有误",
    grouping: true,
    type: 'error',
  })
  return Promise.reject(error)
})
export default request