<template>
  <div class="swiper-wrap">
    <el-carousel trigger="click" height="350px">
      <el-carousel-item v-for="item in 4" :key="item">
        <img src="@/assets/imgs/web-banner-1.png" alt="" srcset="" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script lang='ts' setup>
</script>
<style scoped lang='scss'>
.swiper-wrap {
  width: 100%;
  img {
    width: 100%;
    height: 350px;
  }
}
</style>