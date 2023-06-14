<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-06-13 12:41:51
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-06-13 16:51:39
-->
<template>
  <h2>我是页面1</h2>
  <div class="box">
    <van-image
      width="100"
      height="100"
      src="../../public/mk.png"
      alt="title"
      fit="scale-down"
      round
      lazy-load
    ></van-image>
    <van-image
      width="100"
      height="100"
      src="../../public/mk.png"
      alt="title"
      fit="scale-down"
      round
      lazy-load
    ></van-image>
    <van-image
      width="100"
      height="100"
      src="../../public/mk.png"
      alt="title"
      fit="scale-down"
      round
      lazy-load
    ></van-image>
    <van-image src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg">
      <template #loading>
        <van-loading type="spinner" size="20" />
      </template>
    </van-image>
  </div>
  <!-- 弹出层 -->
  <van-cell title="展示弹出层" @click="showPop" is-link></van-cell>
  <van-popup
    round
    closeable
    close-icon="close"
    close-icon-position="top-left"
    position="left"
    v-model:show="show"
    :style="{ padding: '64px' }"
    @open="open"
    @opened="opened"
    @close="close"
    @closed="closed"
    teleport="body"
    >content</van-popup
  >
  <!-- toast -->
</template>

<script lang='ts' setup>
import { showToast, showLoadingToast, showSuccessToast, showFailToast,closeToast } from "vant";
import { onMounted, ref } from "vue";
onMounted(() => {
  // showToast("tips")
  let toastObj = showLoadingToast({
    message: "加载中3s...",
    forbidClick: true,
    duration: 0
  });
  let count = 3
  let timer = setInterval(() => {
    console.log("11")
    count--
    if (count === 0) {
      clearInterval(timer)
      closeToast()
      return 
    }
    toastObj.message = `加载中${count}s...`
  },1000)
  // showSuccessToast("成功文案")
  // showFailToast("失败文案")
  // showToast({
  //   message: "This message will contain a incomprehensibilities long word.",
  //   wordBreak: 'break-all'
  //   // position: "top"
  // })
});
let show = ref(false);
let showPop = () => {
  show.value = !show.value;
};
let open = () => {
  console.log("open");
};
let opened = () => {
  console.log("opened");
};
let close = () => {
  console.log("close");
};
let closed = () => {
  console.log("closed");
};
// Promise.reject(new Error("fail"))
// console.log(22)
</script>
<style scoped lang='scss'>
.box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  background-color: skyblue;
}
</style>