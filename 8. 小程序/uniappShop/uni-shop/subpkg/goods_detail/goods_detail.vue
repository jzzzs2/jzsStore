<template>
  <view class="good-detail-wrap">
    <view class="swiper-wrap" v-if="goodInfo.goods_id">
      <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
        <swiper-item v-for="(item,idx) in goodInfo.pics" :key="idx">
            <image :src="item.pics_big" mode=""></image>
        </swiper-item>
      </swiper>
    </view>
    <view class="good-info-wrap">
      <view class="price">
        $ {{goodInfo.goods_price}}
      </view>
      <view class="good-info-content">
        <view class="good-info-name">
          {{goodInfo.goods_name}}
        </view>
        <view class="good-info-store">
          <uni-icons type="star" size="16" color="#cecece"></uni-icons>
          <text>收藏</text>
        </view>
      </view>
      <view class="good-info-package">
        <text>快递: 免运费</text>
      </view>
    </view>
    <rich-text :nodes="goodInfo.goods_introduce"></rich-text>
    <view class="good-operate">
      <uni-goods-nav :options="options" :buttonGroup="buttonGroup" :fill="true" @click="naviToCart" @buttonClick="buttonClick"></uni-goods-nav>
    </view>
    
  </view>
</template>

<script>
  export default {
    data() {
      return {
        goodInfo: {},
        options: [{
        			icon: 'shop',
        			text: '店铺',
        			infoBackgroundColor:'#007aff',
        			infoColor:"red"
        		}, {
        			icon: 'cart',
        			text: '购物车',
        			info: 2,
              infoBackgroundColor:'#007aff',
              infoColor:"#00cccc"
        		}],
        	    buttonGroup: [{
        	      text: '加入购物车',
        	      backgroundColor: '#ff0000',
        	      color: '#00cccc'
        	    },
        	    {
        	      text: '立即购买',
        	      backgroundColor: '#ffa200',
        	      color: '#fff'
        	    }
        	    ]
      };
    },
    onLoad(options) {
      this.getGoodInfo(options.goods_id)
    },
    methods: {
      async getGoodInfo (goods_id) {
        let {data:res} = await uni.$http.get("/api/public/v1/goods/detail",{goods_id})
        if(res.meta.status!==200) return uni.$showMessage()
        res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g,"<img style='vertical-align:middle'").replace(/webp/g,"jpg")
        this.goodInfo = res.message
      },
      naviToCart (e) {
        console.log(e,"e")
        if (e.content.text === "购物车") {
          uni.switchTab({
            url: "/pages/cart/cart"
          })
        }
      }
    }
  }
</script>

<style lang="stylus">
.good-detail-wrap
  padding-bottom: 50px
  swiper
    height: 300px
    image
      width: 100%
      height: 100%
  .good-info-wrap
    padding: 10px 0px 0px 10px
    .price
      font-size: 16px
      color: #c00000
      margin: 12px 0
    .good-info-content
      display: flex
      .good-info-name
        font-size: 12px
      .good-info-store
        display: flex
        flex-direction: column
        align-items: center
        width: 100px
        font-size: 14px
        color: #cecece
        border-left: 1rpx solid #cecece
    .good-info-package
      color: #cecece
      font-size: 12px
      margin: 10px 0
  .good-operate
    position: fixed
    bottom: 0
    width: 100%

</style>
