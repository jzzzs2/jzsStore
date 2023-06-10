<template>
  <div class="rank">
    <p class="title">各国游戏热度</p>
    <img src="../images/dataScreen-title.png" alt="" />
    <!--  -->
    <div class="echart" ref="echart"></div>
  </div>
</template>

<script lang='ts' setup>
import { ref,onMounted } from "vue"
import * as echarts from "echarts"
let echart = ref()
onMounted(() => {
  let myEhart = echarts.init(echart.value)
  let option = {
    xAxis: {
      type: "category",
      data: ['中国',"俄罗斯","美国","英国","法国"]
    },
    yAxis: {
      splitLine: {
        show: false
      }
    },
    series: [
      {
        type: "bar",
        data: [20,30,10,99,10]
      },
      {
        type: "line",
        data: [20,30,10,99,10]
      }
    ]
  }
  myEhart.setOption(option)
})
</script>
<style scoped lang='scss'>
.rank {
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
    height: 26vh;
  }
}
</style>