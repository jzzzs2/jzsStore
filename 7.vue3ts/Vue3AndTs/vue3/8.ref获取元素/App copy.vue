<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-04-18 18:16:08
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-19 15:38:14
-->
<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-04-18 14:55:15
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-19 15:00:16
-->
<template>
  <input type="text" ref="testName">
</template>

<script lang='ts'>
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  ref
} from "vue";
export default defineComponent({
  name: "App",
  setup() {
    //
    const testName = ref<HTMLElement | null>(null)
    onMounted(() => {
      testName.value && testName.value.focus()    
      // testName.value  && testName.value.focus()
    })
    //
    return {
      testName
    };
  },
});
</script>
<style scoped lang='stylus'>
</style>