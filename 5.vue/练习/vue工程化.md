# Vue 工程化开发

> 实际开发中 我们需要结合 webpack等工程化工具来实现高效的项目推进, 同时Vue 也推荐使用`单文件组件`组合实现整体Vue项目



## Babel

> Babel是一个通用型的JS编译器，通过Babel我们可以把最新标准编写的JS代码向下编译成兼容各种浏览器或Node的通用版本。

地址: https://www.babeljs.cn/



### Babel是什么

> Babel 是一个工具链，主要用于将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。下面列出的是 Babel 能为你做的事情：

- 语法转换
- 通过 Polyfill 方式在目标环境中添加缺失的特性 (通过 [@babel/polyfill](https://www.babeljs.cn/docs/babel-polyfill) 模块)
- 源码转换 (codemods)

### Babel安装

> Babel 一般通过npm yarn等工具安装 需要安装 core核心 preset-env预设  如果需要在webpack中使用 需要安装babel-loader

```
npm install @babel/core @babel/preset-env babel-loader -D
```

### Babel配置

>  需要在根目录创建 babel.config.json 文件 `@babel/preset-env`是一个智能预设，可让您使用最新的JavaScript，而无需微观管理目标环境所需的语法转换（以及可选的浏览器polyfill）。这都使您的生活更轻松，JavaScript包更小！

babel.config.json

```json
{
  "presets": [
    "@babel/preset-env" //使用预设环境
  ]
}
```

webpack.config.json

```
module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
```

+ 需要webpack和webpack-cli

## webpack配置Vue

> 我们可以选择webpack管理Vue项目 只需要简单几步就可以使用webpack来管理打包Vue项目

#### 安装

```
npm i webpack vue -S //生产环境需求 --save安装到 dependencies
npm i vue-loader css-loader vue-template-complier vue-style-loader -D //开发环境需求 --save-d 安装到devDependencies
```

注意: vue 和 vue-template-compiler 版本必须保持一致

#### 配置

webpack.config.js

```
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: './src/main.js', // 入口文件
  plugins: [
    new VueLoaderPlugin(), // 这里 vue 需要额外添加一个插件，将定义的 .js 、 .css 规则应用到 .vue 文件中
  ],
   module: {
    rules: [
      {
        test: /\.css$/, // 处理 css 文件，以及 .vue 文件中的 <style>
        use: [
          'vue-style-loader',
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.vue$/, // 处理 .vue 文件
        loader: 'vue-loader'
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  }
}
```

#### vue-loader

> https://vue-loader.vuejs.org/zh/

vue-loader 将解析文件，提取每个语言块，如有必要，**将它们通过其他加载器进行管道传输，最后将它们组装回ES 模块**，其默认导出为 Vue.js 组件选项对象。

- **Template**：每个`*.vue.` 文件一次最多可以包含一个`template`块；内容将被**提取并传递给 `vue-template-compiler` 并预编译为 JavaScript 渲染函数**，最后注入`script` 部分的导出组件中
- **Script：** 每个 `*.vue.` 文件一次最多可以包含一个 `` 块；**任何针对 `.js` 文件的 webpack rules 都将应用于 `` 块中的内容**
- **Style：** 默认匹配`/\.css$/`；可以包含多个 `style` 块；可以包含 `Scoped` 或者 `module` 属性；**任何针对 `.css` 文件的 webpack rules 都将应用于 `style` 块中的内容**
- **Custom Blocks：** 自定义块，以满足任何项目的特定需求

如果你希望将 `*.vue`. 组件拆分为多个文件，则可以使用 src 属性为语言块导入外部文件：

```html
<template src="./template.html"></template>
<style src="./style.css"></style>
<script src="./script.js"></script>
```

- 相对路径必须以 `./` 开头
- 可以从 npm 依赖项导入资源



## Vue 单文件组件

在很多 Vue 项目中，我们使用 `Vue.component` 来定义全局组件，紧接着用 `new Vue({ el: '#container '})` 在每个页面内指定一个容器元素。

这种方式在很多中小规模的项目中运作的很好，在这些项目里 JavaScript 只被用来加强特定的视图。但当在更复杂的项目中，或者你的前端完全由 JavaScript 驱动的时候，下面这些缺点将变得非常明显：

- **全局定义 (Global definitions)** 强制要求每个 component 中的命名不得重复
- **字符串模板 (String templates)** 缺乏语法高亮，在 HTML 有多行的时候，需要用到丑陋的 `\`
- **不支持 CSS (No CSS support)** 意味着当 HTML 和 JavaScript 组件化时，CSS 明显被遗漏
- **没有构建步骤 (No build step)** 限制只能使用 HTML 和 ES5 JavaScript，而不能使用预处理器，如 Pug (formerly Jade) 和 Babel

文件扩展名为 `.vue` 的 **single-file components (单文件组件)** 为以上所有问题提供了解决方法，并且还可以使用 webpack 或 Browserify 等构建工具。

这是一个文件名为 `Hello.vue` 的简单实例：

[![单文件组件的示例 (点击查看文本版的代码](assets/vue-component.png)](https://codesandbox.io/s/github/vuejs/vuejs.org/tree/master/src/v2/examples/vue-20-single-file-components)

###  render 

> Vue 推荐在绝大多数情况下使用模板来创建你的 HTML。然而在一些场景中，你真的需要 JavaScript 的完全编程的能力。这时你可以用**渲染函数**，它比模板更接近编译器。
>
> 让我们深入一个简单的例子，这个例子里 `render` 函数很实用。假设我们要生成一些带锚点的标题：

- **类型**：`(createElement: () => VNode) => VNode`

- **详细**：

  字符串模板的代替方案，允许你发挥 JavaScript 最大的编程能力。该渲染函数接收一个 `createElement` 方法作为第一个参数用来创建 `VNode`。

  如果组件是一个函数组件，渲染函数还会接收一个额外的 `context` 参数，为没有实例的函数组件提供上下文信息。

  Vue 选项中的 `render` 函数若存在，则 Vue 构造函数不会从 `template` 选项或通过 `el` 选项指定的挂载元素中提取出的 HTML 模板编译渲染函数。

Vue 推荐在绝大多数情况下使用模板来创建你的 HTML。然而在一些场景中，你真的需要 JavaScript 的完全编程的能力。这时你可以用**渲染函数**，它比模板更接近编译器。

让我们深入一个简单的例子，这个例子里 `render` 函数很实用。假设我们要生成一些带锚点的标题：

```
<h1>
  <a name="hello-world" href="#hello-world">
    Hello world!
  </a>
</h1>
```

对于上面的 HTML，你决定这样定义组件接口：

```
<anchored-heading :level="1">Hello world!</anchored-heading>
```

当开始写一个只能通过 `level` prop 动态生成标题 (heading) 的组件时，你可能很快想到这样实现：

```
<script type="text/x-template" id="anchored-heading-template">
  <h1 v-if="level === 1">
    <slot></slot>
  </h1>
  <h2 v-else-if="level === 2">
    <slot></slot>
  </h2>
  <h3 v-else-if="level === 3">
    <slot></slot>
  </h3>
  <h4 v-else-if="level === 4">
    <slot></slot>
  </h4>
  <h5 v-else-if="level === 5">
    <slot></slot>
  </h5>
  <h6 v-else-if="level === 6">
    <slot></slot>
  </h6>
</script>
Vue.component('anchored-heading', {
  template: '#anchored-heading-template',
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})
```

这里用模板并不是最好的选择：不但代码冗长，而且在每一个级别的标题中重复书写了 ``，在要插入锚点元素时还要再次重复。

虽然模板在大多数组件中都非常好用，但是显然在这里它就不合适了。那么，我们来尝试使用 `render` 函数重写上面的例子：

```
Vue.component('anchored-heading', {
  render: function (createElement) {
    return createElement(
      'h' + this.level,   // 标签名称
      this.$slots.default // 子节点数组
    )
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})
```

看起来简单多了！这样代码精简很多，但是需要非常熟悉 Vue 的实例 property。

#### Vue.compile( template )

- **参数**：

  - `{string} template`

- **用法**：

  将一个模板字符串编译成 render 函数。**只在完整版时可用**。

  ```
  var res = Vue.compile('<div><span>{{ msg }}</span></div>')
  
  new Vue({
    data: {
      msg: 'hello'
    },
    render: res.render,
    staticRenderFns: res.staticRenderFns
  })
  ```





## 单文件组件-sfc-规范Vue 单文件组件 (SFC) 规范

### 简介

`.vue` 文件是一个自定义的文件类型，用类 HTML 语法描述一个 Vue 组件。每个 `.vue` 文件包含三种类型的顶级语言块 `、`` 和 ``，还允许添加可选的自定义块：

```vue
<template>
  <div class="example">{{ msg }}</div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello world!'
    }
  }
}
</script>

<style>
.example {
  color: red;
}
</style>

<custom1>
  This could be e.g. documentation for the component.
</custom1>
```

`vue-loader` 会解析文件，提取每个语言块，如有必要会通过其它 loader 处理，最后将他们组装成一个 ES Module，它的默认导出是一个 Vue.js 组件选项的对象。

`vue-loader` 支持使用非默认语言，比如 CSS 预处理器，预编译的 HTML 模版语言，通过设置语言块的 `lang` 属性。例如，你可以像下面这样使用 Sass 语法编写样式：

```vue
<style lang="sass">
  /* write Sass! */
</style>
```

更多细节可以在[使用预处理器](https://vue-loader.vuejs.org/zh/guide/pre-processors.html)中找到。

### 语言块

#### 模板

- 每个 `.vue` 文件最多包含一个 ` 块。
- 内容将被提取并传递给 `vue-template-compiler` 为字符串，预处理为 JavaScript 渲染函数，并最终注入到从 `` 导出的组件中。

#### 脚本

- 每个 `.vue` 文件最多包含一个 `` 块。
- 这个脚本会作为一个 ES Module 来执行。
- 它的**默认导出**应该是一个 Vue.js 的[组件选项对象](https://cn.vuejs.org/v2/api/#选项-数据)。也可以导出由 `Vue.extend()` 创建的扩展对象，但是普通对象是更好的选择。
- 任何匹配 `.js` 文件 (或通过它的 `lang` 特性指定的扩展名) 的 webpack 规则都将会运用到这个 `` 块的内容中。

#### 样式

- 默认匹配：`/\.css$/`。
- 一个 `.vue` 文件可以包含多个 `` 标签。
- <style> 标签可以有 scoped 或者 module 属性 (查看 scoped CSS和 CSS Modules) 以帮助你将样式封装到当前组件。具有不同封装模式的多个 <style> 标签可以在同一个组件中混合使用。
- 任何匹配 `.css` 文件 (或通过它的 `lang` 特性指定的扩展名) 的 webpack 规则都将会运用到这个 `` 块的内容中。

#### 自定义块

可以在 `.vue` 文件中添加额外的自定义块来实现项目的特定需求，例如 `` 块。`vue-loader` 将会使用标签名来查找对应的 webpack loader 来应用在对应的块上。webpack loader 需要在 `vue-loader` 的选项 `loaders` 中指定。

更多细节，查看[自定义块](https://vue-loader.vuejs.org/zh/guide/custom-blocks.html)。

#### Src 导入

如果喜欢把 `.vue` 文件分隔到多个文件中，你可以通过 `src` 属性导入外部文件：

```vue
<template src="./template.html"></template>
<style src="./style.css"></style>
<script src="./script.js"></script>
```

需要注意的是 `src` 导入遵循和 webpack 模块请求相同的路径解析规则，这意味着：

- 相对路径需要以 `./` 开始
- 你可以从 NPM 依赖中导入资源：

```vue
<!-- import a file from the installed "todomvc-app-css" npm package -->
<style src="todomvc-app-css/index.css">
```

在自定义块上同样支持 `src` 导入，例如：

```vue
<unit-test src="./unit-test.js">
</unit-test>
```

### 语法高亮 / IDE 支持

目前有下列 IDE/编辑器 支持语法高亮：

- [Sublime Text](https://github.com/vuejs/vue-syntax-highlight)
- [VS Code](https://marketplace.visualstudio.com/items?itemName=octref.vetur)
- [Atom](https://atom.io/packages/language-vue)
- [Vim](https://github.com/posva/vim-vue)
- [Emacs](https://github.com/AdamNiederer/vue-mode)
- [Brackets](https://github.com/pandao/brackets-vue)
- [JetBrains IDEs](https://plugins.jetbrains.com/plugin/8057) (WebStorm、PhpStorm 等)

