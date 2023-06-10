<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-05-24 15:12:46
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-06-07 15:25:57
-->
<template>
  <div class="layout-wrap">
    <div class="layout-operate" :class="navStoreObj.isFold?'foldOperate':''">
      <el-scrollbar height="100vh">
        <Logo></Logo>
        <el-menu class="operate-list" active-text-color="#00ffff" :unique-opened="true" text-color="white" :collapse="navStoreObj.isFold">
          <Menu :routes="userStoreObj.routes"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <div class="layout-nav" :class="navStoreObj.isFold?'foldNav':''">
      <NavLeft></NavLeft>
      <NavRight></NavRight>
    </div>
    <div class="layout-content" :class="navStoreObj.isFold?'foldMain':''">
      <Main></Main>
      <!-- <router-view></router-view> -->
    </div>
  </div>
</template>

<script lang='ts' setup>
import NavLeft from "@/components/nav/NavLeft.vue"
import NavRight from "@/components/nav/NavRight.vue"
import Menu from "@/components/home/Menu.vue"
import { ref } from "vue"
import Logo from "@/components/home/Logo.vue"
import userStore from "@/store/user.ts"
import navStore from "@/store/nav/show.ts"
import Main from "@/components/Main.vue"
let userStoreObj = userStore()
// console.log(userStoreObj.routes)
let navStoreObj = navStore()
</script>
<style lang='scss'>
div.foldOperate {
  width: $foldwidth;
}
div.foldMain {
  width: calc(100vw - $foldwidth)
}
div.foldNav {
  width: calc(100vw - $foldwidth)
}
.layout-wrap {
  width: 100%;
  height: 100vh;
  // background-color: $op-bgc;
}
.layout-operate {
  width: $op-width;
  height: 100vh;
  background-color: $op-bgc;
  color: #fff;
  transition: all .5s;
}
.layout-nav {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: calc(100% - $op-width);
  height: $nav-height;
  // background-image: linear-gradient(to right,rgb(137, 188, 212) ,rgb(57, 182, 190));
  transition: all .5s;
  & * {
    color: #222;
  }
}
.layout-content {
  position: absolute;
  right: 0;
  bottom: 0;
  width: calc(100% - $op-width);
  height: calc(100vh - $nav-height);
  padding: 14px;
  // background-color: skyblue;
  overflow: auto;
  transition: all .5s;
}
.operate-list {
  background-color: $op-bgc;
}
.el-menu {
  border-right: none;
  background-color: $op-bgc;
  font-size: 14px;
} 
</style>