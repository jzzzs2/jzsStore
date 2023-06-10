<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-05-14 17:32:36
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-05-15 20:52:08
-->
<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-05-14 17:32:36
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-05-14 17:42:21
-->
<script setup>
import {nextTick,ref,reactive,shallowReactive,computed,onMounted,onUpdated,watch,watchEffect} from "vue"
onMounted(() => {
  console.log("onMounted","渲染节点完成");
})
onUpdated(() => {
  console.log("onUpdated","因数据改变dom");
})
// import HelloWorld from "./components/HelloWorld.vue";
// import TheWelcome from "./components/TheWelcome.vue";
// import obj from "./test/a"
//计算属性可写
// let firstName = ref("金")
// let lastName = ref("哲晟")
// let fullName = computed({
//   set(newValue) {
//     //  [firstName,lastName] = newValue.split("-")
//      [firstName.value,lastName.value] = newValue.split("-")
//   },
//   get() {
//     return firstName.value +"-"+ lastName.value
//     // return firstName +"-"+ lastName
//   }
// })
//类名的样式的对象,数组写法
// let c1 = ref("normal-red")
// let c3 = ref("weight-font")
// let isActive1 = ref(true)
// let isActive2 = ref(true)
// let isActive3 = ref(false)
// let isActive4 = ref(false)
// let str1 = ref("cyan")
// let str2 = ref("blue")
let r1 = reactive({
  color: "red"
})
let r2 = reactive({
  backgroundColor: "cyan"
})
let r3 = reactive({
  fontSize: "40px"
})
let xx = ref(20)
//对象的遍历
const obj = reactive({
  name: "jzs",
  age: 22,
  children: ["boy", "girl"]
})
let tArr = reactive(["test","test2","test3",{name: "jzs",age:22}])
// function test(e,e2) {
//   console.log(e,e2,"e",typeof e,typeof e2)
// }
// function test3() {
//   console.log("i am a Test");
// }
// let test5 = ref("22")
// watch(tArr,(newValue,oldValue) => {
//   console.log(newValue,oldValue,"watch 触发")
// },{
//   immediate: true
// })
// watch(() => tArr[0],(newValue,oldValue) => {
//   console.log(newValue,oldValue,"watch 触发")
// })
watch(() => tArr[0],(newValue,oldValue) => {
  console.log(newValue,oldValue,"watch 触发")
}
)
// watch(() => tArr,(newValue,oldValue) => {
//   console.log(newValue,oldValue,"watch 触发")
// },{
//   deep: true
// })
// watch(xx,(n,o) => {
//   console.log(n,o,"xxxxx")
// })
// function test() {
//   // tArr[0] = "qaq"
//   // tArr = reactive({})
//   // tArr[3].age = 99
//   xx.value = "99999"
// }
function test() {
  // xx.value = "99"
  tArr[0] = 0
}
watchEffect(() => {
  console.log(xx.value,"xx")
  console.log(document.querySelector("#app").innerText)
},{
  flush: "post"
})
</script>

<template>
  <div id="app">
    xx: {{xx}}
  <!-- watch 监听reactive对象 -->
  {{tArr}}
  <!-- <div @click="test('11')"> -->
  <div @click="test('11',$event)">
  <!-- <div @click="test($event,'11')"> -->
    testButton1
  </div>
  <div @click="test($event,'11')">
    testButton2
  </div>
  <hr>
  <hr>
  <hr>
  test:<input type="text" v-model="test5">
  <!-- test:<input type="text" v-model.lazy="test5"> -->
  <!-- <div v-for="item in tArr"> -->
    <!-- <template v-if="item==='test2'">
      {{item}}
    </template> -->
    <!-- v-for v-if 优先级 v-if优先级更高 -->
    <!-- <span v-for="(value,key,idx) in obj"> {{value + key  + idx}}</span> -->
  <!-- </div> -->
  <!-- <div :class="{'normal-red': isActive1,'weight-font': isActive2}">
    123
  </div>
  <div :class="[isActive1?c1:c3,{'weight-font':isActive2}]">
    444
  </div> -->
  <hr>
  <hr>
  <hr>
  <hr>
  <!-- <div :style="{backgroundColor: str1,color: str2}">
    5555
  </div> -->
  <hr>
  <hr>
  <hr>
  <!-- <div :style="[r1,r2,r3]">
    66666
  </div> -->
  </div>
</template>

<style scoped>
  .normal-red {
    color: red
  }
  .normal-cyan {
    color: cyan
  }
  .weight-font {
    font-weight: 900;
  }
</style>
