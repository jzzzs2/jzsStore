<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-04-18 14:55:15
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-18 16:49:46
-->
<template>
  鼠标位置
  x: {{x}}
  y: {{y}}
</template>

<script lang='ts'>
import { defineComponent} from "vue";
import getPosition from "@/hook/useMousePosition"
export default defineComponent({
  name: "App",
  setup() {
    const {x, y} = getPosition()
    return {
      x,
      y
    };
  },
});
</script>
<style scoped lang='stylus'></style>