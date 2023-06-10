<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-06-07 18:29:44
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-06-08 17:43:33
-->
<template>
  <div class="sex">
    <p class="ratio">男女比例</p>
    <img src="../images/dataScreen-title.png" alt="" />
    <div class="people">
      <div class="man">
        <p>男士</p>
        <img src="../images/man.png" alt="" />
      </div>
      <div class="lady">
        <p>女士</p>
        <img src="../images/woman.png" alt="" />
      </div>
    </div>
    <!-- echart -->
    <p class="img-title">
      <span>男士58%</span>
      <span>女士42%</span>
    </p>
    <div class="sex-bar" ref="ebar"></div>
  </div>
</template>

<script lang='ts' setup>
import { onMounted, ref } from "vue"
import * as echarts from "echarts"
let ebar = ref<any>()
onMounted(() => {
  let myEchart = echarts.init(ebar.value)
  let option = {
    // title: {
    //   text: "男女比例"
    // },
    xAxis: {
        show: false,
       boundaryGap: false 
    },
    yAxis: {
      show: false,
      type: "category"
      // boundaryGap: false
    },
    series: [
      {
        type: "bar",
        data: [100],
        itemStyle: {
           borderRadius: 8
        },
         barGap: '-100%',
         barWidth: 20,
         z: 99
      },
      {
        type: "bar",
        data: [58],
        itemStyle: {
           borderRadius: 8
        },
        barWidth: 20,
        z: 100
      }
    ],
  }
  myEchart.setOption(option)
})
</script>
<style scoped lang='scss'>
.sex {
  flex-grow: 1;
  width: 100%;
  // height: 100%;
  background: url(../images/dataScreen-main-lc.png) no-repeat;
  background-size: 100% 100%;
  margin-top: 20px;
  .ratio {
    font-size: 20px;
    margin-left: 10px;
  }
  > img {
    margin-left: 10px;
    margin-top: 10px;
  }
  .people {
    position: relative;
    top: 70px;
    display: flex;
    justify-content: space-around;
    .man {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      width: 106px;
      height: 106px;
      text-align: center;
      background: url(../images/man-bg.png) no-repeat;
      background-size: 100% 100%;
      img {
        width: 50px;
      }
    }
    .lady {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      width: 106px;
      height: 106px;
      text-align: center;
      background: url(../images/woman-bg.png) no-repeat;
      background-size: 100% 100%;
      img {
        width: 50px;
      }
    }
  }
  .echart2 {
    height: 20px;
  }
  .img-title {
    position: relative;
    top: 100px;
    display: flex;
    justify-content: space-around;
  }
  .sex-bar {
    position: relative;
    top: 30px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>