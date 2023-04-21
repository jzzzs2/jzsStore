<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-04-19 15:02:34
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-21 15:53:09
-->
<template>
  <h2>子组件</h2>
  {{ msg }}
</template>

<script lang='ts'>
import axios from "axios";
import { defineComponent, computed } from "vue";
export default defineComponent({
  name: "",
  setup() {
    //   new Promise((resolve, reject) => {
    //     resolve({
    //       msg: "abc",
    //     });
    //   })
    // );

    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve({
    //       msg: "abc",
    //     });
    //   }, 2000);
    // });
    return axios.get("/data/arr.json").then(res=>{
      return {
        msg: res.data
      }
    })
  },
});
</script>
<style scoped lang='stylus'></style>