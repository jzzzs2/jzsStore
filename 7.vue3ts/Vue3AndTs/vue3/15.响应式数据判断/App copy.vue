<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-04-18 18:16:08
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-20 15:24:41
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
  <h2>首页</h2>
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
  isProxy
} from "vue";
export default defineComponent({
  name: "App",
  setup() {
    const acObj = reactive({name: "jzs",age: 22})
    const readObj = readonly({name: "zjc",age: 24,})
    const normal = ref("hehe")
    const normalObj = ref({name: "tx",age: 999})
    console.log(isRef(normal));  //t
    console.log(isRef(normalObj)); //t
    console.log(isReactive(acObj)); //t
    console.log(isReactive(normalObj)); //f
    console.log(isReadonly(readObj)); //t
    console.log(isReadonly(acObj)); //f
    console.log(isProxy(readObj)); //t
    console.log(isProxy(acObj)); //t
    console.log(isProxy(ref)); //f
    return {
    };
  },
});
</script>
<style scoped lang='stylus'></style>