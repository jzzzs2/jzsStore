<template>
  <div>i am test1组件!</div>
</template>

<script>
// <script setup>
import { defineComponent, reactive, ref } from "vue";
//在setup的标签中接收外部传递的属性
// const obj = defineProps(["testData","hh"])
// console.log(obj,"obj")
//在setup的标签触发外部事件
// const emits = defineEmits(["testEmit1","testEmit2"])
// console.log(this,"this",emit,"emit");
// emits("testEmit1")
// emits("testEmit2")
export default defineComponent({
  name: 'test1',
  setup(props,ctx) {
    console.log(this, ctx, "ctx", "this", props, "props++");
    // ctx.emit("testEmit1")
    ctx.emit("testEmit2")
    // const sonTest = ref(22);
    // const sonFunc = function () {
    //   console.log("function");
    // };
    // return {
    //   sonTest,
    //   sonFunc
    // }
  },
});
</script>
<style scoped lang='stylus'></style>