<template>
  <div class="area">
    <span>地区: </span>
    <ul class="list">
      <li class="active">全部</li>
      <li>昌平区</li>
      <li>昌平区</li>
      <li>昌平区</li>
      <li>昌平区</li>
      <li>昌平区</li>
      <li>昌平区</li>
      <li>昌平区</li>
      <li>昌平区</li>
      <li>昌平区</li>
      <li>昌平区</li>
      <li>昌平区</li>
      <li>昌平区</li>
      <li>昌平区</li>
      <li v-for="item in 6" :key="item">昌平区</li>
    </ul>
  </div>
</template>

<script lang='ts' setup>
</script>
<style scoped lang='scss'>
.area {
  display: flex;
  color: #666;
  margin-top: 10px;
  &>span {
    width: 40px;
    margin-right: 6px;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    li {
      margin-left: 6px;
      margin-bottom: 10px;
    }
    li.active {
      color: #4490f1;
    }
    li:hover {
      color: #4490f1;
    }
  }
}
</style>