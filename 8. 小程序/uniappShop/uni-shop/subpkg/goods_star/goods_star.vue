<template>
  <view>
    <good-title></good-title>
    <view class="good-star-bottom" >
      <view class="good-item" v-for="(item,idx) in starGoods" :key="idx">
        <image :src="item.goods_small_logo || 'https://api.yimian.xyz/img?type=head'" mode="" class="good-item-left"></image>
        <view class="good-item-right">
          <view class="good-item-right-title">
            {{item.goods_name}}
          </view>
          <view class="good-item-price">
            $ {{item.goods_price}}
          </view>
          <view class="good-item-bottom">
            <view class="tag-view">
            	<uni-tag text="去店铺" />
            </view>
            <view class="tag-view">
            	<uni-tag text="找相似" />
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {mapState} from "vuex"
  export default {
    data() {
      return {
        num: 0
      };
    },
    computed: {
      ...mapState("foot",["visitedGoods","storeGoods"]),
      starGoods() {
        return this.visitedGoods.filter(item => {
          return this.storeGoods.indexOf(item.goods_id) !== -1
        })
      }
    },
    onLoad(options) {
      this.num = options.num
    },
    onReady() {
      uni.setNavigationBarTitle({
        title: `我的收藏 ${this.num}`
      })
    }
  }
</script>

<style lang="stylus">
  
  .good-star-bottom
    display: flex
    flex-direction: column
    padding: 10px 18px
    .good-item
      display: flex
      justify-content: space-between
      .good-item-left
        width: 140px
        height: 140px
        border-radius: 6px
      .good-item-right
        width: 200px
        font-size: 12px
        margin-left: 10px
        .good-item-right-title
          font-weight: 600
        .good-item-price
          color: #c00000
          font-size: 16px
          margin-top: 10px
      .good-item-bottom
        display: flex
        justify-content: flex-end
        margin-top: 10px
</style>
