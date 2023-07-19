<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-07-18 20:05:40
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-07-18 20:21:25
-->
<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-07-18 20:05:40
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-07-18 20:05:50
-->
<template>
  <div class="level">
    <h2>医院</h2>
    <div class="list">
      <span>等级:</span>
      <ul class="option">
        <li class="all">全部</li>
        <li>三级甲等</li>
        <li>三级甲等</li>
        <li>三级甲等</li>
        <li>三级甲等</li>
        <li>三级甲等</li>
      </ul>
    </div>
  </div>
</template>

<script lang='ts' setup>
</script>
<style scoped lang='scss'>
.level {
  color: #666;
  h2 {
    margin: 10px 0;
    font-weight: 700;
  }
}
.list {
  display: flex;
  & span {
    margin-right: 6px;
  }
  ul.option {
    display: flex;
    li {
      margin-left: 6px;
    }
    li:hover {
      color: #4490f1;
    }
    li.all {
      color: #4490f1;
    }
  }
}
</style>