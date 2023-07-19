/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-07-18 19:15:17
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-07-18 19:21:38
 */
import {createRouter,createWebHistory} from "vue-router"
let router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      component: () => import("@/pages/home/index.vue")
    },
    {
      path: "/hospital",
      component: () => import("@/pages/hospital/index.vue")
    }
  ]
})
export default router