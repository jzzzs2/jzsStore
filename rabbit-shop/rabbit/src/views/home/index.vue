<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-07-28 15:27:08
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-07-31 18:01:56
-->
<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-07-28 14:57:46
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-07-28 14:58:28
-->
<template>
  <div>
    <div class="container">
      <Category></Category>
      <Swiper></Swiper>
    </div>
    <Good></Good>
    <Hot></Hot>
    <Product></Product>
  </div>
</template>

<script setup>
import Category from "./components/Category.vue"
import Good from "./components/Good.vue"
import Hot from "./components/Hot.vue"
import Swiper from "./components/Swiper.vue"
import Product from "./components/Product.vue"
</script>
<style scoped lang='scss'></style>