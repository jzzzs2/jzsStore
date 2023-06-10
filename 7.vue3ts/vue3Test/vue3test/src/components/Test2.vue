<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-05-16 14:42:16
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-05-16 17:06:29
-->
<template>
<div>
  i am test2 组件
  <!-- {{obj}} -->
</div>
</template>

<script setup>
import {defineComponent, reactive, ref} from 'vue'
console.log(this,"thisxx");
let obj = defineProps({
  t1: {
    type: Number,
    // default: 10
  },
  t3: {
    type: Number,
    // default: 99,
    validator(value) {
      return Number(value) > 200
    }
  },
  fc: {
    type: Function,
    default() {
      return "i am function"
    }
  },
  a1: {
    type: String,
    // default: "22"
  },
  b2: {
    type: String,
    default: "88"
  },
  t2: {
    type: Object,
    default(rawProps) {
      //rawProps,原始props对象
      console.log(rawProps,"rawProps");
      return rawProps
    }
  },
  ber: {
    type: [Boolean,Number]
  }
})
// console.log(obj,"objxx");
// let result = obj.fc()
// console.log(result,"result")
console.log(obj.ber,"ber")
// export default defineComponent({
//   name: 'test2',
//   setup(props,ctx) {
//     console.log("test2")
//     const boy = "abcd"
//     return {
//       boy
//     }
//   },
// })

</script>
<style scoped lang='stylus'>
</style>