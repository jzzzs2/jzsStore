<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-05-14 17:32:36
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-05-17 15:08:12
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
import Test2Cpm from "@/components/Test2.vue"
import testcpm from "@/components/Test.vue"
import TestCpm3 from '@/components/Test3.vue'
let isActive = true
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

let xx = ref(20)
//对象的遍历
const obj = reactive({
  name: "jzs",
  age: 22,
  children: ["boy", "girl"]
})
watchEffect(() => {
  console.log(xx.value,"xx")
  console.log(document.querySelector("#app").innerText)
},{
  flush: "post"
})
let testDom = ref(null)
onMounted(() => {
  // console.log(testDom,"testDom")
  // console.log(tRef,"tRef")
  // testFc.value.focus()
  // console.log(testComponent,testComponent.value.sonTest,testComponent.value.sonFunc,"component")
})
// let testFc = ref(null)
// watchEffect(() => {
//   if (testFc.value) {
//     testFc.value.focus()
//   } else {
//     console.log("还未挂在");
//     // 此时还未挂载，或此元素已经被卸载（例如通过 v-if 控制）
//   }
// })
let arr = reactive([1,2,3])
let tRef = ref([])
let test = ref("22")
function testRef(e) {
  console.log(e,e.value,"el")
}
let count = ref(1)
// const testComponent = ref(null)
function add() {
  count.value++
}
function dec() {
  count.value--
}
// let cpl = ref(test2cpm)
let cpl = ref("test2")
</script>

<template>
  <div id="app">
    <!-- <Test2Cpm a1="123" b2="666" :t3="199" ber></Test2Cpm> -->
    <TestCpm3 @test="count++"></TestCpm3>
    <!-- <Test2Cpm a1="123" b2="666" :t3="199"></Test2Cpm> -->
    <!-- <test2 ></test2> -->
    count: {{count}}
    <!-- <testCpm ref="testComponent" testData="123" hh="99"></testCpm> -->
    <!-- <component is="test-cpm"></component> -->
    <!-- <testCpm  testData="123" hh="99" @testEmit1="add" @testEmit2="dec"></testCpm>
    <div ref="testDom">
      123
    </div>
    <hr>
    <hr>
    <div v-for="(item,idx) in arr" :key="idx" ref="tRef">
      {{item}}
    </div>
    <hr>
    <hr> -->
    <!-- <input type="text" v-model="test" :ref="(el) => {console.log(el.value,'el')}"> -->
    <!-- ref绑定函数 在渲染.重新渲染时执行,函数获得e参数(该dom元素) -->
    <!-- <input type="text" v-model="test" :ref="testRef2"> -->
    <input type="text" v-model="test" ref="testFc">
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
