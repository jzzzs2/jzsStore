<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-07-28 15:14:42
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-07-28 16:09:08
-->
<template>
  <div class="nav">
    <div class="content">
      <div class="goods">我的订单</div>
      <span class="gap"></span>
      <div class="user">用户中心</div>
      <span class="gap"></span>
      <div class="enter">进入登录</div>
      <span class="gap"></span>
      <div class="help">
        帮助中心
      </div>
      <span class="gap"></span>
      <div class="our">
        关于我们
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
<style scoped lang='scss'>
.nav {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 50px;
  line-height: 50px;
  background-color: rgb(45, 44, 45);
  padding: 0px 40px;
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: rgb(143,142,143);
    font-size: 12px;
    .gap {
      padding: 0px 16px;
      &::after {
        content: "";
        display: block;
        background-color: rgb(143,142,143);
        width: 2px;
        height: 10px;
      }
    }
  }
}
</style>