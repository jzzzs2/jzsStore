<template>
  <view>
    <view class="search-top">
      <my-search :radius="100" bgc="#eee"></my-search>
    </view>
    <view class="swiper-wrap">
      <swiper class="swiper-list" :indicator-dots="true" :autoplay="true" :interval="2000" :duration="1000"
        circular="true" indicator-active-color="#ffffff">
        <swiper-item v-for="(item,idx) in swiperList" :key="idx">
          <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
            <image :src="item.image_src" mode=""></image>
          </navigator>
        </swiper-item>
      </swiper>
    </view>
   <view class="nav-wrap">
     <view class="nav-list">
       <view v-for="(item,index) in navList" :key="index" @click="naviToCate(item)">
         <image :src="item.image_src" mode=""></image>
       </view>
     </view>
   </view>
   <view class="floor-wrap">
     <view class="floor-list">
       <view class="floor-item" v-for="(item,index) in floorList" :key="index">
         <view class="floor-item-top">
           <image :src="item.floor_title.image_src" mode=""></image>
         </view>
          <view class="floor-item-bottom">
         <navigator class="floor-item-left" :url="item.product_list[0].navigator_url">
           <image :src="item.product_list[0].image_src" mode="widthFix" :style="{width: item.product_list[0].image_width + 'rpx'}" ></image>
         </navigator>
         <view class="floor-item-right">
            <navigator  v-for="(item,idx) in item.product_list" :key="idx" v-if="idx!==0" :url="item.navigator_url">
              <image  :src="item.image_src" :style="{width: item.image_width + 'rpx'}" mode="widthFix" ></image>
            </navigator> 
         </view>
          </view>
         
       </view>
     </view>
   </view>
  </view>
  
  
</template>

<script>
import cart from "@/mixin/cartCount.js"
  export default {
    mixins: [cart],
    data() {
      return {
        swiperList: [],
        navList: [],
        floorList: []
      };
    },
    onLoad() {
      this.getSwiperList()
      this.getNavList()
      this.getFloorList()
    },
    methods: {
      async getFloorList() {
        const {data: res} = await uni.$http.get("/api/public/v1/home/floordata")
        if (res.meta.status === 200) {
          // console.log(res.message,"listxxx")
          res.message = res.message.map(item => {
            item.product_list = item.product_list.map(item => {
              item.navigator_url = "/subpkg/goods_list/goods_list?" + item.navigator_url.split("?")[1]
              return item
            })
            return item
          })
          this.floorList = res.message
          return
        }
        uni.$showMessage()
      },
      async getSwiperList() {
        const {
          data: res
        } = await uni.$http.get("/api/public/v1/home/swiperdata")
        if (res.meta.status === 200) {
          // console.log(res.message)
          // res.message = res.message.map(item => {
          //   item.navigator_url = "/subpkg/goods_detail/goods_detail?" + item.navigator_url.split("?")[1]
          //   return item
          // })
          // console.log(res.message, "res.message")
          this.swiperList = res.message
          return
        }
        uni.$showMessage()
      },
      async getNavList() {
        const {data:res} = await uni.$http.get("/api/public/v1/home/catitems")
        if (res.meta.status === 200) {
          this.navList = res.message
          return
        }
        uni.$showMessage()
      },
      naviToCate (item) {
        if (item.name === "分类") {
          uni.switchTab({
            url: "/pages/cate/cate"
          })
        }
      }
    }
  }
</script>

<style lang="stylus">
  .swiper-list
    height: 240rpx
  & .swiper-item
    height: 100%
    & image
      width: 100%
      height: 100%
  .nav-wrap
    height: 200rpx
    & .nav-list
      display: flex
      justify-content: space-around
      height: 100%
      & image
        width: 160rpx
        height: 160rpx
  .floor-item-top
    & image
      height: 60rpx
  .floor-item-bottom
    display: flex
    margin-left: 16rpx
    & .floor-item-right
      display: flex
      flex-wrap: wrap
      justify-content: space-around
  .search-top
    position: sticky
    top: 0
    z-index: 999
</style>