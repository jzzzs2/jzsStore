<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-07-31 17:56:26
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-07-31 18:49:33
-->
<template>
  <Panel title="人气推荐" smTitle="人气爆款 不容错过">
    <template #hot>
      <ul class="goods-list">
        <li v-for="item in hotList" :key="item.id">
          <RouterLink to="/">
            <img v-img-lazy="item.picture" alt="">
            <p class="name">{{ item.title }}</p>
            <p class="desc">{{ item.alt }}</p>
          </RouterLink>
        </li>
      </ul>
    </template>

  </Panel>
</template>

<script setup>
import Panel from "./panel/index.vue"
import { reqBrandList } from "@/api/layout.js"
import { onMounted, ref } from "vue"
let hotList = ref([])
onMounted(async () => {
  let result = await reqBrandList()
  if (result.code == 1) {
    hotList.value = result.result
  }
})
</script>
<style scoped lang='scss'>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;

  li {
    width: 306px;
    height: 406px;
    transition: all .5s;

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }

    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>