/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-07-28 14:01:43
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-08-02 16:00:54
 */
import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import("@/views/layout/index.vue"),
      children: [
        {
          path: "",
          component: () => import("@/views/home/index.vue")
        },
        {
          path: "category/:id",
          component: () => import("@/views/category/index.vue")
        },
        {
          path: "category/sub/:id",
          component: () => import("@/views/subCategory/index.vue")
        },
        {
          path: "detail/:id",
          component: () => import("@/views/detail/index.vue")
        }
      ]
    },
    {
      path: '/login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/login/index.vue')
    }
  ],
  scrollBehavior() {
    return {
      top: 0
    }
  }
})

export default router
