<template>
  <view class="good-item-wrap">
    <view class="good-item-left">
      <image :src="good.goods_small_logo || defaultURL"></image>
    </view>
    <view class="good-item-right">
        <view class="good-item-name">
          {{good.goods_name}}
        </view>
        <view class="good-item-price">
          $ {{good.goods_price}}
        </view>
    </view>
  </view>
</template>

<script>
  export default {
    name:"good-item",
    props: {
      good: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        defaultURL: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      };
    }
  }
</script>

<style lang="stylus">
  .good-item-wrap
    display: flex
    padding: 10px 6px
    .good-item-left
      image
        width: 100px
        height: 100px
  .good-item-right
    display: flex
    flex-direction: column
    justify-content: space-between
    .good-item-name
      font-size: 14px
    .good-item-price
      color: #c00000
</style>