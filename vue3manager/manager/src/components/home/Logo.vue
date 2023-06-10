<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-05-24 15:31:17
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-06-10 13:52:04
-->
<template>
 <div class="logo-wrap">
  <img :src="url" alt="">
  <span>{{title}}</span>
 </div>
</template>

<script lang='ts' setup>
import {ref} from 'vue'
import {title,url} from "@/setting.ts"
</script>
<style scoped lang='scss'>
.logo-wrap {
  display: flex;
  align-items: center;
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-left: 8px
  }
  span {
    font-size: 18px;
    margin-left: 16px;
  }
}

</style>