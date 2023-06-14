<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-06-13 12:42:46
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-06-14 10:57:39
-->
<template>
  <h2>我是页面2</h2>
  <!-- <van-space direction="vertical" fill size="20px"> -->
  <!-- <van-space size="20px" align="start" wrap>
    <van-space size="20px" align="start" >
    <van-button type="warning" block>btn1</van-button>
    <van-button type="success" block>btn2</van-button>
    <van-button type="danger" block>btn3</van-button>
    <van-cell title="1" value="con"></van-cell>
    <van-cell title="2" value="con"></van-cell>
    <van-cell title="3" value="con"></van-cell>
    <van-cell title="3" value="con"></van-cell>
    <van-cell title="3" value="con"></van-cell>
    <van-cell title="3" value="con"></van-cell>
  </van-space> -->
  <!-- <div class="van-ellipsis test van-hairline--bottom van-hairline--top">
    asd342dfasfdsf3sadasd243asda234awdfq2222222222
  </div> -->
  <!-- 动画 -->
  <!-- <transition name="van-fade">
    <div v-show="visible">Fade33333333333434343</div>
  </transition>
  <van-button @click="test" class="van-haptics-feedback" type="danger">show or hide</van-button> -->
  <!-- 日历 -->
  <!-- <van-cell @click="isShow=true" title="选择单个日期" :value="date" is-link>
  </van-cell> -->
  <!-- <van-calendar type="multiple" v-model:show="isShow" @confirm="confirm" /> -->
  <!-- <van-calendar type="range" v-model:show="isShow" @confirm="confirm" /> -->
  <!-- cascader -->
  <!-- <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item>1</van-swipe-item>
    <van-swipe-item>2</van-swipe-item>
    <van-swipe-item>3</van-swipe-item>
    <van-swipe-item>4</van-swipe-item>
  </van-swipe> -->
  <!-- <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item>1</van-swipe-item>
    <van-swipe-item>2</van-swipe-item>
    <van-swipe-item>3</van-swipe-item>
    <van-swipe-item>4</van-swipe-item>
  </van-swipe> -->
</template>

<script lang='ts' setup>
import { ref } from "vue";
let visible = ref(true);
// 日期组件是否显示
let isShow = ref(false);
//日期
let date = ref("");
//选择日期后的回调
let confirm = (val: any) => {
  // console.log(val,"val",val.getMonth() + 1,val.getDate())
  // console.log(val.getYear(),"year")
  console.log(val, "val");
  // if(val.length > 1) {
  //   date.value = `选择了${val.length}个日期`
  // } else {
  //   date.value = `${val[0].getMonth() + 1}月${val[0].getDate()}日`
  // }
  date.value = `${val[0].getMonth() + "." + val[0].getDate()}到${
    val[1].getMonth() + "." + val[1].getDate()
  }`;
  isShow.value = false;
};
let test = () => {
  console.log(!visible.value);
  visible.value = !visible.value;
};
</script>
<style scoped lang='scss'>
.test {
  // width: 100vw;
  width: 100px;
}
//
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  text-align: center;
  background-color: #39a9ed;
}
</style>