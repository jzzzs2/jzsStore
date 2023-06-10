<template>
  <div class="china">
    <div class="echart" ref="echart"></div>
  </div>
</template>

<script lang='ts' setup>
import china from "../china.json"
import { ref, onMounted } from "vue"
import * as echarts from "echarts"
let echart = ref()
echarts.registerMap("china", china)
onMounted(() => {
  let myEchart = echarts.init(echart.value)
  // 注册地图
  let option = {
    //地图组件
    geo: {
      map: "china", //中国地图
      left: 90,
      top: 200,
      label: {
        show: true, //文字显示出来
        color: "white",
        fontSize: 12,
      },
      zoom: 1.3,
      itemStyle: {
        //每一个多边形的样式
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
        opacity: 0.8,
      },
      //地图高亮的效果
      emphasis: {
        itemStyle: {
          color: "red",
        },
        label: {
          fontSize: 40,
        },
      },
    },
    //布局位置
    // grid: {
    //   left: 0,
    //   top: 0,
    //   right: 0,
    //   bottom: 0,
    // },
    series: [
      {
        type: "lines", //航线的系列
        data: [
          {
            coords: [
              [116.405285, 39.904989], // 起点
              [120.153576, 30.287459], // 终点
            ],
            // 统一的样式设置
            lineStyle: {
              color: "#ccc",
              width: 5,
            },
          },
          {
            coords: [
              [112.549248, 37.857014], // 起点
              [102.712251, 25.040609], // 终点
            ],
            // 统一的样式设置
            lineStyle: {
              color: "#ccc",
              width: 5,
            },
          },
        ],
        //开启动画特效
        effect: {
          show: true,
          symbol:
            "path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5C17.6,3.5,6.8,14.4,6.8,27.6c0,13.3,10.8,24.1,24.101,24.1C44.2,51.7,55,40.9,55,27.6C54.9,14.4,44.1,3.5,30.9,3.5z M36.9,35.8c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H36c0.5,0,0.9,0.4,0.9,1V35.8z M27.8,35.8 c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H27c0.5,0,0.9,0.4,0.9,1L27.8,35.8L27.8,35.8z",
          color: "cyan",
          symbolSize: 10,
        },
      },
    ],
  }
  myEchart.setOption(option)
})
</script>
<style scoped lang='scss'>
.china {
  width: 100%;
  height: 70vh;
  .echart {
    height: 100%;
  }
}
</style>