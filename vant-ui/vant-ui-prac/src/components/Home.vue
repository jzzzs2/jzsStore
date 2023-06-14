<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-06-13 12:43:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-06-14 12:05:00
-->
<template>
  <div class="box">
    <van-nav-bar
      title="标题"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
  </div>

  <van-row>
    <van-col span="6"
      ><van-button @click="jumpOne" type="success" plain
        >按钮Test1</van-button
      ></van-col
    >
    <van-col span="6" offset="1"><h4>我是Home</h4></van-col>
    <van-col span="6"
      ><van-button plain type="warning" @click="jumpTwo"
        >按钮Test2</van-button
      ></van-col
    >
  </van-row>
  <!-- cell -->
  <!-- <van-cell-group title="i am title">
    <van-cell
      title="姓名1"
      value="可爱捏"
      size="large"
      icon="chat-o"
    ></van-cell>
    <van-cell title="姓名2" value="讨厌捏"></van-cell>
    <van-cell
      title="姓名3"
      value="展开"
      label="描述信息"
      is-link
      arrow-direction="down"
      to="/testtwo"
    ></van-cell>
    <van-cell
      title="姓名3"
      value="展开"
      label="描述信息"
      is-link
      to="testone"
      center
    ></van-cell>
    <van-cell>
      <template #title>
        <p>我是左</p>
      </template>
      <template #value>
        <p>我是右</p>
      </template>
      <template #label>
        <p>我是描述</p>
      </template>
      <template #icon>
        <span>我是图标1</span>
        <van-icon name="fire-o" color="#ee0a24" />
      </template>
      <template #right-icon>
        <span>我是图标2</span>
        <van-icon name="cart-o" color="#1989fa" badge="1" size="20" />
      </template>
      <template #extra>
        <p>extra</p>
      </template>
    </van-cell>
  </van-cell-group> -->

  <!-- <router-view></router-view> -->
  <!-- 轮播图 -->
  <!-- <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item class="item">1</van-swipe-item>
    <van-swipe-item class="item">2</van-swipe-item>
    <van-swipe-item class="item">3</van-swipe-item>
    <van-swipe-item class="item">4</van-swipe-item>
  </van-swipe> -->
  <!-- <div class="box">
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in images" :key="image">
        <img :src="image" />
      </van-swipe-item>
    </van-swipe>
  </div> -->
</template>

<script lang='ts' setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
// let $router = useRouter();
// let jumpOne = () => {
//   $router.push({ path: "/testone" });
// };
// let jumpTwo = () => {
//   $router.push({ path: "/testtwo" });
// };
// const images = [
//   "https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg",
//   "https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg",
// ];
let onClickLeft = () => history.back();
</script>
<style  lang='scss'>
body {
  background-color: #ccc;
}
.box {
  width: 100vw;
  height: 200px;
}
.my-swipe .van-swipe-item {
  // width: 100vw;
  width: 100%;
  height: 200px;
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
  img {
    display: inline-block;
    width: 100%;
    height: 200px;
  }
}
</style>