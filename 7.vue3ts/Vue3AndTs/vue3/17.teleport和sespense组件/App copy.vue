<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-04-18 18:16:08
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-20 17:19:18
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
  <button @click="show = !show">切换文本框</button>
  <hr />
  <teleport to="body">
    <div v-if="show">
      <p>我是文本框捏</p>
    </div>
  </teleport>
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
export default defineComponent({
  name: "App",
  setup() {
    const show = ref(false);
    return {
      show,
    };
  },
});
</script>
<style scoped lang='stylus'></style>