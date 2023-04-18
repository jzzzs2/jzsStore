<template>
  <div>
    <h1>子组件</h1>
    {{msg}}
    <button @click="reduce">reduce</button>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
export default defineComponent({
  name: "Child",
  props: {
    msg: {
      type: Number,
    },
  },
  setup (props,context) {
    console.log("子组件setup");
    console.log(props.msg,context.attrs.msg1,context.emit,context.slots,"content");
    function reduce () {
      context.emit("reduce")
    }
    return {
      reduce
    }
  }
});
</script>
<style scoped lang='stylus'></style>