<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-04-18 18:16:08
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-19 15:27:04
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
  <!-- <p>obj {{obj}}</p> -->
  <!-- <h2>refObj {{refObj}}</h2> -->
  <button @click="changeReact">change reactive</button>
  <button @click="changeRefs">change toRefs</button>
  <p>{{name}}</p>
  <p>{{age}}</p>
  <p>{{wife}}</p>
</template>

<script lang='ts'>
import {
  defineComponent,
  reactive,
  toRefs
} from "vue";
export default defineComponent({
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
    let refObj =  toRefs(obj)
    function changeReact () {
      obj.name += "="
      obj.age += 2
      obj.wife.name += "="
    }
    function changeRefs () {
      // console.log(refObj,"refObj");
      // refObj.age.value += 1
      // refObj.name.value += "="
      // refObj.wife.value.name += "="
      // refObj.wife.value.age += 1
      //
    }
    // const refObj = toRefs(obj)
    // console.log(obj, "__", refObj);
    // console.log({...obj});
    console.log({...refObj},"refObj");
    return {
      // ...obj,
      // refObj,
      // obj,
      ...refObj,
      changeReact,
      changeRefs
    };
  },
});
</script>
<style scoped lang='stylus'>
</style>