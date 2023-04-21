<template>
  <h3>孙组件</h3>
  <p :style="{color}">testData {{color}}</p>
</template>

<script lang='ts'>
import {defineComponent, reactive, ref, inject} from 'vue'
export default defineComponent({
  name: '',
  setup() {
    const color = inject("color")
    return {
      color
    }
  },
})

</script>
<style scoped lang='stylus'>
</style>