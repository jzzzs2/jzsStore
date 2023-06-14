<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-06-13 12:34:33
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-06-14 11:55:26
-->
<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
const images = [
  "https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg",
  "https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg",
];
</script>

<template>
  <!-- <div class="Mine-categories-swipe">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="black">
      <van-swipe-item v-for="image in images" :key="image">
        <img :src="image" />
      </van-swipe-item>
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>
  </div> -->

  <router-view></router-view>
  <!-- <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" /> -->
</template>

<style lang="scss">
#app {
  padding: 0;
}
.my-swipe .van-swipe-item {
  width: 100%;
  // height: 120px;
  color: #fff;
  font-size: 20px;
  text-align: center;
  background-color: #39a9ed;
}
// .Mine-categories-swipe {
//   // width: 100vw;
// }
.Mine-categories-swipe img {
  display: inline-block;
  width: 100%;
  // height: 100px;
}
/* .logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
} */
</style>
