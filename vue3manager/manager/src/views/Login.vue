<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-05-23 15:36:30
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-06-09 18:46:46
-->
<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-05-23 15:36:30
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-05-24 15:01:14
-->
<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-05-23 15:36:30
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-05-23 20:38:06
-->

<template>
  <div class="login-wrap">
    <el-row>
      <el-col :span="12" :xs="{ span: 0 }"></el-col>
      <el-col :span="12" :xs="{ span: 24 }">
        <el-form class="login-form" :model="inputObj" :rules="rules" ref="loginForm">
          <h1>Hello</h1>
          <h2>权限管理后台</h2>
          <el-form-item prop="username">
            <el-input
              v-model="inputObj.username"
              placeholder="请输入账号"
              :prefix-icon="User"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="inputObj.password"
              placeholder="请输入密码"
              show-password
              :prefix-icon="Lock"
            ></el-input>
          </el-form-item>
          <el-button type="primary" @click="loginUser" :loading="isLoading">
            登录
          </el-button>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script lang='ts' setup>
import {useRouter,useRoute} from "vue-router"
import {ref,reactive} from 'vue'
import {ElMessage,ElNotification} from "element-plus"
import {User,Lock} from "@element-plus/icons-vue"
import storeFnc from "@/store/user.ts"
import {getTime} from "@/util/getTime.ts"
let inputObj = reactive({
  username: "",
  password: ""
})
let loginForm = ref()
let userValid =  (rule: any, value: any, callback: any) => {
  // console.log(rule,value,callback,"valid")
  if(value.length >= 5 && value.length <= 10) {
    callback()
  } else {
    callback(new Error("账号长度应该在5到10捏"))
    // console.log("222")
  }
}
let pwdValid = (rule: any, value: any, callback: any) => {
  if(value.length >= 6 && value.length <= 10) {
    callback()
  } else {
    callback(new Error("密码长度应该在6到10捏"))
    // console.log("222")
}}
let rules = reactive({
  username: [
    {
      validator: userValid,
      trigger: "change"
    }
  ],
  password: [
    {
      validator: pwdValid,
      trigger: "change"
    }
  ]
})
let isLoading = ref(false)
let $router = useRouter()
let dataObj = storeFnc()
let $route = useRoute()
//用户交互登入
let loginUser = async () => {
  //对表单内容进行校验,如果校验不通过会抛错,停止执行
  await loginForm.value.validate()
  
  isLoading.value = true
  // let $router = useRouter()
  try {
    await dataObj.loginHandle(inputObj)
    ElNotification({
    title: 'Hi',
    message: `${getTime()}好`,
    position: 'top-right',
    type: "success"
    })
    isLoading.value = false
    if ($route.query.redirect) {
      $router.push({path: $route.query.redirect as string})
    } else {
      $router.push("/home")
    }
  } catch (error) {
    isLoading.value = false
    ElMessage({
    message: error.message,
    grouping: true,
    type: 'error',
  })
  }
  
}
</script>
<style scoped lang='scss'>
.login-wrap {
  width: 100%;
  height: 100vh;
  background: no-repeat url("@/assets/images/background.jpg");
  background-size: cover;
}
.login-form {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
  top: 300px;
  left: 100px;
  width: 60%;
  height: 260px;
  padding: 20px;
  background: no-repeat url("@/assets/images/login_form.png");
  background-size: cover;
  h1 {
    font-size: 40px;
    color: #fff;
  }
  h2 {
    font-size: 30px;
    color: #fff;
  }
}
</style>