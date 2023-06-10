<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-05-24 15:54:18
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-06-09 16:58:04
-->
<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-05-24 15:54:18
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-05-25 15:07:51
-->
<template>
  <template v-for="(item,idx) in routes">
    <template v-if="!item?.meta?.hidden">
    <el-menu-item v-if="!item.children" :index="item.path" @click="goRoute">
      <component :is="item.meta.icon"></component>{{item.meta.title}}
    </el-menu-item>
    <el-menu-item v-if="item.children&&item.children.length==1" :index="item.path" @click="goRoute">
      <component :is="item.children[0].meta.icon"></component>{{item.children[0].meta.title}}
    </el-menu-item>
    <el-sub-menu v-if="item.children&&item.children.length>1" :index="item.path">
      <template #title>
        <component :is="item.meta.icon"></component>{{item.meta.title}}
      </template>
      <Menu :routes="item.children"></Menu>
    </el-sub-menu>
    </template>
  </template>
</template>

<script lang='ts' setup>

import { ref } from "vue"
import {useRouter} from "vue-router"
defineProps(["routes"])
let $router = useRouter()
let goRoute = (info) => {
  // console.log(info,"info")
  let url = info.index
  $router.push(url)
}
</script>
<script lang="ts">
  export default {
    name: "Menu"
  }
</script>
<style scoped lang='scss'>
svg {
  width: 20px;
  height: 20px;
  margin: 2px;
}
</style>