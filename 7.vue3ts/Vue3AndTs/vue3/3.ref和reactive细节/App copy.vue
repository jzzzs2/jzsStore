<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-04-18 14:55:15
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-18 15:08:02
-->
<template>
  <h2>normal: {{normal}}</h2>
  <h2>obj: {{obj}}</h2>
  <button @click="changeNormal">change normal</button>
  <button @click="changeObj">change obj</button>
</template>

<script lang='ts'>
import {defineComponent, reactive, ref} from 'vue'
export default defineComponent({
  name: '',
  setup() {
    let normal = ref("normalData")
    let obj = ref({
      name: "jzs",
      age: 22,
      wife: {
        name: "miku"
      }
    })
    function changeNormal () {
      normal.value = "changed Data"
    }
    function changeObj () {
      obj.value.name += "="
      obj.value.wife.name += "="
    }
    console.log(normal,obj);
    // console.log(normal.value, obj.value, "++");
    return {
      normal,
      obj,
      changeNormal,
      changeObj
    }
  },
})

</script>
<style scoped lang='stylus'>

</style>