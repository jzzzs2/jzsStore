<template>
    <view class="good-star-top">
      <view class="good-star-title">
        <text>宝贝</text>
        <text>图文</text>
        <text>视频</text>
        <text>话题</text>
        <text>清单</text>
      </view>
    </view>
</template>

<script>
  export default {
    name:"good-title",
    data() {
      return {
        
      };
    }
  }
</script>

<style lang="stylus">
.good-star-title
    display: flex
    justify-content: space-around
    align-items: center
    font-size: 12px
    color: #333
    line-height: 30px
    background-color: #eee
</style>