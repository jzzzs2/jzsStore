/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-05-23 15:32:30
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-06-09 18:26:26
 */
// const Home = () => import("@/components/views/Home")
// const Login = () => import("@/components/views/Login")
// const Error = () => import("@/components/views/Error")
export let sRoutes = [
  {
    path: "/",
    name: "layout",
    // component: () => import("/src/views/Home.vue"),
    component: () => import("/src/layout/Layout.vue"),
    meta: {
      title: "",
      hidden: false,
      // icon: "PieChart"
      icon: ""
    },
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "Home",
        component: () => import("/src/views/Home.vue"),
        meta: {
          title: "首页",
          hidden: false,
          icon: "HomeFilled"
        }
      }
    ]
  },
  {
    path: "/screen",
    name: "Screen",
    meta: {
      title: "数据大屏",
      icon: "PieChart"
    },
    component: () => import("/src/layout/screen/index.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("/src/views/Login.vue"),
    meta: {
      title: "登录",
      hidden: true,
      icon: "Switch"
    },
    children: [
      {
        path: "/user",
        name: "user",
        component: () => import("/src/views/Home.vue"),
        meta: {
          title: "用户",
          hidden: true,
          icon: "Close"
        }
      }
    ]
  },
  {
    path: "/404",
    name: "404",
    component: () => import("/src/views/Error.vue"),
    meta: {
      title: "错误",
      hidden: true,
      icon: "Filter"
    }
  }
]
export let asyncRoutes = [
  {
    path: "/acl",
    name: "Acl",
    component: () => import("/src/layout/Layout.vue"),
    meta: {
      title: "权限管理",
      icon: "Avatar"
    },
    redirect: "/acl/user",
    children: [
      {
        path: "/acl/user",
        name: "User",
        component: () => import("/src/layout/acl/User.vue"),
        meta: {
          icon: "UserFilled",
          title: "用户管理"
        }
      },
      {
        path: "/acl/role",
        name: "Role",
        component: () => import("/src/layout/acl/Role.vue"),
        meta: {
          icon: "Service",
          title: "角色管理"
        }
      },
      {
        path: "/acl/permission",
        name: "Permission",
        component: () => import("/src/layout/acl/Menu.vue"),
        meta: {
          icon: "Grid",
          title: "菜单管理"
        }
      }
    ]
  },
  {
    path: "/product",
    name: "Product",
    component: () => import("/src/layout/Layout.vue"),
    meta: {
      icon: "Goods",
      title: "商品管理"
    },
    redirect: "/product/trademark",
    children: [
      {
        path: "/product/trademark",
        name: "Trademark",
        component: () => import("/src/layout/product/Trade.vue"),
        meta: {
          icon: "SoldOut",
          title: "品牌管理"
        }
      },
      {
        path: "/product/attr",
        name: "Attr",
        component: () => import("/src/layout/product/Attr.vue"),
        meta: {
          icon: "Tools",
          title: "属性管理"
        }
      },
      {
        path: "/product/spu",
        name: "Spu",
        component: () => import("/src/layout/product/Spu.vue"),
        meta: {
          icon: "Calendar",
          title: "SPU管理"
        }
      },
      {
        path: "/product/sku",
        name: "Sku",
        component: () => import("/src/layout/product/Sku.vue"),
        meta: {
          icon: "Odometer",
          title: "SKU管理"
        }
      }
    ]
  },
]
export let anyRoutes = 
  {
    path: "/:test(.+)",
    name: "any",
    redirect: "/404",
    meta: {
      title: "任意路由",
      hidden: true,
      icon: "Bell"
    }
  }