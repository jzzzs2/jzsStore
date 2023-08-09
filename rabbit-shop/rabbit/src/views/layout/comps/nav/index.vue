<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-07-28 15:14:42
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-08-07 15:46:18
-->
<template>
  <div class="nav">
    <div class="content" v-if="userStore.userInfo.token">
      <div class="goods">我的订单</div>
      <span class="gap"></span>
      <div class="user">用户中心</div>
      <span class="gap"></span>
      <div class="enter">{{ userStore.userInfo.nickname }}你好!</div>
      <span class="gap"></span>
      <div class="help">
        <el-popconfirm title="确定要退出么?" @confirm="quitLogin">
          <template #reference>
            <span>退出登录</span>
          </template>
        </el-popconfirm>
      </div>
    </div>
    <div class="content" v-else>
      <div class="goods" @click="$router.push('/login')">去登录</div>
      <span class="gap"></span>
      <span class="gap"></span>
      <div class="help">
        帮助中心
      </div>
      <span class="gap"></span>
      <div class="our">
        关于我们
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router"
import useUserStore from "@/stores/user.js"
let userStore = useUserStore()
let $router = useRouter()
let quitLogin = () => {
  //action执行退出登录 并跳转到登录页面
  userStore.userQuit()
}
</script>
<style scoped lang='scss'>
.nav {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 50px;
  line-height: 50px;
  background-color: rgb(45, 44, 45);
  padding: 0px 40px;

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: rgb(143, 142, 143);
    font-size: 12px;
    & * {
      cursor: pointer;
    }
    .goods {
      cursor: pointer;
    }

    .gap {
      padding: 0px 16px;

      &::after {
        content: "";
        display: block;
        background-color: rgb(143, 142, 143);
        width: 2px;
        height: 10px;
      }
    }
  }
}</style>