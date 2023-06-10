<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-06-09 15:52:26
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-06-09 16:01:05
-->
<template>
  <div class="ability">
    <p class="ratio">能力数据</p>
    <img src="../images/dataScreen-title.png" alt="" />
    <!--  -->
    <div class="echart" ref="echart"></div>
  </div>
</template>

<script lang='ts' setup>
import { ref, onMounted } from "vue"
import * as echarts from "echarts"
let echart = ref()
onMounted(() => {
  let myChart = echarts.init(echart.value)
  myChart.setOption(option)
})
//
let nameList = ["突破", "残局", "狙击", "道具", "辅助"] // 名字
let valueList = [100, 100, 30, 100, 100] // 分数,最大值为100

let indicatorList = []
nameList.map((item, index) => {
  indicatorList.push({
    name: item,
    value: valueList[index],
    max: 100,
  })
})
let option = {
  radar: {
    // shape: 'circle',
    indicator: indicatorList,
    axisName: {
      formatter: function (value, indicator) {
        return `{a|${value}}`
      },
      rich: {
        a: {
          fontSize: "14px",
          fontFamily: " Source Han Sans CN-Regular",
          fontWeight: 400,
          color: "white",
          padding: [0, 8, 0, 0],
        },
        b: {
          padding: [4, 8, 4, 8],
          backgroundColor: "rgba(229, 243, 255, 0.6500)",
          borderRadius: 50,
          fontFamily: "Source Han Sans CN-Medium",
          fontWeight: 500,
          color: "white",
        },
      },
    },
  },
  series: [
    {
      name: "雷达图",
      type: "radar",
      color: "skyblue",
      label: {
        show: false,
      },
      areaStyle: {
        color: "white",
      },
      data: [
        {
          value: valueList,
          name: "Allocated Budget",
        },
      ],
    },
  ],
}
</script>
<style scoped lang='scss'>
.ability {
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