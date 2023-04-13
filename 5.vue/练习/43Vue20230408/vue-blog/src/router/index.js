/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-03-30 21:29:10
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-10 14:56:01
 */
/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-03-25 18:13:07
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-03-31 18:45:05
 */
/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-03-15 15:37:19
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-03-25 18:25:22
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import vuex from "@/store/index"
import Home from '../views/Home.vue'
import ArticleList from "@/components/article/ArticleList.vue"
import ArticleSingle from "@/components/article/ArticleSingle.vue"
import ArticleEdit from "@/components/article/ArticleEdit.vue"
// import Column from "@/views/Column.vue"
import MyInfo from "@/views/MyInfo.vue"
import NProgress from "nprogress"
import Photo from "@/views/Photo.vue"
import Wechat from "@/views/Wechat.vue"
import MHome from "@/mobviews/MHome"
import "nprogress/nprogress.css"
import MArticleList from "@/mobviews/MArticleList"
import MArticleContent from "@/mobviews/MArticleContent"
import MClassify from "@/mobviews/MClassify"
import MUser from "@/mobviews/MUser"
const Column = () => import( /* webpackChunkName: column*/ '@/views/Column.vue')
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function (local) {
  return originalReplace.call(this, local).catch(err => err)
}

VueRouter.prototype.push = function (local) {
  return originalPush.call(this, local).catch(err => err)
}
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: "/articles",
    children: [
      {
        path: "/articles",
        component: ArticleList,
        name: "articles"
      },
      {
        path: "/article/:id",
        component: ArticleSingle,
        name: "singleArticle"
      },
      {
        path: "/column",
        component: Column,
        name: "column",
        meta: {
          needAuth: true
        }
      },
      {
        path: "/edit",
        component: ArticleEdit,
        name: "Edit",
        props: (route) => {
          return {
            initClassifyId: route.query.classifyId
          }
        }
      },
      {
        path: "/userInfo",
        component: MyInfo,
        name: "myInfo",
        meta: {
          needAuth: true
        }
      },
      {
        path: "/photo",
        component: Photo,
        name: "photo",
        meta: {
          needAuth: true
        }
      },
      {
        path: '/wechat',
        component: Wechat,
        name: "wechar"
      }
    ]
  },
  {
    path: "/m",
    name: "mHome",
    component: MHome,
    redirect: "/m/articles",
    children: [
      {
        path: "articles",
        name: "mArticles",
        component: MArticleList,
        meta: {
          navType: "MSearch"
        }
      },
      {
        path: "articleContent/:id",
        name: "mArticleContent",
        component: MArticleContent,
        meta: {
          navType: "MNavBar",
          navTitle: "文章",
          btn: "评论"
        }
      },
      {
        path: "classify",
        name: "mClassify",
        component: MClassify,
        meta: {
          navType: "MNavBar",
          navTitle: "分类"
        }
      },
      {
        path: "userInfo",
        name: "mUser",
        component: MUser,
        meta: {
          navType: "MNavBar",
          navTitle: "我的"
        },
        props: (route)=> {
          return {
            state: route.query.state
          }
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes,
  mode: "hash"
})
router.beforeEach((to, from, next) => {
  NProgress.start()
  console.log(to, from);
  if (to.meta.needAuth) {
    NProgress.inc()
    if (!vuex.state.token) {
      Vue.prototype.$notify({
        title: '权限不足',
        message: '请先登入',
        type: 'error'
      })
      NProgress.done()
      next("/")
    }
  }
  next()
})
router.afterEach((to, from) => {
  console.log(to, from);
  NProgress.done()
})
export default router
