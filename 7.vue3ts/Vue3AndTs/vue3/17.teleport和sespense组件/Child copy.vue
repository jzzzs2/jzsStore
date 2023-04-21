<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-04-19 15:02:34
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-20 15:00:13
-->
<template>
  <h2>子组件</h2>
  <Grand />
</template>

<script lang='ts'>
import { computed, defineComponent,toRef,Ref } from "vue";
import Grand from "@/components/Grand.vue"
export default defineComponent({
  name: "",
  components: {
    Grand
  },
  setup(props: any) {
    return {
    };
  },
});
</script>
<style scoped lang='stylus'></style>