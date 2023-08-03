/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-07-28 14:45:13
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-07-28 14:48:31
 */
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
  return Promise.reject(error)
}
)
export default myAxios;