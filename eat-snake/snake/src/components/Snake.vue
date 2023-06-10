<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-05-19 17:07:27
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-05-19 18:00:28
-->
<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-05-19 17:07:27
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-05-19 17:11:17
-->
<script setup lang="ts">
  class Food {
    wrap :HTMLElement
    constructor() {
      this.wrap = document.querySelector(".food")
      this.changePosition()
    }
    changePosition() {
      let top = Math.floor(Math.random() * 30) * 10
      let left = Math.floor(Math.random() * 30) * 10
      console.log(this.wrap)
      this.wrap.style.top = top + "px"
      this.wrap.style.left = left + "px"
    }
  }
  let food = new Food()
</script>

<template>
  <div class="wrap">
    <div class="stage">
      <div class="snake">
        <div></div>
      </div>
      <div class="food">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div class="score">
      <div>SCORE:<span id="score">0</span></div>
      <div>LEVEL:<span id="level">1</span></div>
    </div>
  </div>
</template>

<style scoped>
.wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  width: 360px;
  height: 420px;
  border: 10px solid #222;
  border-radius: 20px;
  background-color: #b7d4a8;
}
.stage {
  position: relative;
  box-sizing: border-box;
  width: 304px;
  height: 304px;
  border: 2px solid #222;
}
.score {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 304px;
}
.score > div {
  font-size: 18px;
  font-weight: 900;
}
.snake {
  position: absolute;
  top: 0;
  left: 0;
}
.snake div{
  box-sizing:unset;
  width: 10px;
  height: 10px;
  border: 2px solid #b7d4a8;
  background-color: #222;
}
.food {
  position: absolute;
  top: 200px;
  left: 200px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
  width: 10px;
  height: 10px;
  transform: rotate(45deg);
}
.food div {
  width: 4px;
  height: 4px;
  background-color: #222;
}
</style>
