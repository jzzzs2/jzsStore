/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-07-28 14:45:13
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-08-04 20:13:45
 */
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import axios from "axios"
let myAxios = axios.create({
  baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net",
  timeout: 5000
})
myAxios.interceptors.request.use(
(config) => {
  return config
},
(error) => {
  return Promise.reject(error)
}
)
myAxios.interceptors.response.use(
(response) => {
  return response.data
},
(error) => {
  ElMessage({
    type: "error",
    message: error.response.data.msg
  })
  return Promise.reject(error)
}
)
export default myAxios;