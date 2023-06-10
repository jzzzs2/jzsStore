<template>
  <svg :style="{width,height}">
    <use :xlink:href="prefix + name" :fill="color"></use>
  </svg>
  <!-- <slot :test="test"></slot> -->
</template>

<script lang='ts' setup>
import {ref} from 'vue'
// let test = ref({
//   name: "jzs",
//   age: 12
// })
defineProps({
  name: {
    type: String
  },
  prefix: {
    type: String,
    default: "#icon-"
  },
  width: {
    type: String,
    default: "30px"
  },
  height: {
    type: String,
    default: "30px"
  },
  color: {
    type: String,
    default: ""
  }
})
</script>
