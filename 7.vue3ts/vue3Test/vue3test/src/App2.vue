<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-05-14 17:32:36
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-05-15 11:25:51
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
import {nextTick,ref,reactive,shallowReactive,computed} from "vue"
import HelloWorld from "./components/HelloWorld.vue";
import TheWelcome from "./components/TheWelcome.vue";
import obj from "./test/a"
const a = "i am a";
let count = ref(99)
let arr = reactive([count])
function add () {
  fullName.value = "周-君臣"
  // arr[0].value++
  // count.value++
  // nextTick(() => {
  //   console.log(document.querySelector("#test").innerText);
  // })
  // twoObj.age = 999
  // twoObj.children[0].price = "$100"
  //一个对象的reactive代理对象只有一个..
  // console.log(twoObj.children===son,twoObj.children,son)
  // console.log(refObj);
  // refObj.value = {name: "waixren",age: 999}
  // console.log(reactiveObj.children,"xxxxx",shallowReactObj.children);
  // reactiveObj.children++
  // shallowReactObj.children++
  // console.log(reactiveObj.children,shallowReactObj.children);
}
let son =  {
  name: "zjc",
  age: 22
}
let obj2 = {
  name: "keainie",
  age: 22,
  children: son
}
let twoObj = reactive(obj2)
let threeObj = reactive(obj2)
let fourObj = reactive(twoObj)
let refTest = ref(22)
let refObj = ref({
  name: "jzs",
  age: 22
})
let ref2 = ref("zjc")
let ref3 = ref(3)
let ref4 = ref(3)
let normalObj = {
  name: 'jzs',
  // children: ref(1)
  children: ref3
}
let normalObj2 = {
  name: 'jzs',
  // children: ref(1)
  children: ref4
}
let {children} = normalObj
let reactiveObj = reactive(normalObj)
let shallowReactObj = shallowReactive(normalObj2)
// 计算属性
const cptObj = reactive({
  name: "jzs",
  // children: ["zjc"]
  children: []
})
//计算属性可写
let firstName = ref("金")
let lastName = ref("哲晟")
let fullName = computed({
  set(newValue) {
    //  [firstName,lastName] = newValue.split("-")
     [firstName.value,lastName.value] = newValue.split("-")
  },
  get() {
    return firstName.value +"-"+ lastName.value
    // return firstName +"-"+ lastName
  }
})
// const refCpt = computed(() => {
//   return cptObj.children.length > 0 ? "yes": "no"
// })
</script>

<template>
  性:{{firstName}}
  名:{{lastName}}
  全名: {{fullName}}
  <!-- {{refCpt}} -->
  <!-- {{arr}} -->
  <!-- {{reactiveObj}} -->
  <hr>
  <!-- {{shallowReactObj}} -->
  <!-- {{normalObj}} -->
  <!-- {{children}}
  {{children + 1}}
  {{normalObj.children.value + 1}}
  {{normalObj.children + 1}}
  <span>{{normalObj.children}}</span>
  <span>222</span> -->
  <!-- {{refObj}} -->
  <!-- <h3>isSame {{twoObj===threeObj}} {{twoObj===fourObj}}</h3> -->
  <!-- <h2>{{twoObj}}</h2> -->
  <!-- <div id="test">
    {{obj}}
    {{ a }}
    {{count}}
  </div> -->
  <button @click="add">add</button>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
