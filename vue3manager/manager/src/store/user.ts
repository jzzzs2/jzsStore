/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-05-23 16:30:46
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-06-10 11:27:50
 */
/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-05-23 16:30:46
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-06-09 19:29:16
 */
import { defineStore } from "pinia"
import { loginOperate, logoutUser, getUserInfo } from "@/api/user/user"
import { loginData, succType } from "@/api/user/type"
import { sRoutes, asyncRoutes,anyRoutes } from "@/router/sRouter"
import router from "@/router/router"
import cloneDeep from 'lodash/cloneDeep'
function filterExist(origin: any, exist: any) {
  // @ts-ignore
  return origin.filter(item => {
    if (exist.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filterExist(item?.children, exist)
      }
      return true
    }
  })
}
export default defineStore("user", {
  state: () => {
    return {
      token: localStorage.getItem("TOKEN"),
      routes: sRoutes,
      username: "",
      avatar: "",
      btnRoles: []
    }
  },
  actions: {
    async loginHandle(data: loginData) {
      try {
        let result: succType = await loginOperate(data)
        if (result.code === 200) {
          let token = result.data
          //登录成功
          this.token = token as string
          localStorage.setItem("TOKEN", token as string)
          return Promise.resolve("登录成功,欢迎~")
        } else {
          //登录失败
          console.log("登录失败")
          // return Promise.reject("账号或密码错误")
          return Promise.reject(new Error("账号或密码错误"))
        }
      } catch (error: any) {
        console.log(error.message, "xx")
        return Promise.reject(new Error("请求有误"))
      }
    },
    async logoutHandle() {
      await logoutUser()
      this.token = ""
      this.username = ""
      this.avatar = ""
      localStorage.removeItem("TOKEN")
    },
    async getUserHandle() {
      let result: any = await getUserInfo()
      // console.log(result, "result")
      
      if (result.code == 200) {
        this.username = result.data.name
        this.avatar = result.data.avatar
        // 保存按钮权限
        this.btnRoles = result.data.buttons
        //对菜单数据进行重新渲染 
        // let existArr = result.data.routes
        // console.log("arr",_.cloneDeep(asyncRoutes))
        let newArr = filterExist(cloneDeep(asyncRoutes), result.data.routes)
        console.log(newArr,"xxxArr")
        this.routes = [...sRoutes,...newArr,anyRoutes]
        //对项目router路由进行添加
        let arr = [...newArr,anyRoutes]
        arr.forEach((item:any) => {
          router.addRoute(item)
        })
        console.log("添加权限2222")
        console.log(router.getRoutes(),"routes")
        // 
        return "ok"
        
      } else {
        //获取用户信息失败
        return Promise.reject(new Error("token有误,请重新登录"))
      }
    }
  },
  getters: {

  }
})