<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-07-18 19:41:27
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-07-18 20:00:39
-->
<template>
  <div class="search">
    <el-autocomplete
      placeholder="请输入医院名称"
    />
    <el-button :icon="Search" type="primary"></el-button>
  </div>
</template>

<script lang='ts' setup>
import {Search} from '@element-plus/icons-vue'
</script>
<style scoped lang='scss'>
.search {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
}
::v-deep(.el-input__wrapper) {
  width: 400px;
}
</style>