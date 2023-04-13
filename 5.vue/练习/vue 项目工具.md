# Vue项目工具

## postcss

> PostCSS 是一个允许使用 JS 插件转换样式的工具。 这些插件可以检查（lint）你的 CSS，支持 CSS Variables 和 Mixins， 编译尚未被浏览器广泛支持的先进的 CSS 语法，内联图片，以及其它很多优秀的功能。
>
> PostCSS 在工业界被广泛地应用，其中不乏很多有名的行业领导者，如：维基百科，Twitter，阿里巴巴， JetBrains。PostCSS 的 [Autoprefixer](https://github.com/postcss/autoprefixer) 插件是最流行的 CSS 处理工具之一。
>
> PostCSS 接收一个 CSS 文件并提供了一个 API 来分析、修改它的规则（通过把 CSS 规则转换成一个[抽象语法树](https://zh.wikipedia.org/wiki/抽象語法樹)的方式）。在这之后，这个 API 便可被许多[插件](https://github.com/postcss/postcss/blob/main/README-cn.md#插件)利用来做有用的事情，比如寻错或自动添加 CSS vendor 前缀。

https://www.postcss.com.cn/

- 它能够为 CSS 提供额外的功能；
- 通过在 PostCSS 这个`平台`上，我们能够开发一些插件，来处理我们的CSS，比如热门的：autoprefixer
- 我们能够使用JavaScript来开发插件

### cli

Vue CLI 内部使用了 PostCSS。

你可以通过 `.postcssrc` 或任何 [postcss-load-config](https://github.com/michael-ciniawsky/postcss-load-config) 支持的配置源来配置 PostCSS。也可以通过 `vue.config.js` 中的 `css.loaderOptions.postcss` 配置 [postcss-loader](https://github.com/postcss/postcss-loader)。

我们默认开启了 [autoprefixer](https://github.com/postcss/autoprefixer)。如果要配置目标浏览器，可使用 `package.json` 的 [browserslist](https://cli.vuejs.org/zh/guide/browser-compatibility.html#browserslist) 字段。

## Vue移动适配

>  vue-cli创建完项目之后安装amfe-flexible和postcss-pxtorem

```
npm i amfe-flexible -S
npm i postcss-pxtorem -D 
```

amfe-flexible来根据屏幕动态改变根元素font-size，postcss-pxtorem把代码中px转为rem;在项目根目录建vue.config.js 或者 .postcssrc.js

```
//vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require("autoprefixer")({
            // 配置使用 autoprefixer
            overrideBrowserslist: ["last 15 versions"] 
          }),
          require("postcss-pxtorem")({
            rootValue: 75, // 换算的基数
            // 忽略转换正则匹配项。插件会转化所有的样式的px。比如引入了三方UI，也会被转化。目前我使用 selectorBlackList字段，来过滤
            //如果个别地方不想转化px。可以简单的使用大写的 PX 或 Px 。
            selectorBlackList: ["ig"],
            propList: ["*"],
            exclude: /node_modules/
          })
        ]
      }
    }
  }
};
```

```
//.postcssrc.js
module.exports = {
	plugins: {
    	'autoprefixer': {
      		browsers: ['Android >= 4.0', 'iOS >= 7']
    	},
    	'postcss-pxtorem': {
      		rootValue: 75,
      		propList: ['*'], //属性的选择器，*表示通用
      		selectorBlackList:[]    //忽略的选择器   .ig-  表示 .ig- 开头的都不会转换
    	}
  }
}
```

## Vue axios

> 新建一个文件夹api专门用来存放接口相关的文件和配置

```sh
src
├── ...
├── main.js
├── App.vue
├── api
    ├── unsplash
        ├── index.js
        └── urls.js
    ├── apiList.js
    ├── axios.js
    ├── index.js
    └── install.js
└── common    #工具文件夹
    ├── utils.js
    └── browser.js
```

axios封装

```
import axios from 'axios'
import browser from '../common/browser'

// 创建 axios 实例
let http = axios.create({
  // headers: {'Content-Type': 'application/json'},
  timeout: 60000
})

// 设置 post、put 默认 Content-Type
http.defaults.headers.post['Content-Type'] = 'application/json'
http.defaults.headers.put['Content-Type'] = 'application/json'

// 添加请求拦截器
http.interceptors.request.use(config => {
  if (config.method === 'post' || config.method === 'put') {
    // post、put 提交时，将对象转换为string, 为处理Java后台解析问题
    config.data = JSON.stringify(config.data)
  } else if (config.method === 'get' && browser.isIE) {
    // 给GET 请求后追加时间戳， 解决IE GET 请求缓存问题
    let symbol = config.url.indexOf('?') >= 0 ? '&' : '?'
    config.url += symbol + '_=' + Date.now()
  }
  // 请求发送前进行处理
  return config
}, error => {
  // 请求错误处理
  return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use(response => {
  let {data} = response
  return data
}, error => {
  let info = {}
  let {status, statusText, data} = error.response
  if (!error.response) {
    info = {
      code: 5000,
      msg: 'Network Error'
    }
  } else {
    // 此处整理错误信息格式
    info = {
      code: status,
      data: data,
      msg: statusText
    }
  }
  return Promise.reject(info)
})

/**
 * 创建统一封装过的 axios 实例
 * @return {AxiosInstance}
 */
export default function () {
  return http
}
```

挂载Vue原型 src/api/install.js

```
// 导入模块
import apiList from './apiList'

const install = function (Vue) {
  if (install.installed) return
  install.installed = true
  Object.defineProperties(Vue.prototype, {
    $api: {
      get () {
        return apiList
      },
      enumerable: false, // 不可枚举
      configurable: false // 不可重写
    }
  })
}

export default {
  install
}
```

引入main 使用

```
import Vue from 'vue'
import api from './api/install'
import App from './App'
import router from './router'
import store from './store'

Vue.use(api)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
```

### Vue-axios

> vue-axios是将axios集成到Vue.js的小包装器，可以像插件一样进行安装

```
npm install --save axios vue-axios
```

 main.js

```
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
```

使用

```
Vue.axios.get(api).then((response) => {
  console.log(response.data)
})

this.axios.get(api).then((response) => {
  console.log(response.data)
})

this.$http.get(api).then((response) => {
  console.log(response.data)
})
```

## ElementUI

> 一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库

https://element.eleme.io/#/

##  markdown样式

```
npm install github-markdown-css
import 'github-markdown-css/github-markdown.css'

```

 ![img](file:///C:\Users\A\AppData\Roaming\Tencent\Users\2803290705\QQ\WinTemp\RichOle\NAE]$Z07Z2J[7M7Q1VYEQ@D.png) 