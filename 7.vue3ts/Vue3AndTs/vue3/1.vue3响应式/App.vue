<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-04-17 15:37:40
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-17 20:00:52
-->
<template>
  <h2>我是首页</h2>
  <!-- <div>内容num: {{num}}</div> -->
  <div>内容obj: {{ acObj }}</div>
  <!-- <div>内容obj: {{ obj }}</div> -->
  <!-- <button @click="add">add</button> -->
  <!-- <button @click="changeObj1">add1</button>
  <button @click="changeObj2">add2</button>
  <button @click="changeObj3">add3</button>
  <button @click="changeObj4">add4</button>
  <button @click="changeObj5">add5</button> -->
  <!-- <button @click="changeObj6">add6</button> -->
  <button @click="modifyObjProp">modifyObjProp</button>
  <button @click="modifyArr">modifyArr</button>
  <button @click="addObjProp">addObjProp</button>
  <button @click="deleteObjProp">deleteObjProp</button>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";

export default defineComponent({
  name: "App",
  // components: {
  //   HelloWorld
  // }
  // setup () {
  //   console.log("setup 执行了");
  //   let num = 0;
  //   // let num = false
  //   let resNum = ref(num)
  //   let add = function () {
  //     console.log("add + +");
  //     resNum.value++
  //     // resNum.value = true
  //     //操作数据时要.value
  //     //在页面上渲染时,直接传对象
  //     //定义基本类型
  //     console.log(num,resNum);
  //   }
  //   return {
  //     num: resNum,
  //     add
  //   }
  // }
  // 操作对象和数组
  // setup () {
  //   let obj = {
  //     name: "jzs",
  //     age: "22",
  //     wife: {
  //       name: "miku",
  //       games: ["csgo", "valorant", "apex"]
  //     }
  //   }
  //   let acObj = reactive(obj)
  //   let changeObj1 = function () {
  //     acObj.name = "zjc"
  //     console.log(obj,acObj,"obj");
  //   }
  //   let changeObj2 = function () {
  //     acObj.age += "="
  //     console.log(obj,acObj,"obj");
  //   }
  //   let changeObj3 = function () {
  //     acObj.wife.name += "="
  //     console.log(obj,acObj,"obj");
  //   }
  //   let changeObj4 = function () {
  //     acObj.wife.games[3] = "world2"
  //     console.log(obj,acObj,"obj");
  //   }
  //   let changeObj5 = function () {
  //     acObj.wife.name = "古堡龙姬"
  //     console.log(obj,acObj,"obj");
  //   }
  //   // let changeObj6 = function () {
  //   //   acObj.wife.age = "22"
  //   //   console.log(obj,acObj,"obj");
  //   // }
  //   return {
  //     acObj,
  //     changeObj1,
  //     changeObj2,
  //     changeObj3,
  //     changeObj4,
  //     changeObj5,
  //     // changeObj6
  //   }
  // }
  //vue3 和 vue2 原理
  beforeCreate () {
    console.log("beforeCreate",this);
    
  },
  created () {
    console.log(this,"created");
    
  },
  mounted() {
    console.log(this,"mounted");
  },
  setup() {
    console.log("setup执行",this,"this");
    let obj:any = {
      name: "jzs",
      age: 22,
      wife: {
        name: "miku",
        games: ["csgo", "volorant"],
      },
    };
    let acObj = reactive<any>(obj)
    function modifyObjProp () {
      acObj.name = "zjc"
      // obj.name = "zjc"
      console.log(acObj,obj);
      
    }
    function modifyArr () {
      acObj.wife.games[0] = "cs2"
      // obj.wife.games[0] = "cs2"
      console.log(acObj,obj);
    }
    function addObjProp () {
      acObj.addr = "jinHua"
      // obj["addr"] = "jinHua"
      console.log(acObj,obj);
    }
    function deleteObjProp () {
      delete acObj.age
      // delete obj.age
      console.log(acObj,obj);
    }
    return {
      acObj,
      // obj,
      modifyObjProp,
      modifyArr,
      addObjProp,
      deleteObjProp
    }
  },
});

</script>

