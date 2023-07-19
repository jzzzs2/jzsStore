<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-06-28 20:14:36
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-06-29 16:12:51
-->
<template>
  <!-- <p>222</p>
  <p>444</p>
  <p>888</p>
  <p>999</p>
  <p>777</p>
  <p>2323232</p>
  <p>2323232</p>
  <p>2323232</p>
  <p>2323232</p>
  <p>2323232</p>
  <p>2323232</p>
  <p>2323232</p>
  <p>2323232</p>
  <p>2323232</p>
  <p>2323232</p>
  <p>2323232</p>
  <p>2323232</p>
  <p>2323232</p>
  <p>2323232</p>
  <p>2323232</p>
  <p>2323232</p>
  <p>2323232</p>
  <p>2323232</p>
  <p>2323232</p>
  <p>2323232</p>
  <p>2323232</p>
  <p>2323232</p>
  <p>2323232</p>
  <p>2323232</p>
  <p>2323232</p>
  <p>2323232</p>
  <p>2323232</p>
  <p>2323232</p>
  <p>2323232</p>
  <p>2323232</p>
  <p>2323232</p>
  <p>2323232</p>
  <p>2323232</p>
  <p>2323232</p>
  <p>2323232</p>
  <p>2323232</p>
  <p>2323232</p>
  <p>2323232</p>
  <p>2323232</p>
  <p>2323232</p>
  <p>2323232</p>
  <p>2323232</p>
  <p>2323232</p>
  <p>2323232</p>
  <p>2323232</p>
  <img v-lazy alt="Vue logo" src="./assets/logo.png">
  <img v-lazy src="./assets/m2.png" alt="">
  <img v-lazy src="./assets/m4.png" alt="">
  <img v-lazy src="./assets/mk.png" alt=""> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <!-- <div class="box">
    <div class="l1"></div>
    <div class="c1"></div>
    <div class="r1"></div>
  </div> -->
  
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: "App",
  // components: {
  //   HelloWorld
  // }
  mounted() {
    console.log("渲染完毕");
  },
};
</script>

<style>
.box {
  display: flex;
}
.l1 {
  width: 100px;
  height: 400px;
  background-color: yellow;
}
.c1 {
  /* width: calc(100% - 200px); */
  height: 400px;
  flex-grow: 1;
  background-color: skyblue;
}
.r1 {
  width: 100px;
  height: 400px;
  background-color: red;
}
</style>
