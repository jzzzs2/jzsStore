<template>
  <div class="nav-left">
    <el-icon @click="change" :style="{width:'40px',height:'40px'}">
      <component :is="navStoreObj.isFold?'Fold':'Expand'"></component>
      <!-- <Fold /> -->
    </el-icon>
    <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item v-for="(item,idx) in routeObj.matched" :key="idx" v-show="item.meta.title" :to="item.path">
      <el-icon><component :is="item.meta.icon"></component></el-icon>{{item.meta.title}}
    </el-breadcrumb-item>
  </el-breadcrumb>
  </div>
</template>

<script lang='ts' setup>
import {useRoute} from "vue-router"
import {ref} from 'vue'
import navStore from "@/store/nav/show.ts"
//使用hash路径对象
let routeObj = useRoute()
//切换视图数据
let navStoreObj = navStore()
//改变状态
let change = () => {
  navStoreObj.isFold = !navStoreObj.isFold
}
// console.log(routeObj,"obj")
//路由对象是唯一的...内部会变化
// console.log(routeObj,"routeObj")
</script>
<style scoped lang='scss'>
.nav-left {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-left: 10px;
  
  & svg:hover {
    cursor: pointer;
  }
  & * {
    margin-right: 3px;
  }
}
</style>