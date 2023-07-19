## vue3 pinia

```
1.入口使用
import {createPinia} from "pinia"
export default createPinia()

import store from "@/store/pinia"
const app = createApp(App)
app.use(store)
```

```
2.创建仓库
import {defineStore} from "pinia"
export default defineStore("user",{
  state: () => {
    return {
      
    }
  },
  actions: {
   
  },
  getters: {

  }
})
```

## vue3 router

```
1.入口导入
import  {createRouter,createWebHashHistory} from "vue-router"
import {sRoutes} from "./sRouter"
let router = createRouter({
  history: createWebHashHistory(),
  routes: sRoutes
})
export default router

import router from "@/router/router"
app.use(router as any)
```

```
2.获取路由router
import {useRouter} from "vue-router"
let $router = useRouter()
$router.push("/")

3.获取单次路由route
import {useRoute} from "vue-router"
let $route = useRoute()
可以通过$route获取matched,meta,path等信息
```

+ await promise.reject() 外部不catch的话,会中断程序.

## 全屏dom操作

```
1.document.fullscreenElement 判断全屏
2.document.documentElement.requestFullscreen() 进行全屏
3.document.exitFullscreen() 退出全屏
```

## pinia 的小仓库在ts文件中使用时

```
import store from "@/store/pinia"
import useStoreFnc from "@/store/user.ts"
let useStore = useStoreFnc(store)
```

+ ts: 接口返回值类型书写接口,可以写一个公共接口对大多数据类型进行配对,其余不同数据书写小接口并对公共接口进行继承.

+ element-plus  el-pagination组件 layout="prev, pager, next, jumper,->,sizes, total" 左右布局写法

## Promise项目新用法

```
async 函数名 () {
	try {
		let result = await 发送请求
		if (result.code) {
		return "ok"
		} else {
		return Promise.reject(new Error("xxx"))
		}
	}catch(error) {
		调用UI组件,显示请求错误
	}
}

外部在调用这个函数时,
try {
	await 函数名()
	//成功
}catch(err) {
	调用组件提示信息,err.message
}
Promise.reject(new Error("fail")) 执行会抛错,如果没有捕获会中断程序.
```

## ref的函数使用 实际应用

```
当el-input状态发生变化时,会调用autoFocus,参数为该组件对象.
<el-input :ref="autoFocus"></el-input>
let autoFocus = (el :vc) => {
	el.focus()
}
```

## 深拷贝的简单实现

```
let obj = {
name: "jzs",
obj: {
	test: "123"
	}
}
let newObj = JSON.parse(JSON.stringfy(obj))
```

## PInia仓库清除自己的全部数据 $reset

```
cateStoreObj.$reset()
```



sss