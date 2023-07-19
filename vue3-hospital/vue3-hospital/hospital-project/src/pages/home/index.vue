<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-07-18 19:21:42
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-07-18 20:09:50
-->
<template>
  <div class="content">
    <Swiper></Swiper>
    <Search></Search>
    <div class="hospital">
      <el-row>
        <el-col :span="20">
          <Level></Level>
          <Area></Area>
        </el-col>
        <el-col :span="4">
          right
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang='ts' setup>
import Swiper from "./swiper/index.vue"
import Search from "./search/index.vue"
import Level from "./level/index.vue"
import Area from "./area/index.vue"
</script>
<style scoped lang='scss'>
.hospital {
  margin-top: 20px;
}
</style>