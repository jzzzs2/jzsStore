<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-04-18 16:15:13
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-18 16:38:18
-->
<template>
  <h2>子组件</h2>
  <input type="text" v-model="msg" />
</template>

<script lang='ts'>
import { defineComponent, ref, onBeforeMount,onMounted,onBeforeUpdate,onUpdated,onBeforeUnmount,onUnmounted } from "vue";
export default defineComponent({
  name: "",
  setup() {
    console.log("vue3 setup");
    // const msg = ref("testMsg");
    //vue3 生命周期
    // onBeforeMount(()=> {
    //   console.log("vue3 onBeforeMount");
    // })
    // onMounted(() => {
    //   console.log("vue3 onMounted");
    // })
    // onBeforeUpdate(() => {
    //   console.log("vue3 onBeforeUpdate");
    // })
    // onUpdated(() => {
    //   console.log("vue3 onUpdated");
    // })
    // onBeforeUnmount(() => {
    //   console.log("vue3 onBeforeUnmount");
      
    // })
    // onUnmounted(() => {
    //   console.log("vue3 onUnmounted");
    // })
    return {
      // msg,
    };
  },
  
  //vue2 生命周期
  // beforeCreate() {
  //   console.log("vue2 beforeCreate");
  // },
  // created() {
  //   console.log("vue2 created");
  // },
  // beforeMount() {
  //   console.log("vue2 beforeMount");
  // },
  // mounted() {
  //   console.log("vue2 mounted");
  // },
  // beforeUpdate() {
  //   console.log("vue2 beforeUpdate");
  // },
  // updated() {
  //   console.log("vue2 updated");
  // },
  // beforeUnmount() {
  //   console.log("vue2 beforeUnmount");
  // },
  // unmounted () {
  //   console.log("vue2 unmounted");
  // }
});
</script>
<style scoped lang='stylus'></style>