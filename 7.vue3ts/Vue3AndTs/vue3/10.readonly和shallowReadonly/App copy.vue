<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-04-18 18:16:08
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-19 16:37:31
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
  <h2>deep: {{readObjD}}</h2>
  <h2>shallow: {{readObjS}}</h2>
  <button @click="change">change</button>
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
} from "vue";
export default defineComponent({
  name: "App",
  setup() {
    const obj = reactive({
      name: "jzs",
      age: 22,
      wife: {
        name: "miku",
        age: 18
      }
    })
    const refObj = ref({
      name: "jzs",
      age: 23,
      wife: {
        name: "mol",
        age: 18
      }
    })
    // const readObjD = readonly(refObj)
    const readObjD = readonly(ref("222"))
    // const readObjD = readonly(obj)
    // const readObjS = shallowReadonly(refObj)
    const readObjS = shallowReadonly(ref("333"))
    // const readObjS = shallowReadonly(obj)
    function change () {
      // console.log(readObjD);
      // readObjS.name = "hhh"
      // readObjS.value.wife.name = "zjc"
      // readObjS.value = "999"
      // readObjD.value = "2"
      // readObjS.value.name = "zjc"
      // readObjD.name = "hhh"
      // readObjD.wife.name = "fsfds"
    }
    return {
      readObjD,
      readObjS,
      change
    };
  },
});
</script>
<style scoped lang='stylus'></style>