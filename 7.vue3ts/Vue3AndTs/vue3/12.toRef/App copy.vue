<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-04-18 18:16:08
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-19 17:45:00
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
  <p>{{obj}}</p>
  <p>{{age}}</p>
  <button @click="change">change</button>
  <hr>
  <Child :age="age" />
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
  toRef
} from "vue";
import Child from "@/components/Child.vue"
export default defineComponent({
  components: {
    Child
  },
  name: "App",
  setup() {
    const obj = reactive({
      name: "jzs",
      age: 22,
      wife: {
        name: "miku",
        age: 18
      }
    })
    const age = toRef(obj.wife, "age")
    function change () {
      console.log(age,"age");
      // age.value = 9999
      // obj.wife.age = 9999
      obj.wife.age += 10
    }
    return {
      age,
      obj,
      change
    };
  },
});
</script>
<style scoped lang='stylus'></style>