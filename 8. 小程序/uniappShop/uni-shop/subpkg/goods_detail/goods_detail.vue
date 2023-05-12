<template>
  <view class="good-detail-wrap">
    <view class="swiper-wrap" v-if="goodInfo.goods_id">
      <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
        <swiper-item v-for="(item,idx) in goodInfo.pics" :key="idx">
            <image :src="item.pics_big" mode="" @click="preview(idx)"></image>
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
          <uni-icons type="star" size="16" color="#cecece"  :color="isStar?'cyan':'black'"></uni-icons>
          <text @click="storage" >收藏</text>
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
  
  import {mapState,mapMutations,mapGetters} from "vuex"
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
        			info: 0,
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
    watch: {
      cartCount: {
        handler(newValue) {
          console.log("执行监听")
          this.options.find(item=> {
            return item.text === "购物车"
          }).info = newValue
        },
        immediate: true
      }
    },
    computed: {
      ...mapGetters("cart",["cartCount"]),
      ...mapState("cart",["cartList"]),
      ...mapState("foot",["storeGoods"]),
      isStar() {
        return this.storeGoods.indexOf(this.goodInfo.goods_id) !== -1
      }
    },
    onLoad(options) {
      this.getGoodInfo(options.goods_id)
    },
    methods: {
      storage() {
        console.log(this.goodInfo,"xxxxx")
        this.addGoodStar(this.goodInfo.goods_id)
      },
      addVisited(obj) {
        const good = {...obj,date: this.formatDate()}
        this.addGoodVisited(good)
      },
      toDouble (num) {
        return String(num)[1] && String(num) || '0' + num;
      },
      formatDate(date = new Date(), format = "yyyy-mm-dd") {
        let regMap = {
          'y': date.getFullYear(),
          'm': this.toDouble(date.getMonth() + 1),
          'd': this.toDouble(date.getDate())
        }
        //逻辑(正则替换 对应位置替换对应值) 数据(日期验证字符 对应值) 分离
        return Object.entries(regMap).reduce((acc, [reg, value]) => {
          return acc.replace(new RegExp(`${reg}+`, 'gi'), value);
        }, format);
      },
      ...mapMutations("cart",["addCart","addCartCountById"]),
      ...mapMutations("foot",["addGoodVisited","addGoodStar"]),
      buttonClick (e) {
        // console.log(e,"eee")
        if (e.content.text === "加入购物车") {
          //{ goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
          console.log(this.goodInfo,"info")
          const isExist = this.cartList.find(item => {
            return item.goods_id === this.goodInfo.goods_id
          })
          if (!isExist) {
            console.log("商品不存在进行添加")
            const goods = {
              goods_id: this.goodInfo.goods_id,
              goods_name: this.goodInfo.goods_name,
              goods_price: this.goodInfo.goods_price,
              goods_count: 1,
              goods_small_logo: this.goodInfo.goods_small_logo,
              goods_state: true
            }
            this.addCart(goods)
            // this.saveCartList()
            return
          }
          //将商品数量+1
          console.log("商品数量+1")
          this.addCartCountById(this.goodInfo.goods_id)
          // this.saveCartList()
      }},
      // saveCartList () {
      //   uni.setStorageSync("cart",JSON.stringify(this.cartList))
      // },
      async getGoodInfo (goods_id) {
        let {data:res} = await uni.$http.get("/api/public/v1/goods/detail",{goods_id})
        if(res.meta.status!==200) return uni.$showMessage()
        res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g,"<img style='vertical-align:middle'").replace(/webp/g,"jpg")
        // console.log(res.message,"message")
        this.goodInfo = res.message
        this.addVisited(res.message)
      },
      naviToCart (e) {
        console.log(e,"e")
        if (e.content.text === "购物车") {
          uni.switchTab({
            url: "/pages/cart/cart"
          })
        }
      },
      preview(idx) {
        uni.previewImage({
          current: idx,
          urls: this.goodInfo.pics.map(item => {
            return item.pics_big_url
          })
        })
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
.star
  color: cyan
</style>
