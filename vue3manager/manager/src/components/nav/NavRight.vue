<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-05-25 15:22:55
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-06-07 17:25:03
-->
<template>
  <div class="nav-right">
    <el-button
      icon="RefreshRight"
      size="small"
      circle
      @click="refresh"
    ></el-button>
    <el-button
      icon="FullScreen"
      size="small"
      circle
      @click="fullScreen"
    ></el-button>
    <el-popover
      placement="right-start"
      title="设置"
      :width="300"
      trigger="hover"
    >
      <template #default>
        <el-form>
          <el-form-item label="主题色">
            <el-color-picker
              v-model="settingStore.color"
              show-alpha
              :predefine="predefineColors"
              @change="colorChange"
            />
          </el-form-item>
          <el-form-item label="暗黑模式">
            <el-switch
              v-model="settingStore.dark"
              size="small"
              inline-prompt
              active-icon="Moon"
              inactive-icon="Sunny"
              @change="changeTheme"
            />
          </el-form-item>
        </el-form>
      </template>
      <template #reference>
        <el-button icon="Setting" size="small" circle></el-button>
      </template>
    </el-popover>

    <img :src="userStore.avatar" alt="" />
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ userStore.username }}
        <el-icon class="el-icon--right">
          <ArrowDown />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
  <!-- 弹出框 -->
</template>

<script lang='ts' setup>
import settingFnc from "@/store/setting"
import { nextTick, onMounted, ref, watch } from "vue"
import navStore from "@/store/nav/show.ts"
import userStoreFnc from "@/store/user.ts"
import { useRouter, useRoute } from "vue-router"
let userStore = userStoreFnc()
let settingStore = settingFnc()
let navStoreObj = navStore()
let $router = useRouter()
let $route = useRoute()
let refresh = () => {
  navStoreObj.isFresh = false
  nextTick(() => {
    console.log("刷新")
    navStoreObj.isFresh = true
  })
  // console.log("xxx",navStoreObj)
  // navStoreObj.isFresh = !navStoreObj.isFresh
}
// watch(() => navStoreObj.isFresh,(newV,oldV) => {
//   // console.log(newV,oldV,"xx")
// })
let isFull = ref(false)
let fullScreen = () => {
  let isFull = document.fullscreenElement
  if (!isFull) {
    document.documentElement.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
}
let logout = async () => {
  await userStore.logoutHandle()
  $router.push({ path: "/login", query: { redirect: $route.path } })
}
//
let isOpen = ref(false)
// 暗黑模式数据
// 取色数据
// const color = ref("rgba(255, 69, 0, 0.68)")
const predefineColors = ref([
  "#ff4500",
  "#ff8c00",
  "#ffd700",
  "#90ee90",
  "#00ced1",
  "#1e90ff",
  "#c71585",
  "rgba(255, 69, 0, 0.68)",
  "rgb(255, 120, 0)",
  "hsv(51, 100, 98)",
  "hsva(120, 40, 94, 0.5)",
  "hsl(181, 100%, 37%)",
  "hsla(209, 100%, 56%, 0.73)",
  "#c7158577",
])
//暗黑模式按钮回调
let changeTheme = (isDark: boolean) => {
  if (isOpen.value) {
    console.log("暗黑按钮回调")
    if (isDark) {
      localStorage.setItem("dark", String(true))
      document.documentElement.classList.add("dark")
    } else {
      localStorage.setItem("dark", String(false))
      document.documentElement.classList.remove("dark")
    }
  }
}
let colorChange = (color: string) => {
  // console.log(color,"color")
  localStorage.setItem("color", color)
  document.documentElement.style.setProperty("--el-color-primary", color)
}
onMounted(() => {
  isOpen.value = true
  console.log(settingStore.dark)
  if (settingStore.dark) {
    document.documentElement.classList.add("dark")
  }
  if (settingStore.color) {
    document.documentElement.style.setProperty("--el-color-primary", settingStore.color)
  }
  // console.log(settingStore,settingStore.dark)
  // setTimeout(() => {
  //   console.log(settingStore.dark)
  // },2000)
  // console.log("mounted")
  // if (localStorage.getItem("dark")=="true") {
  //   document.documentElement.classList.add("dark")
  // }
})
</script>
<style scoped lang='scss'>
.nav-right {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-right: 14px;
  .el-button {
    margin-right: 8px;
  }
  & img {
    width: 32px;
    height: 32px;
  }
}
.el-button {
  background-color: #fff;
}
.el-button:hover {
  transform: scale(1.2);
}
</style>