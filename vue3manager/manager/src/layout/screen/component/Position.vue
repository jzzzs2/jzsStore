<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-06-08 19:14:08
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-06-08 20:30:05
-->
<template>
  <div class="position">
    <p class="title">未来7天游客趋势图</p>
    <img src="../images/dataScreen-title.png" alt="" />
    <!--  -->
    <div class="echart" ref="echart"></div>
  </div>
</template>

<script lang='ts' setup>
import { onMounted, ref } from "vue"
import * as echarts from "echarts"
let echart = ref()
onMounted(() => {
  let myEhart = echarts.init(echart.value)
  let option = {
    left: 200,
    xAxis: {
      splitLine: {
        show: false,
      },
      type: "category",
      data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      boundaryGap: false,
    },
    yAxis: {
      splitLine: {
        show: false,
      },
      show: true,
      name: "(访问量)",
      nameTextStyle: {
        color: "white",
      },
    },
    series: [
      {
        type: "line",

        data: [14, 336, 11, 34, 222, 88, 99],
        smooth: true,
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "red", // 0% 处的颜色
              },
              {
                offset: 1,
                color: "blue", // 100% 处的颜色
              },
            ],
            global: false, // 缺省为 false
          },
        },
      },
    ],
  }
  myEhart.setOption(option)
})
</script>
<style scoped lang='scss'>
.position {
  width: 90%;
  height: 33vh;
  margin: 70px 0px 0px 20px;
  background: url(../images/dataScreen-main-lc.png) no-repeat;
  background-size: 100% 100%;
  margin-top: 20px;
  .title {
    margin-top: 4px;
    font-size: 20px;
  }
  > img {
    margin-top: 10px;
  }
  .echart {
    height: calc(100% - 40px);
  }
}
</style>