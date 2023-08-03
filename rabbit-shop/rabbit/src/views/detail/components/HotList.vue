<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-08-02 16:47:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-08-02 18:24:26
-->
<template>
  <div class="goods-hot">
    <h3>{{ title}}</h3>
    <!-- 商品区块 -->
    <RouterLink to="/" class="goods-item" v-for="item in goodList" :key="item.id">
      <img :src="item.picture" alt="" />
      <p class="name ellipsis">{{ item.name }}</p>
      <p class="desc ellipsis">{{ item.desc }}</p>
      <p class="price">&yen;{{ item.price }}</p>
    </RouterLink>
  </div>
</template>

<script  setup>
import { computed,onMounted,ref} from 'vue';
import {useRoute} from "vue-router"
import {reqHotList} from "@/api/goodDetail.js"
let titleMap = {
  1: "二十四小时热榜",
  2: "周热榜"
}
let propObj = defineProps({
  type: {
    type: Number,
    default: 1
  }
})
let title = computed(() => {
  return titleMap[propObj.type]
})
let goodList = ref([])
// 
let getHotList = async () => {
  let result = await reqHotList({
    id: useRoute().params.id,
    type: propObj.type
  })
  if (result.code == 1) {
    console.log(result,"result");
    goodList.value = result.result
  }
}
onMounted(() => {
  getHotList()
})
</script>
<style scoped lang='scss'>
.goods-hot {
  h3 {
    height: 70px;
    background: $helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }

  .goods-item {
    display: block;
    padding: 20px 30px;
    text-align: center;
    background: #fff;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }
}
</style>