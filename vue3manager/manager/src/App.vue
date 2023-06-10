<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-05-22 16:10:03
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-05-27 19:13:58
-->
<template>
  <router-view></router-view>
</template>

<script lang="ts" setup>
import { Plus } from "@element-plus/icons-vue"
import { loginOperate } from "@/api/user/user"
// async function test() {
//   // return "123"
//   // return "123213123213"
//   // return undefined
//   return Promise.reject("123")
// }
// console.log(test(),'earseraser')
// async function test() {
//   try {
//     // await Promise.reject("fail233")
//     // throw new Error("123")
//     throw {name: "jzs",age: 22}
//     // await Promise.resolve("fail233")
//     // console.log(123)
//   } catch (error) {
//     console.log(error,"error")
//   }
// }
// test()
// import axios from "axios"
// async function test() {
//   try {
//     await axios({
//       method: "post",
//       url: "/api/user/login",
//       data: {
//         "username": "admin",
//         "password": "1111112"
//       }
//     })
//   } catch (error) {
//     console.log(error,"error")
//   }
// }
// test()
// Promise.reject(new Error("23333")).then(res=>{
//   console.log(res,"res")
// }).catch(err=>{
//   console.log(err.message,"err")
// })
// try {
//   Promise.reject(new Error("23333"))
// } catch (error) {
//   console.log(error,"error");

// }
// try {
//   loginOperate({
//     username: "admin",
//     password: "111111"
//   })
// } catch (error) {

// }
// import request from "@/util/request.ts"
// request({
//   method: "post",
//   data: {
//     username: "admin",
//     password: "111111",
//   },
//   url: "/user/login",
// })
//   .then((res) => {
//     console.log(res, "res")
//   })
//   .catch((err) => {
//     console.log(result, "result")
//   })
</script>
<style scoped lang="scss">
</style>
