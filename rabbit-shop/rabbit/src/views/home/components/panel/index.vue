<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-07-31 18:20:31
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-07-31 18:58:51
-->
<template>
   <div class="home-panel">
    <div class="container">
      <div class="head">
         <!-- 主标题和副标题 -->
        <h3>
          {{ title }}<small>{{ smTitle }}</small>
        </h3>
      </div>
      <!-- 主体内容区域 -->
      <!-- <div> 主体内容 </div> -->
      <slot name="good" />
      <slot name="hot" />
      <slot name="nice" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String
  },
  smTitle: {
    type: String
  }
})
</script>
<style scoped lang='scss'>
.home-panel {
  background-color: #fff;

  .head {
    padding: 40px 0;
    display: flex;
    align-items: flex-end;

    h3 {
      flex: 1;
      font-size: 32px;
      font-weight: normal;
      margin-left: 6px;
      height: 35px;
      line-height: 35px;

      small {
        font-size: 16px;
        color: #999;
        margin-left: 20px;
      }
    }
  }
}
</style>