<template>
  <div class="home-banner">
    <el-carousel height="500px">
      <el-carousel-item v-for="item in swiperList" :key="item">
        <img :src="item.imgUrl" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script  setup>
import {onMounted,ref} from "vue"
import {reqSwiperList} from "@/api/layout.js"
let swiperList = ref([])
onMounted(async () => {
  let result = await reqSwiperList()
  if (result.code == 1) {
    swiperList.value = result.result
  }
})
</script>
<style scoped lang='scss'>
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;

  img {
    width: 100%;
    height: 500px;
  }
}
</style>