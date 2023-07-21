<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-07-18 18:56:03
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-07-21 14:03:39
-->
<template>
 <div class="bottom">
  <div class="left">
    <span>京ICP备13018369号</span>
    <span>电话挂号010-56253825</span>
  </div>
  <div class="right">
    <span>联系我们</span>
    <span>合作伙伴</span>
    <span>用户协议</span>
    <span>隐私协议</span>
  </div>
 </div>
</template>

<script lang='ts' setup>
</script>
<style scoped lang='scss'>
.bottom {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 1200px;
  height: 50px;
  margin-top: 20px;
  color: #666;
  font-size: 14px;
  background-color: #ccc;
  .left span {
    margin-right: 20px;
  }
  .right span {
    margin-left: 14px;
  }
}
</style>