<template>
  <view class="good-item-wrap">
    <view class="good-item-left">
      <radio value="" :checked="good.goods_state" color="red" v-if="hasRadio" @click="selectedHandler(good)"  />
      <image :src="good.goods_small_logo || defaultURL"></image>
    </view>
    <view class="good-item-right">
        <view class="good-item-name">
          {{good.goods_name}}
        </view>
        <view class="good-item-price">
          <text>$ {{good.goods_price | fixed}}</text>
          <uni-number-box :min="1" :value="good.goods_count" v-if="hasNumber" @change="changeNum"></uni-number-box>
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
      },
      hasRadio: {
        type: Boolean,
        default: false
      },
      hasNumber: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        defaultURL: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      };
    },
    filters: {
      fixed(num) {
        return Number(num).toFixed(2)
      }
    },
    methods: {
      selectedHandler(good) {
        // console.log(good,"good")
        this.$emit("radio-click",{
          goods_id: good.goods_id,
          goods_state: !good.goods_state
        })
      },
      changeNum(value) {
        console.log(typeof value,"value")
        this.$emit("num-click",{
          goods_count: Number(value),
          goods_id: this.good.goods_id
        })
      }
    }
  }
</script>

<style lang="stylus">
  .good-item-wrap
    display: flex
    box-sizing: border-box
    width: 100%
    padding: 10px 6px
    .good-item-left
      display: flex
      justify-content: space-around
      align-items: center
      margin-right: 4px
      image
        width: 100px
        height: 100px
  .good-item-right
    display: flex
    flex-direction: column
    justify-content: space-between
    flex-grow: 3
    .good-item-name
      font-size: 14px
    .good-item-price
      display: flex
      justify-content: space-between
      align-items: center
      color: #c00000
  good-item {
    width: 100%
  }
</style>