<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-07-31 17:56:13
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-07-31 19:06:12
-->
<template>
  <Panel title="新鲜好物" smTitle="新鲜出炉 品质靠谱">
    <template #good>
      <ul class="goods-list">
        <li v-for="item in newList" :key="item.id">
          <RouterLink :to="`/detail/${item.id}`">
            <img  v-img-lazy="item.picture" alt="" />
            <p class="name">{{ item.name }}</p>
            <p class="price">&yen;{{ item.price }}</p>
          </RouterLink>
        </li>
      </ul>
    </template>
  </Panel>
</template>

<script  setup>
import {onMounted, ref} from "vue"
import Panel from "./panel/index.vue"
import {reqGoodList} from "@/api/layout.js"
let newList = ref([])
onMounted(async () => {
  let result = await reqGoodList()
  if (result.code == 1) {
    newList.value = result.result
  }
})
</script>
<style scoped lang='scss'>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;

  li {
    width: 306px;
    height: 406px;

    background: #f0f9f4;
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
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .price {
      color: $priceColor;
    }
  }
}
</style>