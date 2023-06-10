<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-06-09 15:30:38
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-06-09 15:49:55
-->
<template>
  <div class="csgo">
    <p class="ratio">饰品上涨比率</p>
    <img src="../images/dataScreen-title.png" alt="" />
    <!--  -->
    <div class="echart" ref="echart"></div>
  </div>
</template>

<script lang='ts' setup>
import { onMounted, ref } from "vue"
import * as echarts from "echarts"
let echart = ref<any>()
onMounted(() => {
  let myEchart = echarts.init(echart.value)
  let option = {
    xAxis: {
      type: "category",
      data: ["一月", "二月", "三月", "四月", "五月", "六月", "七月"],
      splitLine: {
        show: false,
      },
    },
    yAxis: {
      name: "百分比",
      splitLine: {
        show: false,
      },
    },
    series: {
      type: "scatter",
      symbol: 'roundRect',
      emphasis: {
        scale: 1.5,
        // labelLine: {
        //   show: true
        // }
      },
      data: [10, 50, 120, 30, 10, 20, 70],
      label: {
        show: true,
        position: "right",
        fontSize: 18
      }
    },
  }
  myEchart.setOption(option)
})
</script>
<style scoped lang='scss'>
.csgo {
  height: 300px;
  background: url(../images/dataScreen-main-lc.png) no-repeat;
  background-size: 100% 100%;
  margin-top: 20px;
  .ratio {
    font-size: 20px;
  }
  > img {
    margin-top: 10px;
  }
  .echart {
    height: 100%;
  }
}
</style>