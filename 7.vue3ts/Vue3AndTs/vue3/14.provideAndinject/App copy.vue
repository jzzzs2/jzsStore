<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-04-18 18:16:08
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-20 15:14:31
-->
<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-04-18 18:16:08
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-19 17:36:01
-->
<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-04-18 14:55:15
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-19 15:00:16
-->
<template>
  <h2>{{color}}</h2>
  <button @click="color='blue'">to blue</button>
  <button @click="color='red'">to red</button>
  <button @click="color='green'">to green</button>
  <Child />
</template>

<script lang='ts'>
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  ref,
  shallowRef,
  shallowReactive,
  readonly,
  shallowReadonly,
  toRaw,
  markRaw,
  toRef,
  customRef,
  provide
} from "vue";
import Child from "@/components/Child.vue"
export default defineComponent({
  name: "App",
  components: {
    Child
  },
  setup() {
    const color = ref("yellow")
    provide("color",color)
    return {
      color
    };
  },
});
</script>
<style scoped lang='stylus'></style>