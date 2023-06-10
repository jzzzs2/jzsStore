<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-05-23 15:36:54
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-06-09 17:18:59
-->
<template>
<div class="box">
  <img src="./m2.png" alt="">
  <button @click="backToHome">点我回首页</button>
</div>
</template>

<script lang='ts' setup>
import {ref} from 'vue'
import {useRouter} from "vue-router"
let $router = useRouter()
let backToHome = () => {
  $router.push("/home")
}
</script>
<style scoped lang='scss'>
  .box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 600px;
      margin-top: 100px;
      border-radius: 20px;
    }
  }
</style>