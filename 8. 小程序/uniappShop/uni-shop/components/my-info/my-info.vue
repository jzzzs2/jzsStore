<template>
  <view class="user-info">
    <view class="user-info-top">
        <image :src="userInfo.avatarUrl" class="user-img"></image>
        <text class="user-name">{{userInfo.nickName}}</text>
    </view>
    <view class="panel-list">
      <view class="panel-top">
        <view class="panel-item-block">
            <view class="panel-item-num">
              0
            </view>
            <view class="panel-item-text">
              收藏的店铺
            </view>
        </view>
        <view class="panel-item-block" @click="naviToStar">
            <view class="panel-item-num">
              {{starNum}}
            </view>
            <view class="panel-item-text">
              收藏的商品
            </view>
        </view>
        <view class="panel-item-block">
            <view class="panel-item-num">
              0
            </view>
            <view class="panel-item-text">
              关注的商品
            </view>
        </view>
        <view class="panel-item-block" @click="naviToFoot">
            <view class="panel-item-num">
              {{visitedNum}}
            </view>
            <view class="panel-item-text">
              足迹
            </view>
        </view>
        
        
        
      </view>
      <view class="panel-middle">
        <view class="panel-middle-order">
          我的订单
        </view>
        <view class="panel-middle-info">
          <view class="panel-middle-item">
            <image src="../../static/my-icons/icon1.png" mode="" class="panel-middle-img"></image>
            <text>待付款</text>
          </view>
          <view class="panel-middle-item">
            <image src="../../static/my-icons/icon2.png" mode="" class="panel-middle-img"></image>
            <text>待收货</text>
          </view>
          <view class="panel-middle-item">
            <image src="../../static/my-icons/icon3.png" mode="" class="panel-middle-img"></image>
            <text>退款/退货</text>
          </view>
          <view class="panel-middle-item">
            <image src="../../static/my-icons/icon4.png" mode="" class="panel-middle-img"></image>
            <text>全部订单</text>
          </view>
        </view>
      </view>
      <view class="panel-bottom">
        <view class="panel-bottom-item">
          <text class="panel-bottom-text">收货地址</text>
          <uni-icons type="forward" size="20"></uni-icons>
        </view>
        <view class="panel-bottom-item">
          <text class="panel-bottom-text">联系客服</text>
          <uni-icons type="forward" size="20"></uni-icons>
        </view>
        <view class="panel-bottom-item" @click="logout">
          <view class="panel-bottom-text" >退出登录</view>
          <uni-icons type="forward" size="20"></uni-icons>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  import {mapState,mapMutations,mapGetters} from "vuex"
  export default {
    name:"my-info",
    data() {
      return {
        
      };
    },
    computed: {
      ...mapState("address",["userInfo"]),
      ...mapGetters("foot",["visitedNum","starNum"])
    },
    methods: {
      ...mapMutations("address",["updateAddress","updateUserInfo","updateToken"]),
      naviToStar() {
        uni.navigateTo({
          url: `/subpkg/goods_star/goods_star?num=${this.starNum}`
        })
      },
      naviToFoot() {
        uni.navigateTo({
          url: `/subpkg/goods_visited/goods_visited?num=${this.visitedNum}`
        })
      },
      async logout() {
        uni.showModal({
          title: "登出",
          content: "确定要登出么",
          success: (res) => {
            if(res.confirm) {
              this.updateAddress({})
              this.updateUserInfo({})
              this.updateToken("")
            }
          }
        })
      }
    }
    
  }
</script>

<style lang="stylus">
  .user-info
    display: flex
    height: 100vh
    flex-direction: column
    align-items: center
    background-color: #f4f4f4
    .user-info-top
      display: flex
      flex-direction: column
      align-items: center
      justify-content: center
      width: 100%
      height: 200px
      background-color: #c00000
      .user-img
        width: 80px
        height: 80px
        border-radius: 50%
        border: 2px solid white
      .user-name
        font-size: 12px
        color: white
        margin-top: 4px
  .panel-list
    display: flex
    flex-direction: column
    align-items: center
    position: relative
    top: -16px
    width: 320px
    .panel-top
      display: flex
      justify-content: space-around
      align-items: center
      box-sizing: border-box
      width: 100%
      height: 60px
      background-color: white
      border-radius: 8px
      margin-bottom: 12px
      .panel-item-block
        display: flex
        flex-direction: column
        align-items: center
        font-size: 12px
        .panel-item-num
          margin-bottom: 6px
    .panel-middle
      display: flex
      flex-direction: column
      justify-content: space-around
      box-sizing: border-box
      width: 100%
      height: 100px
      padding: 59px 4px
      background-color: white
      border-radius: 8px
      margin-bottom: 12px
      .panel-middle-order
        padding-left: 10px
        font-size: 13px
        margin-bottom: 4px
      .panel-middle-info
        display: flex
        justify-content: space-around
        .panel-middle-item
          display: flex
          flex-direction: column
          align-items: center
          font-size: 12px
          .panel-middle-img
            width: 50px
            height: 50px
    .panel-bottom
      display: flex
      flex-direction: column
      justify-content: space-around
      box-sizing: border-box
      width: 100%
      padding: 4px 14px
      background-color: white
      border-radius: 8px
      .panel-bottom-item
        display: flex
        justify-content: space-between
        height: 40px
        line-height: 40px
        .panel-bottom-text
          font-size: 12px
</style>