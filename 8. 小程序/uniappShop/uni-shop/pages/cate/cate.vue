<template>
  <view>
  <my-search></my-search>
	<view class="cate-wrap">
		<scroll-view class="cate-one-wrap" scroll-y :style="{height: uH + 'px'}">
		  <view class="cate-one-item" v-for="(item,idx) in cateList" :key="idx" :class="active===idx?'active':''" @click="changeCate(idx)">{{item.cat_name}}</view>
		</scroll-view>
    <scroll-view class="cate-two-wrap" scroll-y :style="{height: uH + 'px'}" :scroll-top="top">
      <view class="cate-two-item" v-for="(item2,idx2) in cateTwoList" :key="idx2">
        <view class="cate-two-item--title">
          / {{item2.cat_name}} /
        </view>
        <view class="cate-three-wrap">
          <view class="cate-three-item" v-for="(item3,idx3) in item2.children" :key="idx3" @click="naviToGood(item3)">
              <image :src="item3.cat_icon" mode=""></image>
              <text>{{item3.cat_name}}</text>
          </view>
        </view>
      </view>
    </scroll-view>
	</view>
  </view>
</template>

<script>
	export default {
		data() {
			return {
				uH: 0,
        cateList: [],
        cateTwoList: [],
        active: 0,
        top: 0
			}
		},
    onLoad(options) {
      const info = uni.getSystemInfoSync()
      console.log(info.windowHeight,"height")
      this.uH = info.windowHeight - 45
      //获取分类数据
      this.getAllCate()
      //获取初级二级分类
      this.getSecCate()
    },
    methods: {
      async getAllCate() {
        const {data: res} = await uni.$http.get("/api/public/v1/categories")
        this.cateList = res.message
      },
      changeCate(idx) {
        this.active = idx
        //改变二级分类
        this.cateTwoList = this.cateList[idx].children
        this.top = this.top===0?1:0
      },
      async getSecCate() {
        const {data: res} = await uni.$http.get("/api/public/v1/categories")
        this.cateTwoList = res.message[0].children
      },
      naviToGood (item) {
        console.log("item",item)
        uni.navigateTo({
          url: `/subpkg/goods_list/goods_list?cid=${item.cat_id}`
        })
      }
    }
	}
</script>

<style lang="stylus">
  .cate-wrap
    display: flex
    .cate-one-wrap
      width: 160rpx
      background-color: #ffcede
      .cate-one-item
        position: relative
        color: #333
        line-height: 80rpx
        font-size: 24rpx
        text-align: center
        &.active
          background-color: #ffffff
          color: #00ddfe
          &::before
            position: absolute
            content: " "
            width: 6rpx
            height: 60rpx
            left: 0
            top: 50%
            background-color: #00cccc
            transform: translateY(-50%)
  .cate-two-item
    margin-bottom: 24rpx
  .cate-two-item--title
    margin-bottom: 20rpx
    text-align: center
    color: #222
  .cate-three-wrap
    display: flex
    flex-wrap: wrap
    .cate-three-item
      display: flex
      flex-direction: column
      align-items: center
      width: 33.3%
      & image
        width: 100rpx
        height: 100rpx
      & text
        font-size: 24rpx
</style>
