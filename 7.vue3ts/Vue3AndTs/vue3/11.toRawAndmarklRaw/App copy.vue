<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-04-18 18:16:08
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-19 16:58:58
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
  <!-- <p>transformObj: {{transformObj}}</p> -->
  <p>obj: {{obj}}</p>
  <button @click="change">change</button>
  <button @click="change2">change2</button>
  <p></p>
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
  markRaw
} from "vue";
export default defineComponent({
  name: "App",
  setup() {
    const obj = reactive<any>({
      name: "jzs",
      age: 22,
      wife: {
        name: "miku",
        age: 18
      }
    })
    // const transformObj = toRaw(obj)
    // console.log(transformObj, "transformObj");
    function change () {
      let addr = markRaw({
        title: "lyrj",
        code: 602
      })
      // let addr = {
      //   title: "lyrj",
      //   code: 602
      // }
      obj.addr = addr
      // transformObj.name = "keainie"
      // transformObj.wife.age = 200
      // console.log(transformObj,"xxxx");
    }
    function change2 () {
      console.log(obj,"obj");
      obj.addr.title = "jinHuaLanxi"
    }
    return {
      // transformObj,
      obj,
      change,
      change2
    };
  },
});
</script>
<style scoped lang='stylus'></style>