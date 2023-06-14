/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-06-13 12:39:01
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-06-13 14:14:44
 */
export const routes = [
  {
    path: "/",
    component: () => import("../components/Home.vue"),
    children: [
      {
        path: "testone",
        // component: () => import("../components/TestOne.vue")
        component: () => import("../components/TestOne.vue")
      },
      {
        path: "testtwo",
        component: () => import("../components/TestTwo.vue")
      }
    ]
  }
]