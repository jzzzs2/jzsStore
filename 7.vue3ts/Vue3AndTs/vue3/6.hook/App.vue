<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-04-18 14:55:15
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-18 17:36:43
-->
<template>
  <!-- <h2>{{result }}</h2> -->
  <ul v-for="item in result" :key="item.id">
    <li>{{item.id}}</li>
    <li>{{item.name}}</li>
    <li>{{item.age}}</li>
  </ul>
  <h2>{{ loading }}</h2>
  <h2>{{ errorMsg }}</h2>
</template>

<script lang='ts'>
import { defineComponent, onMounted, ref } from "vue";
import http from "@/hook/useRequest";
interface obj {
  id: number;
  age: number;
  name :string
}
export default defineComponent({
  name: "App",

  setup() {
    const url = "http://localhost:8080/data/obj.json";
    const url2 = "/data/arr.json";
    // console.log(http(url));
    //  const {loading, result, errorMsg} = http<obj>(url);
     const {loading, result, errorMsg} = http(url2);
    // console.log(msg, data, err, "message");
    // onMounted(() => {
    //   try {
    //     console.log(http(url));
    //     const { msg, data, err } = http(url);
    //     console.log(msg, data, err, "message");
    //     message.value = msg;
    //     data.value = data;
    //     error.value = err;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // });
    return {
      loading, result, errorMsg
    };
  },
});
</script>
<style scoped lang='stylus'></style>