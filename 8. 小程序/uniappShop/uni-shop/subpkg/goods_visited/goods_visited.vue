<template>
  <view>
    <good-title></good-title>
    <view class="good-visited">
      <view class="good-item" v-for="(item,idx) in visitedGoods" :key="idx">
        <view class="good-item-date">
          {{item.date}}
        </view>
        <image :src="item.goods_small_logo || 'https://api.yimian.xyz/img?type=head'" mode="" class="good-item-img"></image>
        <view class="good-item-price">
          $ {{item.goods_price}}
        </view>
      </view>
    </view>
  </view>
</template>
'https://api.yimian.xyz/img?type=head'
<script>
  import {mapState} from "vuex"
  export default {
    data() {
      return {
        num: 0
      };
    },
    computed: {
      ...mapState("foot",["visitedGoods"])
    },
    onLoad(options) {
      this.num = options.num
    },
    onReady() {
      uni.setNavigationBarTitle({
        title: `我的足迹 ${this.num}`
      })
    }
  }
</script>

<style lang="stylus">
  .good-visited
    display: flex
    justify-content: flex-start
    flex-wrap: wrap
    .good-item
      display: flex
      flex-direction: column
      margin: 10px
      .good-item-date
        font-size: 12px
        font-weight: 700
      .good-item-img
        width: 100px
        height: 100px
        border-radius: 8px
      .good-item-price
        color: #c00000
        font-size: 12px
</style>
