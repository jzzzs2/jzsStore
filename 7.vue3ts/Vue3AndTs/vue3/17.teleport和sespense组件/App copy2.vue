<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-04-18 18:16:08
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-21 15:37:53
-->
<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-04-18 18:16:08
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-19 17:36:01
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
  <h2>我是父组件</h2>
  <Suspense>
    <template v-slot:default>
      <Child />
    </template>
    <template v-slot:fallback>
      <h1>LOADING...</h1>
    </template>
  </Suspense>
</template>

<script lang='ts'>
import {
  defineComponent,
  reactive,
  toRefs,
  onMounted,
  ref,
  shallowRef,
  shallowReactive,
  readonly,
  shallowReadonly,
  toRaw,
  markRaw,
  toRef,
  customRef,
  provide,
  isRef,
  isReactive,
  isReadonly,
  isProxy,
} from "vue";
import Child from "@/components/Child.vue"
export default defineComponent({
  name: "App",
  components: {
    Child
  },
  setup() {
    return {};
  },
});
</script>
<style scoped lang='stylus'></style>