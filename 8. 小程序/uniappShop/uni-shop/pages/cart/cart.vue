<template>
	<view class="cart-wrap" v-if="cartCount!==0">
    <my-address></my-address>
    <!-- 邮寄地址 -->
    <!-- 购物车列表 -->
    <uni-swipe-action>
      <block v-for="(item, idx) in cartList" :key="idx">
        <uni-swipe-action-item :options="options" @click="deleteGood(item)">
          <good-item :good="item" :hasRadio="true" :hasNumber="true" @radio-click="changeState" @num-click="changeNum"></good-item>  
        </uni-swipe-action-item>
      </block>
    </uni-swipe-action>
    <!-- 结算区域 -->
    <good-all></good-all>
	</view>
  <view class="cart-empty" v-else>
    <image src="/static/empty.jpg" class="cart-empty-img"></image>
    <text class="cart-empty-text">空空如也~</text>
  </view>
</template>

<script>
  import {mapState,mapMutations} from "vuex"
  import cart from "@/mixin/cartCount.js"
	export default {
    mixins: [cart],
		data() {
			return {
				options: [
          {
            text: "删除",
            style: {
              backgroundColor: "#c00000"
            }
          }
        ]
			};
		},
    computed: {
      ...mapState("cart",["cartList"])
    },
    methods: {
      ...mapMutations("cart",["changeStateById","changeNumById","deleteGoodById"]),
      changeState(good) {
        this.changeStateById(good)
      },
      changeNum(good) {
        this.changeNumById(good)
      },
      deleteGood(item) {
        this.deleteGoodById(item.goods_id)
      }
    }
	}
</script>

<style lang="stylus">
  .cart-wrap
    padding-bottom: 50px
  .cart-empty
    display: flex
    flex-direction: column
    align-items: center
    padding-top: 140px
    .cart-empty-text
      color: #bbb
      font-size: 14px
      margin-top: 6px
    .cart-empty-img
      width: 120px
      height: 120px
      border-radius: 50%
</style>
