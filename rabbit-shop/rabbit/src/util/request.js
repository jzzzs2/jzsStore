/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-07-28 14:45:13
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-08-07 16:08:37
 */
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import axios from "axios"
import useUserStore from "@/stores/user.js"
  
let myAxios = axios.create({
  baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net",
  timeout: 5000
})
myAxios.interceptors.request.use(
(config) => {
  let userStore = useUserStore()
  let token = userStore.userInfo.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
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
  console.log(error,"error");
  if (error.response.status === 401) {
    // token过期 清理数据 并跳转到登录页
    let userStore = useUserStore()
    userStore.userQuit()
  }
  ElMessage({
    type: "error",
    message: error.response.data.msg
  })
  return Promise.reject(error)
}
)
export default myAxios;