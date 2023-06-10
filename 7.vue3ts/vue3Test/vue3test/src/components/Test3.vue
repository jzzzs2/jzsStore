<template>
i am test3
<span @click="add">add</span>
</template>

<script lang='ts'>
import {defineComponent, reactive, ref} from 'vue'
export default defineComponent({
  name: '',
  setup(props,ctx) {
    console.log(ctx,"ctx")
    ctx.emit("test")
    ctx.emit("test")
    ctx.emit("test")
  },
})

</script>
<style scoped lang='stylus'>
</style>