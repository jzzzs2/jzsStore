<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-07-17 17:51:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-07-19 21:04:06
-->
<template>
 <div class="nav-title">
  <div class="left">
    <img src="@/assets/imgs/logo.png" class="logo">
    <p>尚医通 预约挂号统一平台</p>
  </div>
  <div class="right">
    <span class="help">帮助中心</span>
    <p class="operate"><span>登录</span>/<span>注册</span></p>
  </div>
 </div>
</template>

<script lang='ts' setup>
</script>
<style scoped lang='scss'>
.nav-title {
  position: fixed;
  z-index: 999;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1200px;
  height: 70px;
  border-bottom: 1px solid #ccc;
  background-color: #fff;
  .left {
    display: flex;
    align-items: center;
    font-size: 22px;
    color: #4490f1;
    img {
      width: 50px;
      height: 50px;
      margin-right: 20px;
    }
  }
  .right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    color: #666;
    .help {
      margin-right: 20px;
    }
  }
}
</style>