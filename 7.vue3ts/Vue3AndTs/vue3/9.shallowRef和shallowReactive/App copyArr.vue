<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-04-18 18:16:08
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-19 16:18:55
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
  <h2>obj1 ref{{obj1}}</h2>
  <h2>obj2 shallowRef{{obj2}}</h2>
  <h2>obj3 reactive{{obj3}}</h2>
  <h2>obj4 shallowReactive{{ obj4 }}</h2>
  <button @click="change">change</button>
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
} from "vue";
export default defineComponent({
  name: "App",
  setup() {
    //
    const obj = {
      name: "jzs",
      age: 22,
      wife: {
        name: "miku",
        age: 18,
      },
    };
    const arr = [
      { name: "jzs", wife: { name: "miku", age: 18 } },
      { name: "zjc", wife: { name: "luoli", age: 18 } },
    ];
    const obj1 = ref(arr);
    const obj2 = shallowRef(arr);
    const obj3 = reactive(arr);
    const obj4 = shallowReactive(arr);
    // const arr = [
    //   { name: "jzs", wife: { name: "miku", age: 18 } },
    //   { name: "zjc" },
    // ];
    //
    function change() {
      // console.log(obj1);
      // obj1.value[0].name = "keainie"
      // console.log(obj2);
      // obj2.value[0].name = "keainie"
      // obj3[0].wife.name = "mikusame"
      console.log(obj4);
      obj4[0] = {
        name: "xxx",
        wife: {
          name: "999",
          age: 22
        }
      }
      // obj4[0].name = "shabi"
      // console.log("test");
      //ref
      // obj1.value.name += "="
      // obj1.value.wife.name += "="
      //shallowRef
      // console.log(obj2);
      // obj2.value = {name: "newName",age: 22, wife: {name: "mk",age: 22}}
      // obj2.value.name += "="
      // obj2.value.wife.name += "="
      // console.log(obj);
      //reactive
      // obj3.name += "="
      // obj3.wife.name += "="
      //shallowRef
      // obj4.name += "=";
      // obj4.wife.name += "=";
      // console.log(obj4,obj);
      // console.log(obj4,"444");
    }
    return {
      obj,
      arr,
      obj1,
      obj2,
      obj3,
      obj4,
      change,
    };
  },
});
</script>
<style scoped lang='stylus'></style>