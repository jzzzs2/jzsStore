<template>
  <view class="good-all-wrap">
    <label class="radio" @click="selectAll">
      <radio :checked="cartCountSelected===cartCount" color="red" /><text>全选</text>
    </label>
    <view class="good-price-all">
      <text>总价: ${{cartAllPrice}}</text>
    </view>
    <view class="good-submit">
      结算:({{cartCountSelected}})
    </view>
  </view>
</template>

<script>
  import {mapGetters,mapMutations} from "vuex"
  export default {
    name:"good-all",
    data() {
      return {
        
      };
    },
    computed: {
      ...mapGetters("cart",["cartCountSelected","cartAllPrice","cartCount"]),
      currentSelected() {
        return this.cartCountSelected === this.cartCount
      }
    },
    methods: {
      ...mapMutations("cart",["updateAllSelected"]),
      selectAll() {
        this.updateAllSelected(!this.currentSelected)
      }
    }
  }
</script>

<style lang="stylus">
  .good-all-wrap
    position: fixed
    bottom: 0
    left: 0
    display: flex
    justify-content: space-between
    box-sizing: border-box 
    width: 100%
    height: 50px
    line-height: 50px
    padding: 0 0 0 10px
    border-top: 1rpx solid #ccc
    background-color: white
    .radio
      display: flex
      align-items: center
    .good-submit
      min-width: 100px
      height: 50px
      line-height: 50px
      text-align: center
      background-color: #c00000
      color: white
</style>