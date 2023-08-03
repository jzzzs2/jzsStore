<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-07-28 14:57:46
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-08-01 14:54:21
-->
<template>
  <div>
    <!-- 吸顶导航组件 -->
    <HeaderNav></HeaderNav>
    <Nav></Nav>
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script setup>
import Footer from "./comps/footer/index.vue"
import Nav from "./comps/nav/index.vue"
import Header from "./comps/header/index.vue"
import HeaderNav from "./comps/headerNav/HeaderNav.vue"
import cateStoreFnc from "@/stores/category"
import {useRoute} from "vue-router"
let cateStore = cateStoreFnc()
let $route = useRoute()
// console.log("$route",$route);
cateStore.getCategoryList()
</script>
<style scoped lang='scss'></style>