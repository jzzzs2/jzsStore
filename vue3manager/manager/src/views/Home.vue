<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-05-23 15:36:14
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-06-07 14:56:08
-->
<template>
<el-card>
  <div class="wrap">
    <img :src="userStore?.avatar">
    <div class="intro">
      <h2>{{getTime()}}好啊~{{userStore?.username}}</h2>
      <p class="fz">xx运营管理平台</p>
    </div>
  </div>
</el-card>
<div class="center">
  <Svg name="welcome" width="600px" height="400px" ></Svg>
</div>



<!-- <h2>我是主页{{userStore?.username}} {{userStore?.avatar}}</h2> -->
<!-- <button>test 插槽</button>
<Svg >
  <template #default={test}>
    <button @click="changeSon(test)">change</button>
  </template>
</Svg> -->
</template>

<script lang='ts' setup>
import {getTime} from "@/util/getTime.ts"
import Svg from "@/components/SvgIcon.vue"
import {ref,onMounted} from 'vue'
// import userStoreFnc from "@/store/user.ts"
import {getUserInfo} from "@/api/user/user.ts"
import userStoreFnc from "@/store/user.ts"
let userStore = userStoreFnc()
//
// let changeSon = (test:any) => {
//   test.name = "zjc"
// }
onMounted(async () => {
  // console.log("重新渲染了")
  // let result = await getUserInfo()
  // console.log(result,"##")
  // if (result.code==200) {
  //   userStore.username = result.data.name
  //   userStore.avatar = result.data.avatar
  // } else {
    
  // }
})
//获取用户头像/用户名

</script>
<style scoped lang='scss'>
  .wrap {
    display: flex;
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
    }
    .intro {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      margin-left: 12px;
      .fz {
        font-style: italic;
        color: skyblue;
      }
    }
  }
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>