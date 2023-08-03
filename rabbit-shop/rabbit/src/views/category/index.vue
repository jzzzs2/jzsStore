<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-07-28 15:27:54
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-08-01 15:42:05
-->
<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-07-28 15:27:54
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-08-01 15:25:40
-->
<template>
  <!-- 面包屑 -->
  <Bread :typeData="typeData"></Bread>
  <!-- 轮播图 -->
  <div class="home-banner">
    <el-carousel height="500px">
      <el-carousel-item v-for="item in swiperList" :key="item">
        <img :src="item.imgUrl" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
  <GoodList :categoryData="typeData"></GoodList>
</template>

<script setup>
import Bread from "./components/Bread.vue"
import GoodList from "./components/GoodList.vue"
// import {onMounted,ref} from "vue"

// import {useRoute,onBeforeRouteUpdate} from "vue-router"
// import {reqCategoryTwo} from "@/api/layout.js"
// let swiperList = ref([])
import {useSwiper} from "./composable/swiper.js"
import {useGoods} from "./composable/goods.js"
let {swiperList} = useSwiper()
let {typeData} = useGoods()
// let $route = useRoute()
// // typeData
// let typeData = ref({})
// let getCategoryTwo = async (id) => {
//   let result = await reqCategoryTwo(id)
//   if (result.code == 1) {
//     typeData.value = result.result
//   }
// }
// //路由改变时修改分类数据 
// onBeforeRouteUpdate((to) => {
//   getCategoryTwo(to.params.id)
// })
// onMounted(async () => {
//   getCategoryTwo($route.params.id)
// })
</script>
<style scoped lang='scss'>
.home-banner {
  width: 1240px;
  height: 500px;
  img {
    width: 100%;
    height: 500px;
  }
}
</style>