<template>
  <view class="good-all-wrap">
    <label class="radio" @click="selectAll">
      <radio :checked="cartCountSelected===cartCount" color="red" /><text>全选</text>
    </label>
    <view class="good-price-all">
      <text>总价: ${{cartAllPrice}}</text>
    </view>
    <view class="good-submit" @click="payAll">
      结算:({{cartCountSelected}})
    </view>
  </view>
</template>

<script>
  import {mapGetters,mapMutations,mapState} from "vuex"
  export default {
    name:"good-all",
    data() {
      return {
        seconds: 3,
        timer: null
      };
    },
    computed: {
      ...mapGetters("cart",["cartCountSelected","cartAllPrice","cartCount",]),
      ...mapState("address",["addressInfo","token"]),
      ...mapState("cart",["cartList"]),
      currentSelected() {
        return this.cartCountSelected === this.cartCount
      }
    },
    methods: {
      ...mapMutations("cart",["updateAllSelected"]),
      selectAll() {
        this.updateAllSelected(!this.currentSelected)
      },
      async payAll() {
        if (!this.cartCountSelected) return uni.$showMessage("先选择商品捏")
        if (!this.addressInfo?.provinceName) return uni.$showMessage("先选择收货地址捏")
        if (!this.token) return this.naviToLogin()
        //进行支付操作
        let {data: res} = await uni.$http.post("/api/public/v1/my/orders/create",{
          // order_price: 0.01,
          // consignee_addr: this.addressInfo,
          // goods: this.cartList.filter(item => item.goods_state).map(item => {
          //   return {
          //     "goods_id": item.goods_id, 
          //     "goods_number": item.goods_count, 
          //     "goods_price": item.goods_price
          //   }
          // })
          "order_price": 0.1,
            "consignee_addr": "广州市天河区",
            "order_detail":
              "[{\"goods_id\":55578,\"goods_name\":\"初语2017秋装新款潮牌女装加绒宽松BF风慵懒卫衣女套头连帽上衣\",\"goods_price\":279,\"goods_small_logo\":\"http://image2.suning.cn/uimg/b2c/newcatentries/0070067836-000000000690453616_2_400x400.jpg\",\"counts\":1,\"selectStatus\":true}]",
            "goods": [
                { 
                    "goods_id": 5, 
                    "goods_number": 11, 
                    "goods_price": 15 
                },
                { 
                    "goods_id": 555, 
                    "goods_number": 1, 
                    "goods_price": 15 
                }
            ]
        })
        console.log(res,"resxxxxx sds")
        if(res?.meta.status!==200) return uni.$showMessage("创建订单失败")
        
        const {data: res2} = await uni.$http.post("/api/public/v1/my/orders/req_unifiedorder",
          { "order_number": res.message.order_number }
        )
        console.log(res2,"res2")
        if (res2?.meta.status !== 200) return uni.$showMessage("创建订单失败")
        const [err, succ] = await uni.requestPayment(res2.message.pay)
        console.log(err,"err")
        if (err) return uni.$showMessage('订单未支付！')
           // 3.3 完成了支付，进一步查询支付的结果
           const { data: res3 } = await uni.$http.post('/api/public/v1/my/orders/chkOrder', { order_number: orderNumber })
           // 3.4 检测到订单未支付
           if (res3.meta.status !== 200) return uni.$showMessage('订单未支付！')
           // 3.5 检测到订单支付完成
           uni.showToast({
             title: '支付完成！',
             icon: 'success'
           })

      },
      naviToLogin() {
        this.seconds = 3
        this.showLeftCount(this.seconds)
        this.timer = setInterval(()=>{
          this.seconds--
          if(this.seconds <= 0) {
            clearInterval(this.timer)
            uni.switchTab({
              url: "/pages/my/my"
            })
            return
          }
          this.showLeftCount(this.seconds)
        },1000)
      },
      showLeftCount(num) {
        uni.showToast({
          title: `${num}秒后进入登录页面`,
          duration: 1500,
          icon: "none",
          mask: true
        })
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