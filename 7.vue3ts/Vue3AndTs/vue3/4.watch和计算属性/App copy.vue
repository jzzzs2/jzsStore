<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-04-18 14:55:15
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-18 16:21:46
-->
<template>
  姓氏<input type="text" v-model="user.firstName" /> 名字<input
    type="text"
    v-model="user.lastName"
  />
  <hr />
  <!-- TestName<input type="text" v-model="user.testObj.wife[1]"> -->
  TestName<input type="text" v-model="user.testObj.name" />
  <hr />
  <!-- 姓名1 计算属性 getter<input type="text" v-model="fullName" /> -->
  <hr />
  <!-- 姓名2 计算属性 getter and setter<input type="text" v-model="fullName" /> -->
  <hr />
  姓名3<input type="text" v-model="fullName" />
</template>

<script lang='ts'>
import {
  defineComponent,
  ref,
  reactive,
  watchEffect,
} from "vue";
export default defineComponent({
  name: "App",

  setup() {
    // const firstName = ref("欧阳");
    // const lastName = ref("小明");
    // const fullName = computed( () => {
    //   return firstName.value + "_" + lastName.value
    // })
    // const fullName = computed({
    //   get() {
    //     return firstName.value + "_" + lastName.value
    //   },
    //   set(val :string) {
    //     // let arr = val.split("_")
    //     // firstName.value = arr[0]
    //     // lastName.value = arr[1]
    //   }
    // })
    const user = reactive({
      firstName: "诸葛",
      lastName: "孔明",
      testObj: {
        name: "testName",
        wife: ["csgo2"],
      },
    });
    // const fullName = computed(()=> {
    //   return firstName.value + "_" + lastName.value
    // })
    const fullName = ref("默认名称");
    // watch(fullName,(val) => {
    //   let arr = val.split("_")
    //   user.firstName = arr[0]
    //   user.lastName = arr[1]
    // })
    // watch(user,(val)=> {
    //   console.log("watching",val);
    //   fullName.value = val.firstName + "_" + val.lastName
    // },{
    //   immediate: true,
    //   deep: true
    // })
    // watch([fullName,() => user.firstName,() => user.lastName],(val) => {
    //   console.log("watching",val);
    //   // const arr = val[0].split("_")
    // },{
    //   immediate: true
    // })
    //watchEffect
    watchEffect(() => {
      fullName.value = user.firstName + "_" + user.lastName;
    });
    watchEffect(() => {
      let arr = fullName.value.split("_");
      user.firstName = arr[0];
      user.lastName = arr[1];
    });
    return {
      user,
      fullName,
      // firstName,
      // lastName,
      // fullName,
    };
  },
});
</script>
<style scoped lang='stylus'></style>