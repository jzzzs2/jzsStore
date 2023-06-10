<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-06-07 18:29:57
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-06-08 20:30:39
-->
<template>
  <div class="year">
    <p class="ratio">年龄比例</p>
    <img src="../images/dataScreen-title.png" alt="" />
    <!--  -->
    <div class="echart" ref="echart">
      
    </div>
  </div>
</template>

<script lang='ts' setup>
import { onMounted, ref } from "vue"
import * as echarts from "echarts"
let option = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: '340',
    orient: "vertical"
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: true,
        position: 'inside'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 20,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 20, name: '老年' },
        { value: 10, name: '中年' },
        { value: 30, name: '青年' },
        { value: 10, name: '少年' },
        { value: 30, name: '幼儿' }
      ]
    }
  ]
};
let echart = ref()
onMounted(() => {
  let myChart = echarts.init(echart.value)
  myChart.setOption(option)
})
</script>
<style scoped lang='scss'>
.year {
  flex-grow: 1.2;
  height: 290px;
  background: url(../images/dataScreen-main-lc.png) no-repeat;
  background-size: 100% 100%;
  margin-top: 20px;
  .ratio {
    margin-top: 6px;
  }
  > img {
    margin-top: 6px;
  }
  .echart {
    height: 80%;
  }
}
</style>