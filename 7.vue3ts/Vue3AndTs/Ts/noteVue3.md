## Ts 初见

```
TypeScript是一种由微软开发的开源、跨平台的编程语言。它是JavaScript的超集，最终会被编译为JavaScript代码
```

## TypeScript 的特点

TypeScript 主要有 3 大特点：

- **始于JavaScript，归于JavaScript**

TypeScript 可以编译出纯净、 简洁的 JavaScript 代码，并且可以运行在任何浏览器上、Node.js 环境中和任何支持 ECMAScript 3（或更高版本）的JavaScript 引擎中。

- **强大的类型系统**

**类型系统**允许 JavaScript 开发者在开发 JavaScript 应用程序时使用高效的开发工具和常用操作比如静态检查和代码重构。

- **先进的 JavaScript**

TypeScript 提供最新的和不断发展的 JavaScript 特性，包括那些来自 2015 年的 ECMAScript 和未来的提案中的特性，比如异步功能和 Decorators，以帮助建立健壮的组件。

## 安装

```
npm install -g typescript
查看版本tsc -V 
```

## 手动.自动编译ts文件

```
手动编译: tsv 文件名
```

```

```

```
自动编译
1). 生成配置文件tsconfig.json
    tsc --init
2). 修改tsconfig.json配置
    "outDir": "./js", //输出到当前目录的js文件夹下
    "strict": false,    
3). 启动监视任务: 
    终端 -> 运行任务 -> 监视tsconfig.json
```

## 类型注解

```
在函数参数或者类等等中使用,用来限制参数类型. 违反的话 ts文件中会报错,但是js中依旧修改不会报错
```

```
function greeter (person: string) {
  return 'Hello, ' + person
}

let user = 'Yee'

console.log(greeter(user))
```

## 接口 类

```
interface Person {
  firstName: string
  lastName: string
}

class User {
  fullName: string
  firstName: string
  lastName: string

  constructor (firstName: string, lastName: string) {
    this.firstName = firstName
    this.lastName = lastName
    this.fullName = firstName + ' ' + lastName
  }
}
```

## webpack打包TS

```
1.开发环境安装
typescript
webpack webpack-cli
webpack-dev-server
html-webpack-plugin clean-webpack-plugin
ts-loader
cross-env
```

```
2.项目环境创建
tsc --init 设置自动编译配置文件
ts入口文件
webpack.config.js配置文件
打包index.html文件
```

```
3.配置打包语句
"dev": "cross-env NODE_ENV=development webpack-dev-server --config build/webpack.config.js",
"build": "cross-env NODE_ENV=production webpack --config build/webpack.config.js"
```

## 数据类型

```
1.boolean
2.string
3.number
let price2: number = 0b1101
let price3: number = 0o11
let price: number = 17
let price1: number = 0x11
4.数组
let a:数据类型[] = []
let b:Array<数据类型> = []
5.元组
let arr:[数据类型1,数据类型2...] = [x,x,...]
6.枚举
enum 类型名称 {
key1,
key2
}
类型名称[key1] 可以得到idx,值为0
如果值是数字,也可以通过数字获得key,类型名称["0"] = key1
7.联合类型
function a (params: string | number) {}  参数params类型的允许范围
类型断言两种写法
<数据类型>params
params as 数据类型
8.object
9.any
10.void
一般用于函数无返回值,void类型的变量值只有undefined或者null
11.undefined null
是所有数据类型子类型,可以被它们赋值.
```

```
推断:
当变量定义未赋值,则默认是any类型,变量定义时赋值,则自动推断.
```

