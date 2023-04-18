<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-04-18 14:55:15
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-18 16:17:09
-->
<template>
  <h1>首页</h1>
  <!-- <input type="text" v-model="msg"> -->
  <button type="button" @click="isShow=!isShow">切换</button>
  <Child v-if="isShow" />
</template>

<script lang='ts'>
import {
  defineComponent,
  ref
} from "vue";
import Child from "@/components/Child.vue"
export default defineComponent({
  name: "App",
  components: {
    Child
  },
  setup () {
    const isShow = ref(true)
    return {
      isShow
    }
  }
  // setup() {
  //   console.log("vue3 setup");
  //   const msg = ref("testMsg")
  //   return {
  //     msg
  //   };
  // },
  // //vue2 生命周期
  // beforeCreate() {
  //   console.log("beforeCreate");
  // },
  // created() {
  //   console.log("created");
  // },
  // beforeMount() {
  //   console.log("beforeMount");
  // },
  // mounted() {
  //   console.log("mounted");
  // },
  // beforeUpdate() {
  //   console.log("beforeUpdate");
  // },
  // updated() {
  //   console.log("updated");
  // },
  //vue3中不可使用
  // beforeDestroy() {
  //   console.log("beforeDestroy");
  // },
  // destroyed() {
  //   console.log("destroyed");
  // }
  // beforeOnunmount() {
  //   console.log("beforeOnunmount");
  // },
  // onUnmounted () {
  //   console.log("onUnmounted");
  // }
});
</script>
<style scoped lang='stylus'></style>