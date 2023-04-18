/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-04-18 16:51:54
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-18 17:34:08
 */
// import axios from "axios"
// import {ref,reactive} from "vue"
// export default function http<T> (url :string) :any{
//   const result = ref("true")
//   const data = ref<T>()
//   const error = ref("")
//   axios.get(url).then(res => {
//     data.value = res.data
//     result.value = "false"
//     return {
//       msg:result.value,data:data.value,error:error.value
//     }
//   }).catch(err=> {
//     result.value = "false"
//     error.value = err.message
//     return {
//       msg:result.value,data:data,err:error.value
//     }
//   })
// }
import { ref } from 'vue'
import axios from 'axios'

/* 
使用axios发送异步ajax请求
*/
export default function useUrlLoader(url: string) {

  const result = ref(null)
  const loading = ref(true)
  const errorMsg = ref(null)

  axios.get(url)
    .then(response => {
      loading.value = false
      console.log(response);
      result.value = response.data
    })
    .catch(e => {
      loading.value = false
      errorMsg.value = e.message || '未知错误'
    })

  return {
    loading,
    result,
    errorMsg,
  }
}