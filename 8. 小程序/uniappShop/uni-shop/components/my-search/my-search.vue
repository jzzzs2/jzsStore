<template>
  <view class="search-wrap" @click="naviToSeach">
    <view class="search-input" :style="{borderRadius: radius + 'rpx',backgroundColor: bgc}">
      <uni-icons type="search" size="16"></uni-icons>
      <text>搜索</text>
    </view>
  </view>
</template>

<script>
  export default {
    name:"my-search",
    data() {
      return {
        
      };
    },
    props: {
      radius: {
        type: Number,
        default: 40
      },
      bgc: {
        type: String,
        default: "#ffffff"
      }
    },
    methods: {
      naviToSeach() {
        uni.navigateTo({
          url: "/subpkg/mySearch/mySearch"
        })
      }
    }
  }
</script>

<style lang="stylus">
  .search-wrap
    display: flex
    justify-content: center
    align-items: center
    background-color: #c00000
    height: 90rpx
    .search-input
      display: flex
      justify-content: center
      align-items: center
      width: 280px
      height: 60rpx
    
</style>