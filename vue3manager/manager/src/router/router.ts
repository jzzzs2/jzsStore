/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-05-23 15:24:03
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-05-25 15:13:14
 */
import  {createRouter,createWebHashHistory} from "vue-router"
import {sRoutes} from "./sRouter"
let router = createRouter({
  history: createWebHashHistory(),
  routes: sRoutes as any
})
export default router