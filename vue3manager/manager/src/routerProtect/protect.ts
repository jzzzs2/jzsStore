/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-05-26 16:11:37
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-06-09 20:11:40
 */
import router from "@/router/router.ts"
import nprogress from "nprogress"
import "nprogress/nprogress.css"
import store from "@/store/pinia"
import useStoreFnc from "@/store/user.ts"
import { ElMessage } from "element-plus"
let useStore = useStoreFnc(store)
nprogress.configure({ showSpinner: false });
nprogress.configure({ easing: 'ease', speed: 1500 });
router.beforeEach(async (to, from, next) => {
  nprogress.start()
  // try {
  //   // if (to.path === "/login") {
  //   //   next()
  //   //   return
  //   // }
  //   await useStore.getUserHandle()
  //   if (to.path === "/login") {
  //     next({path: from.path})
  //     // return false
  //   } else {
  //     next()
  //   }
  // } catch (error : any) {
  //   ElMessage({
  //     message: error.message,
  //     type: "warning"
  //   })
  //   next({path: "/login",query: {redirect: to.path}})
  // }
  //
  console.log(1)
  if (useStore.token) {
    console.log(2)
    if (to.path === "/login") {
      console.log("不允许跳转")
      console.log(3)
      next({ path: from.path })
      // return false
    } else {
      if (useStore.username) {
        console.log(4)
        next()
      } else {
        try {
          console.log(5)
          await useStore.getUserHandle()
          // 防止页面过快渲染,而routes还未完成添加
          // next()
          console.log(to,"to")
          console.log(6)
          console.log('放行')
          // next()
          // 加载完后再放行
          next({...to})
        } catch (error: any) {
          console.log(7)
          await useStore.logoutHandle()
          ElMessage({
            message: error.message,
            type: "warning"
          })
          next({ path: "/login", query: { redirect: to.path } })
        }
      }
    }
  } else {
    console.log("进入没有token")
    if (to.path !== "/login") {
      console.log(8)
      next({ path: "/login" })
    } else {
      console.log(9)
      next()
    }
  }
})
/* must call `next` */
//当有token时,不能访问login
//没有token时,只能访问login
//当有token时,发请求获取username和avatar
// console.log(to,from,"ss")
// });
router.afterEach((to, from) => {
  console.log(to, from, "ee")
  nprogress.done()
});