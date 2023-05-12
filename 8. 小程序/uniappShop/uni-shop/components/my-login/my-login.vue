<template>
  <view>
    <view class="login-wrap">
      <uni-icons type="contact" size="40"></uni-icons>
      <button type="primary" class="login-btn" @click="getUserInfo">一键登录</button>
      <text class="login-text">登录享受更多权益哦</text>
    </view>
  </view>
</template>

<script>
  import {mapMutations,mapState} from "vuex"
import myLoginVue from './my-login.vue';
  export default {
    name:"my-login",
    data() {
      return {
        
      };
    },
    computed: {
      ...mapState("address",["backInfo"])
    },
    methods: {
      ...mapMutations("address",["updateUserInfo","updateToken","updateBackInfo"]),
      // getUserInfo(e) {
      //   console.log(e,"e")
      // },
      getUserInfo(){
          // console.log("一遍成功")
          uni.showModal({
            title: '权限',
            content: "是否同意获取个人信息",
            success: async (res) => {
              if (res.confirm) {
                uni.getUserProfile({
                    desc:'Wexin', // 这个参数是必须的
                    success: res=>{
                        // console.log(res)
                        //保存用户信息
                        // const res2 = await uni.$http.get("https://api.yimian.xyz/img?type=head",{isBase: false})
                        // console.log(res2,"res2")
                        res.userInfo.avatarUrl = "https://api.yimian.xyz/img?type=head"
                        res.userInfo.nickName = res.userInfo.nickName + Math.floor(Math.random() * 1232) + 255
                        this.updateUserInfo(res.userInfo)
                        //登入获取token
                        this.getToken(res)
                        // this.naviBack()
                    },
                    fail:err=>{
                      uni.$showMessage("取消登录")
                        console.log(err)
                    }
                })
              }
            }
          })
          
       },
       naviBack() {
         this.updateBackInfo({
           "open-type": "switchBar",
           "url": "/pages/cart/cart"
         })
         console.log(this.backInfo,"backInfo")
        if (this.backInfo["open-type"] === "switchBar") {
          console.log("跳转到购物车",this.backInfo.url)
          let timer = setTimeout(() => {
              uni.switchTab({
                url: this.backInfo.url,
                complete: () => {
                  this.updateBackInfo({})
                  clearTimeout(timer)
                }
              })
          },1000)
        }
       },
       async getToken(res) {
         let [err,result] = await uni.login().catch(err=>err)
         console.log(result,err)
         if(err || result.errMsg !== "login:ok") return uni.$showMessage("登入失败")
           let obj = {
             code: result.code,
             encryptedData: res.encryptedData,
             iv: res.iv,
             rawData: res.rawData,
             signature: res.signature
           }
           // console.log(obj,"obj")
           // let token = await uni.$http.post("/api/public/v1/users/wxlogin",obj)
           // console.log(token,"token")
           //接口失效
           const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo"
           this.updateToken(token)
           this.naviBack()
       }
    }
  }
</script>

<style lang="stylus">
  .login-wrap
    display: flex
    flex-direction: column
    justify-content: space-around
    align-items: center
    height: 140px
    margin-top: 200px
    .login-btn
      width: 240px
      background-color: #c00000
      border-radius: 100px
    .login-text
      font-size: 14px
      color: #bbb
</style>