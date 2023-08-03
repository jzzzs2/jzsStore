<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-07-31 17:56:45
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-07-31 19:12:13
-->
<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-07-31 17:56:45
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-07-31 19:09:02
-->
<template>
  <div class="home-product">
    <Panel :title="cate.name" v-for="cate in goodsProduct" :key="cate.id">
      <template #nice>
        <div class="box">
        <RouterLink class="cover" to="/">
          <img v-img-lazy="cate.picture" />
          <strong class="label">
            <span>{{ cate.name }}馆</span>
            <span>{{ cate.saleInfo }}</span>
          </strong>
        </RouterLink>
        <ul class="goods-list">
          <li v-for="good in cate.goods" :key="good.id">
            <GoodItem :good="good"></GoodItem>
          </li>
        </ul>
      </div>
      </template>
    </Panel>
  </div>
</template>

<script setup>
import Panel from "./panel/index.vue"
import {reqGoods} from "@/api/layout.js"
import {onMounted, ref} from "vue"
import GoodItem from "./item/index.vue"
let goodsProduct = ref([])
onMounted(async () => {
  let result = await reqGoods()
  if (result.code == 1) {
    goodsProduct.value = result.result
  }
})
</script>
<style scoped lang='scss'>
.home-product {
  background: #fff;
  margin-top: 20px;
  .sub {
    margin-bottom: 2px;

    a {
      padding: 2px 12px;
      font-size: 16px;
      border-radius: 4px;

      &:hover {
        background: $xtxColor;
        color: #fff;
      }

      &:last-child {
        margin-right: 80px;
      }
    }
  }

  .box {
    display: flex;

    .cover {
      width: 240px;
      height: 610px;
      margin-right: 10px;
      position: relative;

      img {
        width: 100%;
        height: 100%;
      }

      .label {
        width: 188px;
        height: 66px;
        display: flex;
        font-size: 18px;
        color: #fff;
        line-height: 66px;
        font-weight: normal;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0, -50%, 0);

        span {
          text-align: center;

          &:first-child {
            width: 76px;
            background: rgba(0, 0, 0, 0.9);
          }

          &:last-child {
            flex: 1;
            background: rgba(0, 0, 0, 0.7);
          }
        }
      }
    }

    .goods-list {
      width: 990px;
      display: flex;
      flex-wrap: wrap;

      li {
        width: 240px;
        height: 300px;
        margin-right: 10px;
        margin-bottom: 10px;

        &:nth-last-child(-n + 4) {
          margin-bottom: 0;
        }

        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }

    
  }
}
</style>