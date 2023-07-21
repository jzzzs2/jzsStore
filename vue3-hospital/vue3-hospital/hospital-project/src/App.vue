<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-07-17 17:26:43
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-07-19 19:24:54
-->
<script setup lang="ts">
</script>

<template>
  <div class="container">
    <Top></Top>
    <div class="middle">
      <router-view></router-view>
    </div>
    <Bottom></Bottom>
  </div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  .middle {
    width: 1200px;
    margin-top: 70px;
    // background-color: red;

  }
}
</style>
