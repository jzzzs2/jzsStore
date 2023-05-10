<template>
  <view>
  <view class="address-button-wrap" v-if="JSON.stringify(addressInfo)==='{}'">
    <button type="primary" class="info-button" @click="getUserInfo">点我填写个人信息捏~</button>
  </view>
  <view class="address-wrap" v-else>
    <view class="address-top">
      <text class="address-top-name">姓名: {{addressInfo.userName}}</text>
      <view class="address-top-phone">
        <view>手机号: {{addressInfo.telNumber}}</view>
        <uni-icons type="forward" size="14"></uni-icons>
      </view>
    </view>
    <view class="address-content">
      <text class="address-content-text">地址:</text>
      <view class="address-content-user">
        {{locationAddr}}
      </view>
    </view>
    <image src="@/pages/../../static/cart_border@2x.png" class="img-bottom"></image>
  </view>
  </view>
</template>

<script>
  import {mapState,mapMutations,mapGetters} from "vuex"
  export default {
    name:"my-address",
    data() {
      return {
        // address: {}
      };
    },
    computed: {
      ...mapGetters("address",["locationAddr"]),
      ...mapState("address",["addressInfo"])
      // allAddress() {
      //   return this.address.provinceName + this.address.cityName + this.address.countyName + this.address.detailInfo
      // }
    },
    methods: {
      ...mapMutations("address",["updateAddress"]),
      async getUserInfo() {
        let [err,message] = await uni.chooseAddress().catch(err=>err)
        if (message.errMsg === "chooseAddress:ok") {
          // this.address = message
          this.updateAddress(message)
        }
        // console.log(this.address,"xxx")
      }
    }
  }
</script>

<style lang="stylus">
  .address-button-wrap
    display: flex
    justify-content: center
    align-items: center
    height: 50px
    .info-button
      width: 160px
      height: 30px
      line-height: 30px
      font-size: 14px
  .address-wrap
    display: flex
    flex-direction: column
    justify-content: space-around
    padding-left: 6px
    .address-top
      display: flex
      justify-content: space-between
      margin-bottom: 8px
      .address-top-phone
        display: flex
        justify-content: space-between
        align-items: center
        font-size: 12px
    .address-content
      display: flex
      align-items: flex-end
      margin-bottom: 8px
  .img-bottom {
    width: 100%
    height: 4px
    margin-bottom: 8px
  }
  .address-content-text
    white-space: nowrap
  .address-content-user
    width: 300px
    padding-left: 6px
    font-size: 12px
</style>