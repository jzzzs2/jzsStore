<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-05-25 14:57:23
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-06-09 15:56:39
-->
<template>
  <div class="wrap">
    <div class="screen" ref="screen">
      <div class="scr-top">
        <div class="t-left">
          <span class="t-left-main" @click="toMain">首页</span>
        </div>
        <div class="t-center">
          <span>智慧旅游可视化大数据展示平台</span>
        </div>
        <div class="t-right">
          <span class="t-right-record">统计报告</span>
          <p class="time">时间:{{time}}</p>
        </div>
      </div>
      <div class="scr-bottom">
        <div class="b-left">
          <Tourist></Tourist>
          <People></People>
          <Year></Year>
        </div>
        <div class="b-center">
          <China />
          <Position ></Position>
        </div>
        <div class="b-right">
          <Rank />
          <Csgo />
          <Ability />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import moment from "moment"
import Ability from "./component/Ability.vue"
import Csgo from "./component/Csgo.vue"
import Rank from "./component/Rank.vue"
import Position from "./component/Position.vue"
import China from "./component/China.vue"
import Tourist from "./component/Tourist.vue"
import People from "./component/People.vue"
import Year from "./component/Year.vue"
import {useRouter} from "vue-router"
import { onMounted, ref } from "vue"
let $router = useRouter()
// 时间数据
let time = ref(null)
//获取放大比例
let getScale = (width = 1920, height = 1080) => {
  let xScale = window.innerWidth / width
  let yScale = window.innerHeight / height
  return xScale > yScale ? yScale : xScale
}
//screen
let screen = ref(null)
let setView = () => {
  let scale = getScale()
  screen.value.style["transform"] = `scale(${scale}) translate(-50%,-50%)`
  window.onresize = () => {
    let scale2 = getScale()
    screen.value.style["transform"] = `scale(${scale2}) translate(-50%,-50%)`
  }
}
onMounted(() => {
  setView()
  // 时间设置
  let moment1 = moment().format("YYYY年MM月DD日 :hh时mm分ss秒")
  time.value = moment1 
  setInterval(() => {
    time.value = moment().format("YYYY年MM月DD日 :hh时mm分ss秒")
  },1000)
})
// 回到首页按钮回调
let toMain = () => {
  $router.push("/home")
}
</script>
<style scoped lang='scss'>
p {
  margin: 0;
  padding: 0;
}
.wrap {
  flex-grow: 1.2;
  width: 100vw;
  height: 100vh;
  background-color: red;
  background: url(./images/bg.png);
    background-size: 100% 100%;
  .screen {
    position: fixed;
    left: 50%;
    top: 50%;
    width: 1920px;
    height: 1080px;
    transform-origin: left top;
    .scr-top {
      display: flex;
      height: 40px;
      // background-color: blue;
      .t-left {
        flex-grow: 1;
        background: url(./images/dataScreen-header-left-bg.png ) no-repeat;
        background-size: 100% 100%;
        .t-left-main {
          float: right;
          width: 120px;
          height: 42px;
          line-height: 42px;
          color: #4CB5E0;
          text-align: center;
          font-size: 20px;
          background: url(./images/dataScreen-header-btn-bg-l.png) no-repeat;
          background-size: 100% 100%;
        }
      }
      .t-center {
        flex-grow: 1.2;
        height: 90px;
        line-height: 90px;
        background: url(./images/dataScreen-header-center-bg.png) no-repeat;
        background-size: 100% 100%;
        font-size: 28px;
        font-weight: 500;
        color: #4CB5E0;
        text-align: center;
      }
      .t-right {
        flex-grow: 1;
        height: 42px;
        line-height: 42px;
        background: url(./images/dataScreen-header-right-bg.png) no-repeat;
        background-size: 100% 100%;
        .t-right-record {
          float: left;
          width: 120px;
          height: 42px;
          line-height: 42px;
          color: #4CB5E0;
          text-align: center;
          font-size: 20px;
          background: url(./images/dataScreen-header-btn-bg-r.png) no-repeat;
          background-size: 100% 100%;
        }
        .time {
          margin-left: 10px;
          color: #4CB5E0
        }
      }
    }
    .scr-bottom {
      position: relative;
      top: 30px;
      display: flex;
      padding: 0px 12px;
      color: white;
      .b-left {
        width: 22vw;
        flex-grow: 1;
        padding-left: 16px;
        display: flex;
        flex-direction: column;
      }
      .b-center {
        flex-grow: 4;
        width: 35vw
        // height: 100vh;
      }
      .b-right {
        width: 24vw;
        flex-grow: 2;
        height: 100vh;
        display: flex;
        flex-direction: column;
      }
    }
  }
}
</style>