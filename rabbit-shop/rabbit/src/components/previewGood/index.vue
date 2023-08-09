<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-08-03 16:04:23
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-08-07 16:11:41
-->
<script setup>
import { ref, watch } from "vue"
import { useMouseInElement } from "@vueuse/core"
// 图片列表
defineProps({
  imageList: {
    type: Array,
    default: () => []
  }
})
// 显示图片的idx
let imgIdx = ref(0)
let changeImage = (idx) => {
  imgIdx.value = idx
}
// 获取父元素
let target = ref(null)
// 获取鼠标相对于元素位置
let { elementX, elementY, isOutside } = useMouseInElement(target)
// 蒙版层的绝对定位坐标
let left = ref(0)
let top = ref(0)
// 放大镜大图移动
let offsetX = ref(0)
let offsetY = ref(0)
watch([elementX, elementY], () => {
  if (!isOutside) {
    console.log("处理");
    //有效范围处理
    if (elementX.value >= 100 && elementX.value <= 300) {
      left.value = elementX.value - 100
    }
    if (elementY.value >= 100 && elementY.value <= 300) {
      top.value = elementY.value - 100
    }
    //边界范围处理
    if (elementX.value < 100) {
      left.value = 0
    }
    if (elementX.value > 300) {
      left.value = 200
    }
    if (elementY.value > 300) {
      top.value = 200
    }
    //放大图片距离赋值
    offsetX.value = -2 * left.value
    offsetY.value = -2 * top.value
  }

})
</script>


<template>
  <div class="goods-image">
    <!-- 左侧大图-->
    <div class="middle" ref="target">
      <img :src="imageList[imgIdx]" alt="" />
      <!-- 蒙层小滑块 -->
      <div class="layer" :style="{ left: `${left}px`, top: `${top}px` }" v-show="!isOutside"></div>
    </div>
    <!-- 小图列表 -->
    <ul class="small">
      <li v-for="(img, i) in imageList" :key="i" @mouseenter="changeImage(i)" :class="{ active: imgIdx == i }">
        <img :src="img" alt="" />
      </li>
    </ul>
    <!-- 放大镜大图 -->
    <div class="large" v-show="!isOutside" :style="[
      {
        backgroundImage: `url(${imageList[imgIdx]})`,
        backgroundPositionX: `${offsetX}px`,
        backgroundPositionY: `${offsetY}px`,
      },
    ]"></div>
  </div>
</template>

<style scoped lang="scss">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;

  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
  }

  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    z-index: 500;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    // 背景图:盒子的大小 = 2:1  将来控制背景图的移动来实现放大的效果查看 background-position
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }

  .layer {
    width: 200px;
    height: 200px;
    background: rgba(0, 0, 0, 0.2);
    // 绝对定位 然后跟随咱们鼠标控制left和top属性就可以让滑块移动起来
    left: 0;
    top: 0;
    position: absolute;
  }

  .small {
    width: 80px;

    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;

      &:hover,
      &.active {
        border: 2px solid $xtxColor;
      }
    }
  }
}
</style>