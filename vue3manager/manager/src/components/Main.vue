<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-05-25 17:03:11
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-06-01 10:40:22
-->
<template>
 <transition>
  <router-view v-if="navStoreObj.isFresh"></router-view>
 </transition>
  
</template>

<script lang='ts' setup>
import {ref,onMounted, reactive} from 'vue'
import navStore from "@/store/nav/show.ts"
let navStoreObj = navStore()
// new Promise((resolve,reject) => {
//   reject(123)
// }).then(res => {
//   console.log(res,"res")
// }).catch(err => {
//   console.log(err,"err")
// })
// console.log(123)
</script>
<style scoped lang='scss'>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>