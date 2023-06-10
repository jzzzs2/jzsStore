<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-06-07 18:29:31
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-06-08 16:26:59
-->
<template>
  <div class="tourist-wrap">
    <p class="title">实时游客统计</p>
    <p class="line"></p>
    <p class="pre">
      可预约总量
      <span>99999</span>
      人
    </p>
    <div class="people-num">
      <span v-for="item in peopleNum" :key="item" class="people-item">
        {{ item }}
      </span>
    </div>
    <div class="echart" ref="echart"></div>
  </div>
</template>

<script lang='ts' setup>
import { onMounted, ref } from "vue"
import * as echarts from "echarts"
import "echarts-liquidfill"
// echart容器
let echart = ref()
// 人数数据
let peopleNum = ref("216908人")
//
onMounted(() => {
  let myEhart = echarts.init(echart.value)
  let option = {
    series: [
      {
        type: "liquidFill",
        data: [0.5, 0.4, 0.3],
        color: ["red", "#0f0", "rgb(0, 0, 255)"],
        itemStyle: {
          opacity: 0.6,
        },
        label: {
          show: true,
          color: "#294D99",
          insideColor: "#fff",
          fontSize: 20,
          fontWeight: "bold",
          align: "center",
          baseline: "middle",
          position: "inside",
        },
      },
    ],
    // grid: {
    //   top: -20,
    //   left: 40
    // }
  }
  myEhart.setOption(option)
})
</script>
<style scoped lang='scss'>
.tourist-wrap {
  width: 100%;
  height: 300px;
  padding: 0px 6px;
  background: url(../images/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;
  .title {
    font-size: 20px;
  }
  .line {
    width: 100px;
    height: 10px;
    background: url(../images/dataScreen-title.png) no-repeat;
    background-size: 100% 100%;
    margin-top: 10px;
  }
  .pre {
    text-align: right;
    span {
      color: orange;
    }
  }
  .people-num {
    display: flex;
    padding: 0px 20px;
    height: 60px;
    margin-top: 20px;
    .people-item {
      height: 40px;
      flex-grow: 1;
      line-height: 40px;
      font-size: 24px;
      text-align: center;
      color: #4cb5e0;
      background: url(../images/total.png) no-repeat;
      background-size: 100% 100%;
    }
  }
  p {
    margin: 0;
    padding: 0;
  }
  .echart {
    // display: flex;
    // justify-content: center;
    // width: 100px;
    // align-items: flex-end;
    height: 200px;
  }
}
</style>