React

>  用于构建用户界面的 JavaScript 库, React是Facebook推出的一个JavaScript库，它的口号就是“用来创建用户界面的JavaScript库”，所以它只是和用户界面打交道，可以把它看成MVC中的V（视图）层。

官网地址: https://reactjs.org/

中文官网: https://zh-hans.reactjs.org/

GITHUB:  https://github.com/facebook/react

![img](assets/54.jpg)  



## React 是什么？

**React** 是一个用于构建用户界面的 JavaScript 库，用来为现代的网络构建用户界面。React起源于Facebook，由Facebook的软件工程师 Jordan Walke 开发，2012年部署于 Instagram，2013年开源。除此之外，React还有React Native框架，通过它让我们可以直接使用 JavaScript 来编写原生应用。 

React 是一个声明式，高效且灵活的用于构建用户界面的 JavaScript 库。使用 React 可以将一些简短、独立的代码片段组合成复杂的 UI 界面，这些代码片段被称作“组件”。

## React 特点

- 声明式
- 基于组件
- 虚拟DOM
- 跨平台与服务端渲染
- 快速、简单、易学



## React特性

### 声明式编程

> React 使创建交互式 UI 变得轻而易举。为你应用的每一个状态设计简洁的视图，当数据改变时 React 能有效地更新并正确地渲染组件。
>
> 相对于我们传统使用`jquery`或者原生JS进行DOM开发的**命令式**编程，React提供了更好的选择 : **声明式**编程 以声明式编写 UI，可以让你的代码更加可靠，且方便调试。

#### 命令式编程

```js
const element = document.querySelector('div')
element.className = 'wrap'
element.innerText = '我是div容器 我叫oWrap'
root.appendChild(element)
```

#### 声明式编程

```jsx
const element = <div className="wrap">我是div容器 我叫oWrap</div>
root.render(element)
```

我们可以通过`jsx`来快速实现使用`js`来创建和管理`view` , 省却麻烦的指令流程真正做到所想及所得

### 组件化

> React的一切基于组件。使用React，唯一要关心的就是构建组件。各个组件有各自的状态，状态变更时，会自动重新渲染组件。组件特性也是Web前端发展的趋势。

我们可以利用编程的思维方式来封装和管理我们的 `view` HTML ,  将页面划分成一个个功能独立、逻辑完整、高度可复用的`单元` ，这些`单元` 承担了表现性 交互性 逻辑性等功能，能够灵活，迅速，功能完整的部署到任意需求场景 。这些`单元` 就是 `组件`。 通过这种方式构建项目就是组件化实现。

![img](assets/1.jpg) 

![img](assets/2.jpg) 





### 虚拟DOM --- Virtual DOM

> React的设计中，开发者基本上无需操纵实际的DOM节点，每个React组件都是用Virtual DOM渲染的，可以看成是一种用JavaScript实现的内存DOM抽象。React在Virtual DOM上实现了一个Diff算法，渲染组件时，会高效的找出变更的节点，刷新到实际DOM上。



虚拟DOM就是一个JS对象，通过对象的方式来表示DOM结构，通过事务处理机制，将多次DOM修改的结果一次性更新到页面上，从而有效的减少页面渲染次数，减少修改DOM重绘重排的时间，提高渲染性能。 

![image](assets/3.jpg) 

![image](assets/4.png) 



### 跨平台/服务端渲染

> 我们通过React可以进行终端原始渲染逻辑的实现, 并且通过不同的转换器进行跨平台输出 , 能够通过学习react就可以实现跨平台开发

#### React DOM

![1661263007902](assets/1661263007902.png)



#### React Native

![](assets/phones.png)



#### React VR

![img](assets/7e187a63ad7c7d6bab7f1d8b0756ac13.jpg) 





## React 环境需求

```html
//React核心库 
<script src='https://unpkg.com/react@18.0.0/umd/react.development.js'></script>
//React DOM渲染库
  <script src='https://unpkg.com/react-dom@18.0.0/umd/react-dom.development.js'></script>
//babel 识别转义JSX语法
  <script src='https://unpkg.com/babel-standalone@6/babel.min.js'></script>
```



## 基础API

#### `React.createElement()`

- `React.createElement(type, [props], [...children])`
- 用来创建React元素
- React元素无法修改

```js
const button = React.createElement('button', {
  className: 'btn',
  onClick: () => {
    alert('我是button')
  }
}, '点我')
```



#### `ReactDOM.createRoot()`

- `createRoot(container[, options])`
- 用来创建React的根容器，容器用来放置React元素

```javascript
const root = ReactDOM.createRoot(document.querySelector('#root'))
```



#### `root.render()`

- `root.render(element)`
- 当首次调用时，容器节点里的所有 DOM 元素都会被替换，后续的调用则会使用 React 的 DOM 差分算法（DOM diffing algorithm）进行高效的更新。
- 不会修改容器节点（只会修改容器的子节点）。可以在不覆盖现有子节点的情况下，将组件插入已有的 DOM 节点中。

```javascript
root.render(button)
```



## JSX

> JSX是 JavaScript XML（HTML）的缩写，表示在 JS 代码中书写 HTML 结构

#### 注意

JSX 并不是标准的 JS 语法，是 JS 的语法扩展，浏览器默认是不识别的，需要在html中引入babel.js 或是在脚手架中内置的 `@babel/plugin-transform-react-jsx` 包，用来解析JSX语法

想要在`script`标签中使用 `jsx` 语法还需要 设置type属性为 `text/babel`

```HTML
<script src='https://unpkg.com/babel-standalone@6.26.0/babel.min.js'></script>
<script type='text/babel'>
//JSX语法
  
</script>
```



#### 优势

1. 采用类似于HTML的语法，降低学习成本，会HTML就会JSX
2. 充分利用JS自身的可编程能力创建HTML结构



#### 理解 

    * 全称: JavaScript XML     
    
    * react定义的一种类似于XML的JS扩展语法: XML+JS      
    
    * 作用: 用来创建react虚拟DOM(元素)对象  


​          





####  JSX语法规则 

1. 定义虚拟DOM时，不要写引号。      
2. 标签中混入JS表达式时要用 {}。     
3. **false, null, undefined, true** 是合法的子元素。但它们并不会被渲染 
4. if 语句/ switch-case 语句/ 变量声明语句，这些叫做语句，不是表达式，不能出现在 `{}` 中！！ 
5. 样式的类名指定不要用`class`要用`className`。      
6. 事件属性使用驼峰写法 `onClick` 
7. 内联样式，要用style={key:value}的形式去写。      
8. 只有一个根标签      
9. 标签必须闭合     
10. JSX支持多行（换行），如果需要换行，需使用`()` 包裹，防止bug出现
11. 标签首字母          
    1. 若小写字母开头，则将该标签转为html中同名元素，若html中无该标签对应的同名元素，则报错          
    2. 若大写字母开头，React就去渲染对应的组件，若组件没有定义，则报错。

 

###  JSX表达式

> JSX中可以使用表达式 使用 `{ }` 包裹 , `javascript`表达式都可以直接被解析, 于ES6模板字符串中 ${} 插值表达式基本一致, 可以尽情发挥

##### 基础变量

```jsx
const user = '海牙'
const element = <h1>你好, {user}</h1>
```

##### 运算符

```jsx
//数学运算
const element = <h1>4+3的结果是: {4+3}</h1>
//逻辑运算     
const num = 8
const element = <div>个位补0: {String(num)[1] && String(num) || '0' + num}</div>
//位运算
const element = <div>3.14 取整: {~~3.14}</div>  
//三目运算符 
const element = <div>3比4小是: {3 < 4 ? '正确' : '错误'} 的</div>   
```

##### 调用方法

```jsx
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'Harper',
  lastName: 'Perez'
}

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
)
```



### JSX列表

> 在React中渲染列表非常简单, 只需要通过数组方法 `map` 返回 需要渲染的数组列表

```jsx
const list = [1, 2, 3]
const element = <div>{list.map((item) => <span >id: {item} <br /></span>)}</div>      
```

### key

> key 帮助 React 识别哪些元素改变了，比如被添加或删除。因此你应当给数组中的每一个元素赋予一个确定的标识 

```jsx
 const numbers = [1, 2, 3, 4, 5];
 const listItems = (<ul> {numbers.map((number) =>
   <li key={number.toString()}>
      {number}
   </li>
 )}</ul>)
```

一个元素的 key 最好是这个元素在列表中拥有的一个独一无二的字符串。通常，我们使用数据中的 id 来作为元素的 key： 

```jsx
 const fruits = [{ id: 1, name: '苹果' },
                 { id: 2, name: '香蕉' },
                 { id: 3, name: '樱桃' }];
 const listItems = (<ul> {fruits.map((fruit, idx) =>
    <li key={fruit.id}>
      {fruit.name}
   	</li>
 )}</ul>)
```

当元素没有确定 id 的时候，万不得已你可以使用元素索引 index 作为 key, 如果列表项目的顺序可能会变化，我们不建议使用索引来用作 key 值，如果你选择不指定显式的 key 值，那么 React 将默认使用索引用作为列表项目的 key 值。 

### JSX条件渲染

> React 中的条件渲染和 JavaScript 中的一样，可以使用 三目运算符、短路运算符进行分支渲染

```jsx
 const isButton = true
 const listItems = <div> {isButton ? <button>按钮</button> : <span>文本</span>}</div>
```

```jsx
 const fruits = [];
 const listItems = (
   fruits.length && <ul>{fruits.map((fruit, idx) =>
      <li key={fruit.id}>
         {fruit.name}
      </li>
    )}</ul> || <span>无数据</span>
 )
```

### JSX属性/样式

> JSX中对于标签属性 与 行内样式 的处理

#### 状态生效属性

```jsx
 const checkBox = <input type="checkbox" checked={false} />
 const element = <div hidden={true}>不可见属性</div>
 const button = <button disabled={true}>不可选</button>
```

#### 行内样式

```jsx
 const element = <div style={{ color: 'red' }}>我是红色的</div>
       
 const style = {
      color: '#368',
      fontSize: '20px'
 }
 const element = <div style={style}>我是蓝色的 20px 那么大</div>
```

#### 类名

> 注意为了区别 ES6`class`关键字,   标签类名统一使用 `className`

```jsx
const isShow = true
const element = <div className={'wrap' + (isShow && ' show' || '')}>我的类名是 wrap</div>
      
//模板字符串法
      
const element = <div className={`wrap${isShow && ' show' || ''}`}>我的类名是 wrap</div>
      
//数组法
 const element = <div className={['wrap', isShow && 'show' || ''].join(' ').trim()}>我的类名是 wrap</div>      

```



## Create React App

>  Create React App 让你仅通过一行命令，即可构建现代化的 Web 应用。  CRA里帮助我们内置了 `Babel` `Webpack`  `ESlint` `Jest`  `WebServer` 等工程化工具链, 以及 `react` `react-dom` `redux`   `react-redux`  等核心库与生态库. 只需要通过一行命令就可以快速升成React项目 开箱即食

### 安装

> CRA脚手架可以全局安装 也可以 项目内安装以保证每个项目都可以创建独立版本项目工程

#### 全局安装

```shell
npm i create-react-app -g
```

#### 全局创建项目

安装之后可以使用 create-react-app命令创建项目

```shell
create-react-app <项目名称>
```

#### 推荐: `npx` 直接创建

```powershell
 npx create-react-app react-pro
```

1. 1. `npx create-react-app` 是固定命令，`create-react-app`是React脚手架的名称
   2. `react-pro`表示项目名称，可以自定义，保持语义化
   3. `npx` 命令会帮助我们临时安装create-react-app包，然后初始化项目完成之后会自自动删掉，所以不需要全局安装create-react-app

### 项目启动

```shell
npm run start
```



### 项目目录结构说明

运行命令以后，就会在运行命令所在目录下面创建一个以项目名称为名的目录

- 目录说明 

1. 1. `src` 目录是我们写代码进行项目开发的目录
   2. `package.json`  中俩个核心库：react 、react-dom

-  目录调整 

1. 1. 删除src目录下自带的所有文件，只保留app.js根组件和index.js
   2. 创建index.js文件作为项目的入口文件，在这个文件中书写react代码即可

-  入口文件说明 

```jsx
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
// 引入根组件App
import App from './App'
// 通过调用ReactDOM的render方法渲染App根组件到id为root的dom节点上
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
```



```
react-pro
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public //公共资源
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
└── src //开发文件
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js //入口文件
    ├── logo.svg
    ├── serviceWorker.js
    └── setupTests.js
```

### 命令脚本

create-react-app 同时也提供了其它一些命令来帮助我们进行开发

```js
npm start
//启动一个内置的本地 WebServer，根目录映射到 './public' 目录，默认端口：3000

npm run test
//运行 Jest 测试

npm run build
//打包应用（准备上线）
```

### 插件与配置

### 插件

JS JSX Snippets  [jsx代码提示与快捷生成]

Simple React Snippets [react代码提示快捷生成]

### 配置

```json
 "emmet.triggerExpansionOnTab": true,
  "emmet.showAbbreviationSuggestions": true,
  "emmet.includeLanguages": {
    // jsx的提示
    "javascript": "javascriptreact",
    "vue-html": "html",
    "vue": "html",
    "wxml": "html"
  },
```



## 组件

> 所谓组件，即封装起来的具有独立功能的UI部件。React推荐以组件的方式去重新思考UI构成，将UI上每一个功能相对独立的模块定义成组件，然后将小的组件通过组合或者嵌套的方式构成大的组件，最终完成整体UI的构建。 

在React中，你按照界面模块自然划分的方式来组织和编写你的代码，对于评论界面而言，整个UI是一个通过小组件构成的大组件，每个组件只关心自己部分的逻辑，彼此独立。 



### **React认为一个组件应该具有以下特征：**

1. 可组合（`Composeable`）：一个组件易于和其他组件一起使用，或者嵌套在另一个组件内部。如果一个组件内部创建了另一个组件，那么说父组件用于(own)他创建的子组件，通过这个特性，一个复杂的UI可以拆分成多个简单的UI组件；
2. 可重用(`Reusable`):每个组件都是具有独立功能的，它可以被使用在多个UI场景；
3. 可维护(`Maintainable`):每个小的组件仅仅包含自身的逻辑，更容易被理解和维护；



### 类组件

> 类组件 最基础的形态就是声明一个类 并且继承 `React.Compoent` 类 

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

注意: 

    1. 组件必须继承自 React.Component
    2. 组件必须有一个 render 方法
    3. render 方法的返回值，是该组件要输出的视图  


​           

### 函数式组件

> 定义组件最简单的方式就是编写 JavaScript 函数 

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

注意: 

1. 函数的名称就是组件的名称
2. 函数的返回值就是组件要输出的视图

### 组件约定

1. 组件的名称**必须首字母大写**，react内部会根据这个来判断是组件还是普通的HTML标签
2. 函数组件**必须有返回值**，表示该组件的 UI 结构；如果不需要渲染任何内容，则返回 null
3. 组件就像 HTML 标签一样可以被渲染到页面中。组件表示的是一段结构内容，对于函数组件来说，渲染的内容是函数的**返回值**就是对应的内容
4. 使用函数名称作为组件标签名称，可以成对出现也可以自闭合



## 组件事件

#### 函数组件事件绑定

##### 语法: 

> on + 事件名称 = { 事件处理程序 }  比如：`<div onClick={ onClick }></div>` 

*react事件采用驼峰命名法，比如：`onMouseEnter`、`onFocus`  

```jsx
// 函数组件
function Button () {
  // 定义事件回调函数
  const clickHandler = () => {
    console.log('事件被触发了')
  }
  return (
    // 绑定事件
    <button onClick={clickHandler}>click me!</button>
  )
}
```

#### 获取事件对象

> 事件回调函数通过形参e获取 事件对象event

```jsx
// 函数组件
function Button () {
  // 定义事件回调函数
  const clickHandler = (e) => {
    console.log('事件被触发了',e)
  }
  return (
    // 绑定事件
    <button onClick={clickHandler}>click me!</button>
  )
}
```

#### 传递额外参数

> 在循环中，通常我们会为事件处理函数传递额外的参数。例如，若 `id` 是你要删除那一行的 ID，以下两种方式都可以向事件处理函数传递参数： 

```jsx
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```

上述两种方式是等价的，分别通过`箭头函数`和 `Function.prototype.bind` 来实现。

在这两种情况下，React 的事件对象 `e` 会被作为第二个参数传递。如果通过箭头函数的方式，事件对象必须显式的进行传递，而通过 `bind` 的方式，事件对象以及更多的参数将会被隐式的进行传递。

#### 类组件事件绑定

> 区别于函数式组件 因为处于class 类环境下 所以定义事件回调函数 以及 绑定它写法上有不同

```jsx
class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // 为了在回调中使用 `this`，这个绑定是必不可少的
    this.clickHandler2 = this.clickHandler2.bind(this);
  }
  // class Fields
  clickHandler = () => {
    // 这里的this指向的是正确的当前的组件实例对象 
    // 可以非常方便的通过this关键词拿到组件实例身上的其他属性或者方法
    console.log(this)
  }

  clickHandler1 () {
    // 这里的this 不指向当前的组件实例对象  undefined 存在this丢失问题
    console.log(this)
  }
	clickHandler2(){
    //这里this在构造函数内进行了bind强制绑定给实例对象 
		console.log(this) 
  }

  render () {
    return (
      <div>
        <button onClick={this.clickHandler}>Class Fields保证this</button>
        <button onClick={this.clickHandler1}>this不指向实例</button>
				<button onClick={()=> this.clickHandler1()}>箭头包装保证this</button>
				<button onClick={this.clickHandler2}>bind保证this</button>
      </div>
    )
  }
}
```



#### 阻止默认行为

> 在 React 中另一个不同点是你不能通过返回 `false` 的方式阻止默认行为。你必须显式的使用 `preventDefault` 。例如，传统的 HTML 中阻止链接默认打开一个新页面

```jsx

function ActionLink() {
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.');
  }

  return (
    <a href="#" onClick={handleClick}>
      Click me
    </a>
  );
}
```



## 组件状态 state



![1666944482414](../../笔记/assets/1666944482414.png)

`state` 是组件的当前状态，可以把组件简单看成一个“状态机”，根据状态 `state` 呈现不同的 UI 展示。

一旦状态（数据）更改，组件就会自动调用 `render` 重新渲染 UI，这个更改的动作会通过 `this.setState` 方法来触发。

​        1. React 的组件，类似状态机，状态的值不一样，组件会呈现出不同的显示，当组件的状态有修改时，视图会重新渲染 

​    	2. 在React state 应该是不可变值，修改 state 的唯一方式就是调用组件的 `setState` 方法. 

###  初始化状态

-  通过class的实例属性state来初始化 
-  state的值是一个对象结构，表示一个组件可以有多个数据状态 

```jsx
class Counter extends React.Component {
  // 初始化状态
  state = {
    count: 0
  }
  render() {
    return <button>计数器</button>
  }
}
```

### 读取状态

-  通过this.state来获取状态 

```jsx
class Counter extends React.Component {
  // 初始化状态
  state = {
    count: 0
  }
  render() {
    // 读取状态
    return <button>计数器{this.state.count}</button>
  }
}
```

### 修改状态

-  语法
    `this.setState({ 要修改的部分数据 })` 
-  setState方法作用 

1. 1. 修改state中的数据状态
   2. 更新UI

-  思想
  	数据驱动视图，也就是只要修改数据状态，那么页面就会自动刷新，无需手动操作dom 
-  注意事项
  	**不要直接修改state中的值，必须通过setState方法进行修改** 

```jsx
class Counter extends React.Component {
  // 定义数据
  state = {
    count: 0
  }
  // 定义修改数据的方法
  setCount = () => {
    this.setState({
      count: this.state.count + 1
    })
  }
  // 使用数据 并绑定事件
  render () {
    return <button onClick={this.setCount}>{this.state.count}</button>
  }
}
```

#### React的状态不可变



**概念**：不要直接修改状态的值，而是基于当前状态创建新的状态值

**错误的直接修改**

```jsx
state = {
  count : 0,
  list: [1,2,3],
  person: {
     name:'海牙',
     age:18
  }
}
// 直接修改简单类型Number
this.state.count++
++this.state.count
this.state.count += 1
this.state.count = 1

// 直接修改数组
this.state.list.push(123)
this.state.list.spice(1,1)

// 直接修改对象
this.state.person.name = 'rose'
```

**基于当前状态创建新值**

```jsx
this.setState({
    count: this.state.count + 1
    list: [...this.state.list, 4],
    person: {
       ...this.state.person,
       // 覆盖原来的属性 就可以达到修改对象中属性的目的
       name: 'rose'
    }
})
```

#### State与Immutable

React官方建议把state当作不可变对象，一方面是如果直接修改this.state，组件并不会重新render；另一方面state中包含的所有状态都应该是不可变对象。当state中的某个状态发生变化，我们应该重新创建一个新状态，而不是直接修改原来的状态。那么，当状态发生变化时，如何创建新的状态呢？根据状态的类型，可以分成三种情况：

##### 1. 状态的类型是不可变类型（数字，字符串，布尔值，null， undefined）

这种情况最简单，因为状态是不可变类型，直接给要修改的状态赋一个新值即可。如要修改count（数字类型）、title（字符串类型）、success（布尔类型）三个状态：

```jsx
this.setState({
  count: 1,
  title: 'Redux',
  success: true
})

```

##### 2. 状态的类型是数组

如有一个数组类型的状态books，当向books中增加一本书时，使用数组的concat方法或ES6的数组扩展语法（spread syntax）：

```jsx
// 方法一：使用preState、concat创建新数组
this.setState(preState => ({
  books: preState.books.concat(['React Guide']);
}))

// 方法二：ES6 spread syntax
this.setState(preState => ({
  books: [...preState.books, 'React Guide'];
}))

```

当从books中截取部分元素作为新状态时，使用数组的slice方法：

```jsx
// 使用preState、slice创建新数组
this.setState(preState => ({
  books: preState.books.slice(1,3);
}))

```

当从books中过滤部分元素后，作为新状态时，使用数组的filter方法：

```jsx
// 使用preState、filter创建新数组
this.setState(preState => ({
  books: preState.books.filter(item => {
    return item != 'React'; 
  });
}))

```

注意不要使用push、pop、shift、unshift、splice等方法修改数组类型的状态，因为这些方法都是在原数组的基础上修改，而concat、slice、filter会返回一个新的数组。

##### 3. 状态的类型是简单对象(Plain Object)

如state中有一个状态owner，结构如下：

```jsx
this.state = {
  owner = {
    name: '海牙',
    age: 33
  }  
}

```

当修改state时，有如下两种方式：

**1） 使用ES6 的Object.assgin方法**

```jsx
this.setState(preState => ({
  owner: Object.assign({}, preState.owner, {name: 'Jason'});
}))

```

**2） 使用对象扩展语法（object spread properties）**

```jsx
this.setState(preState => ({
  owner: {...preState.owner, name: 'Jason'};
}))

```

总结一下，创建新的状态的关键是，避免使用会直接修改原对象的方法，而是使用可以返回一个新对象的方法。当然，也可以使用一些Immutable的JS库，如[Immutable.js](https://github.com/immutable-js/immutable-js)，实现类似的效果。

那么，为什么React推荐组件的状态是不可变对象呢？一方面是因为不可变对象方便管理和调试；另一方面是出于性能考虑，当组件状态都是不可变对象时，我们在组件的`shouldComponentUpdate`方法中，仅需要比较状态的引用就可以判断状态是否真的改变，从而避免不必要的`render`方法的调用。当我们使用React 提供的`PureComponent`时，更是要保证组件状态是不可变对象，否则在组件的`shouldComponentUpdate`方法中，状态比较就可能出现错误。



### setState()

> `setState()` 会对一个组件的 `state` 对象安排一次更新。当 state 改变了，该组件就会重新渲染。



`setState()` 将对组件 state 的更改排入队列，并通知 React 需要使用更新后的 state 重新渲染此组件及其子组件。这是用于更新用户界面以响应事件处理器和处理服务器数据的主要方式

将 `setState()` 视为*请求*而不是立即更新组件的命令。为了更好的感知性能，React 会延迟调用它，然后通过一次传递更新多个组件。在罕见的情况下，你需要强制 DOM 更新同步应用，你可以使用 [`flushSync`](https://zh-hans.reactjs.org/docs/react-dom.html#flushsync) 来包装它，但这可能会损害性能。

```js
setState(updater[, callback])
```

1. 通过setState的更新state是异步的
2. 出于性能考虑，React 可能会把多个 `setState()` 调用合并成一个调用。 
3. 当你调用 `setState()` 的时候，React 会把你提供的对象合并到当前的 state。 



`setState()` 并不总是立即更新组件。它会批量推迟更新。这使得在调用 `setState()` 后立即读取 `this.state` 成为了隐患。为了消除隐患，请使用 `componentDidUpdate` 或者 `setState` 的回调函数（`setState(updater, callback)`），这两种方式都可以保证在应用更新后触发。如需基于之前的 state 来设置当前的 state，请阅读下述关于参数 `updater` 的内容。 



#### 第一个参数为对象:

> 当 updater为一个对象的时候，则为即将合并的 state

```js
state = {
  count: 0
}
const handler = ()=> {
  this.setState({
    count: this.state.count + 1
  })
  this.setState({
    count: this.state.count + 1
  })
  this.setState({
    count: this.state.count + 1
  })
   console.log(this.state.count) //0 由于setState更新state是异步的 所以调用setState之后并不能同步看到state的变化
}

触发后渲染--- setState会做批处理合并 调用setState并不会直接更新 而是将状态的变化队列 在空闲时 合并为一次最终变化进行渲染
1  
```

#### 第一个参数为函数: 

> 如果 updater是一个函数，那么当前组件的 state 和 props 将作为参数，返回值用于 合并新的 state。 

```js
state = {
  count: 0
}
const handler = ()=> {
  this.setState((state,prop) => ({
    //state 为上一次变化后的state值
    count: state.count + 1
  }))
  this.setState((state,prop) => ({
    //state 为上一次变化后的state值
    count: state.count + 1
  }))
   console.log(this.state.count) //0 由于setState更新state是异步的 所以调用setState之后并不能同步看到state的变化
}

触发后渲染--- setState参数为函数 可以通过形参拿到上一次变化后的值进行修改操作
2
```

#### 第二个参数:

> 第二个参数为可选的回调函数，它将在 `setState` 完成合并并重新渲染组件后执行 

```js
state = {
  count: 0
}
const handler = ()=> {
  this.setState({
    count:this.state.count + 1
  },()=>{
     console.log(this.state.count) //1 异步更新完成后执行 可以获取最新的state状态
  })
}
```





## props

### props

`props` 就是组件的属性，由外部通过 JSX 属性传入设置，一旦初始设置完成，就可以认为 `this.props` 是不可更改的，所以**不要**轻易更改设置 `this.props` 里面的值（虽然对于一个 JS 对象你可以做任何事）。

- `props` 是调用方传递给组件的数据（类似于函数的形参），而 `state` 是在组件内被组件自己管理的数据（类似于在一个函数内声明的变量）。
- `props` 是不可修改的，所有 `React` 组件都必须像纯函数一样保护它们的 `props` 不被更改。 由于 `props` 是传入的，并且它们不能更改，因此我们可以将任何仅使用 `props` 的 `React` 组件视为 `pureComponent`，也就是说，在相同的输入下，它将始终呈现相同的输出。



**1.  props是只读对象（`readonly`）**

根据单项数据流的要求，子组件只能读取props中的数据，不能进行修改

**2. props可以传递任意数据**

数字、字符串、布尔值、数组、对象、`函数、JSX ` 组件

```jsx
//函数式组件
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="张三" />
      <Welcome name="李四" />
      <Welcome name="海牙" />
    </div>
  );
}


//class组件
class WelCome extends React.Component {
  constructor(props) {
    super(props)
  }
  render () {
    return <h1>Hello, {this.props.name}</h1>;
  }

}

class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render () {
    return (
      <div>
        <Welcome name="张三" />
      	<Welcome name="李四" />
      	<Welcome name="海牙" />
      </div>
    )
  }
}
```

#### Props 默认值为 “True”

>  如果你没给 prop 赋值，它的默认值是 `true`。以下两个 JSX 表达式是等价的：

```jsx
<MyTextBox autocomplete />

<MyTextBox autocomplete={true} />
```

通常，我们不建议不传递 value 给 prop，因为这可能与 [ES6 对象简写](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Object_initializer#New_notations_in_ECMAScript_2015)混淆，`{foo}` 是 `{foo: foo}` 的简写，而不是 `{foo: true}`。这样实现只是为了保持和 HTML 中标签属性的行为一致。

#### props 展开

> 如果你已经有了一个 props 对象，你可以使用展开运算符 `...` 来在 JSX 中传递整个 props 对象。以下两个组件是等价的：

```jsx
function App1() {
  return <Greeting firstName="Ben" lastName="Hector" />;
}

function App2() {
  const props = {firstName: 'Ben', lastName: 'Hector'};
  return <Greeting {...props} />;}
```



### Children Props

> 每个组件都可以获取到 `props.children`。它包含组件的开始标签和结束标签之间的内容。
>
> 表示该组件的子节点，只要组件内部有子节点，props中就有该属性 

**children可以是什么**

1. 普通文本
2. 普通标签元素
3. 函数 / 对象
4. JSX
5. 组件



```jsx
//组件调用传递
<Welcome> <span>Hello world!</span> </Welcome>

//组件
class Welcome extends Component {
  render(){
    return <div>props.children is {this.props.children}</div>
  }
}

//渲染为
<div> props.children is <span>Hello world!</span> </div>
```

```jsx
function Repeat (props) {
  return <main>{Array.from({ length: props.numTimes }).map((item, idx) => props.children(idx))}</main>;
}

function ListOfTenThings () {
  return (
    <Repeat numTimes={10}>
      {(index) => <div key={index}>This is item {index} in the list</div>}
    </Repeat>
  );
}
```

![1675599026293](assets/1675599026293.png)

### Render props

>  术语 [“render prop”](https://cdb.reacttraining.com/use-a-render-prop-50de598f11ce) 是指一种在 React 组件之间使用一个值为函数的 prop 共享代码的简单技术 

具有 render prop 的组件接受一个返回 React 元素的函数，并在组件内部通过调用此函数来实现自己的渲染逻辑。 

***render prop 是一个用于告知组件需要渲染什么内容的函数 prop。** 

```jsx
<DataProvider render={data => (
  <h1>Hello {data.target}</h1>
)}/>
```

```jsx
class Children extends Component {
  render () {
    return (
      <div className='container'>
        <h3> Children</h3>
        <p>{this.props.contentMsg}</p>
        <p>{this.props.msg}</p>
      </div>
    );
  }
}

class Parent extends Component {
  state = { msg: '来自Parent的问候' }
  render () {
    const { msg } = this.state
    return (
      <div className='container'>
        <h2> Parent</h2>
        {
          this.props.render(msg)
        }
      </div >
    );
  }
}


class RenderProps extends Component {
  state = {
    contentMsg: '来自RenderProps的问候'
  }
  render () {
    return (
      <div className='container'>
        <h1> PenderProps </h1>
        <Parent render={msg => (
          <Children contentMsg={this.state.contentMsg} msg={msg} />
        )}>
        </Parent >
      </div >
    );
  }
}

```

![1675593878047](assets/1675593878047.png)



render prop并不是react的API，而是一种与高阶组件（HOC）类似的设计模式，Parent组件中传递的prop也不一定要是render，也可以是其他标识，如child（或其他自己想要的标识）。 

```jsx
class Parent extends Component {
  state = { msg: '来自Parent的问候' }
  render () {
    const { msg } = this.state
    return (
      <div className='container'>
        <h2> Parent</h2>
        {
          this.props.child(msg)
        }
      </div >
    );
  }
}


class RenderProps extends Component {
  state = {
    contentMsg: '来自RenderProps的问候'
  }
  render () {
    return (
      <div className='container'>
        <h1> PenderProps </h1>
        <Parent child={msg => (
          <Children contentMsg={this.state.contentMsg} msg={msg} />
        )}>
        </Parent >
      </div >
    );
  }
}
```



### props 与 state 的区别

> [`props`](https://zh-hans.reactjs.org/docs/components-and-props.html)（“properties” 的缩写）和 [`state`](https://zh-hans.reactjs.org/docs/state-and-lifecycle.html) 都是普通的 JavaScript 对象。它们都是用来保存信息的，这些信息可以控制组件的渲染输出，而它们的一个重要的不同点就是：`props` 是传递*给*组件的（类似于函数的形参），而 `state` 是在组件*内*被组件自己管理的（类似于在一个函数内声明的变量）。 

state 的主要作用是用于组件保存、控制、修改*自己*的可变状态，在组件内部进行初始化，也可以在组件内部进行修改，但是组件外部不能修改组件的 state

props 的主要作用是让使用该组件的父组件可以传入参数来配置该组件，它是外部传进来的配置参数，组件内部无法控制也无法修改

state 和 props 都可以决定组件的外观和显示状态。通常，props 做为不变数据或者初始化数据传递给组件，可变状态使用 state	

### 父子通信

#### 父传子

1.  父组件提供要传递的数据  -  `state` 
2.  给子组件标签`添加属性`值为 state中的数据 
3.  子组件中通过 `props` 接收父组件中传过来的数据 

1. 1. 类组件使用this.props获取props对象
   2. 函数式组件直接通过参数获取props对象

![props-1.png](assets/1654490432739-ea283505-3ddd-4403-9fba-7735b04b451e.png) 

 

#### 子传父

1. 父组件提供一个回调函数 - 用于接收数据
2. 将函数作为属性的值，传给子组件
3. 子组件通过props调用 回调函数
4. 将子组件中的数据作为参数传递给回调函数

![props-4.png](assets/1654490502446-0596a169-847f-4446-91ce-a9a0237a9074.png)

#### 兄弟通信

1. 将共享状态提升到最近的公共父组件中，由公共父组件管理这个状态 

- - 提供共享状态
  - 提供操作共享状态的方法

1. 要接收数据状态的子组件通过 props 接收数据
2. 要传递数据状态的子组件通过props接收方法，调用方法传递数据

![props-5.png](assets/1654490527043-7acbe144-a306-40af-a878-3a7f4ba3a599.png) 

### props校验-场景和使用

 掌握组件props的校验写法，增加组件的健壮性

对于组件来说，props是由外部传入的，我们其实无法保证组件使用者传入了什么格式的数据，如果传入的数据格式不对，就有可能会导致组件内部错误，有一个点很关键 - **组件的使用者可能报错了也不知道为什么**，看下面的例子

![img](https://cdn.nlark.com/yuque/0/2022/png/274425/1654490657216-2a1d863f-3a6b-41fc-be38-7bc5fb781351.png)

面对这样的问题，如何解决？ **props校验**

**实现步骤**

1. 安装属性校验包：`npm i prop-types`
2. 导入`prop-types` 包
3. 使用 `组件名.propTypes = {}` 给组件添加校验规则

**核心代码**

```
import PropTypes from 'prop-types'

const List = props => {
  const arr = props.colors
  const lis = arr.map((item, index) => <li key={index}>{item.name}</li>)
  return <ul>{lis}</ul>
}

List.propTypes = {
  colors: PropTypes.array
}
```

### props校验-规则说明

**四种常见结构**

1. 常见类型：array、bool、func、number、object、string
2. React元素类型：element
3. 必填项：isRequired
4. 特定的结构对象：shape({})

**核心代码**

```
// 常见类型
optionalFunc: PropTypes.func,
// 必填 只需要在类型后面串联一个isRequired
requiredFunc: PropTypes.func.isRequired,
// 特定结构的对象
optionalObjectWithShape: PropTypes.shape({
	color: PropTypes.string,
	fontSize: PropTypes.number
})
```

官网文档更多阅读：<https://zh-hans.reactjs.org/docs/typechecking-with-proptypes.html>

### props校验-默认值

通过 `defaultProps` 可以给组件的props设置默认值，在未传入props的时候生效

#### 1. 函数组件

直接使用函数参数默认值

```jsx
function List({pageSize = 10}) {
  return (
    <div>
      此处展示props的默认值：{ pageSize }
    </div>
  )
}

// 不传入pageSize属性
<List />
```

#### 2. 类组件

使用类静态属性声明默认值，`static defaultProps = {}`

```jsx
class List extends Component {
  static defaultProps = {
    pageSize: 10
  }
  render() {
    return (
      <div>
        此处展示props的默认值：{this.props.pageSize}
      </div>
    )
  }
}
<List />
```



## Refs

> Refs 提供了一种方式，允许我们访问 DOM 节点或在 render 方法中创建的 React 元素。 **备注**：1. DOM节点就是JSX里的div，input等原生标签。 2. React元素就是 我们创建的React组件，比如class组件，函数组件。 

React推崇「状态决定视图」，页面怎么展示由数据状态控制。但是有些时候这样操作并不是很便捷，甚至不能实现理想功能。

React提供了Refs帮助开发者可以直接操作DOM节点，就像jquery时代一样，直接操作DOM，简单明了。**但是官方建议：勿过度使用 Refs。** 意思就是务必要不使用。



### 何时使用 Refs

下面是几个适合使用 refs 的情况：

- 管理焦点，文本选择或媒体播放。
- 触发强制动画。
- 集成第三方 DOM 库。

### 创建 Refs

Refs 是使用 `React.createRef()` 创建的，并通过 `ref` 属性附加到 React 元素。在构造组件时，通常将 Refs 分配给实例属性，以便可以在整个组件中引用它们。

```jsx
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();  }
  render() {
    return <div ref={this.myRef} />;  }
}
```

### 访问 Refs

当 ref 被传递给 `render` 中的元素时，对该节点的引用可以在 ref 的 `current` 属性中被访问。

```
const node = this.myRef.current;
```

ref 的值根据节点的类型而有所不同：

- 当 `ref` 属性用于 HTML 元素时，构造函数中使用 `React.createRef()` 创建的 `ref` 接收底层 DOM 元素作为其 `current` 属性。
- 当 `ref` 属性用于自定义 class 组件时，`ref` 对象接收组件的挂载实例作为其 `current` 属性。
- **你不能在函数组件上使用 ref 属性**，因为他们没有实例。

以下例子说明了这些差异。

#### 为 DOM 元素添加 ref

以下代码使用 `ref` 去存储 DOM 节点的引用：

```jsx
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // 创建一个 ref 来存储 textInput 的 DOM 元素
    this.textInput = React.createRef();    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    // 直接使用原生 API 使 text 输入框获得焦点
    // 注意：我们通过 "current" 来访问 DOM 节点
    this.textInput.current.focus();  }

  render() {
    // 告诉 React 我们想把 <input> ref 关联到
    // 构造器里创建的 `textInput` 上
    return (
      <div>
        <input
          type="text"
          ref={this.textInput} />        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
```

React 会在组件挂载时给 `current` 属性传入 DOM 元素，并在组件卸载时传入 `null` 值。`ref` 会在 `componentDidMount` 或 `componentDidUpdate` 生命周期钩子触发前更新。

#### 为 class 组件添加 Ref

如果我们想包装上面的 `CustomTextInput`，来模拟它挂载之后立即被点击的操作，我们可以使用 ref 来获取这个自定义的 input 组件并手动调用它的 `focusTextInput` 方法：

```jsx
class AutoFocusTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();  }

  componentDidMount() {
    this.textInput.current.focusTextInput();  }

  render() {
    return (
      <CustomTextInput ref={this.textInput} />    );
  }
}
```

请注意，这仅在 `CustomTextInput` 声明为 class 时才有效：

```
class CustomTextInput extends React.Component {  // ...
}
```

#### Refs 与函数组件

默认情况下，**你不能在函数组件上使用 ref 属性**，因为它们没有实例：

```jsx
function MyFunctionComponent() {  return <input />;
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();  }
  render() {
    // This will *not* work!
    return (
      <MyFunctionComponent ref={this.textInput} />    );
  }
}
```

如果要在函数组件中使用 `ref`，你可以使用 [`forwardRef`](https://react.docschina.org/docs/forwarding-refs.html)（可与 [`useImperativeHandle`](https://react.docschina.org/docs/hooks-reference.html#useimperativehandle) 结合使用），或者可以将该组件转化为 class 组件。

不管怎样，你可以**在函数组件内部使用 ref 属性**，只要它指向一个 DOM 元素或 class 组件：

```jsx
function CustomTextInput(props) {
  // 这里必须声明 textInput，这样 ref 才可以引用它  
  const textInput = useRef(null);
  function handleClick() {
    textInput.current.focus(); 
  }

  return (
    <div>
      <input
        type="text"
        ref={textInput} />      <input
        type="button"
        value="Focus the text input"
        onClick={handleClick}
      />
    </div>
  );
}
```



### 回调 Refs

React 也支持另一种设置 refs 的方式，称为“回调 refs”。它能助你更精细地控制何时 refs 被设置和解除。

不同于传递 `createRef()` 创建的 `ref` 属性，你会传递一个函数。这个函数中接受 React 组件实例或 HTML DOM 元素作为参数，以使它们能在其他地方被存储和访问。

下面的例子描述了一个通用的范例：使用 `ref` 回调函数，在实例的属性中存储对 DOM 节点的引用。

```jsx
class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);

    this.textInput = null;
    this.setTextInputRef = element => {      this.textInput = element;    };
    this.focusTextInput = () => {      // 使用原生 DOM API 使 text 输入框获得焦点      if (this.textInput) this.textInput.focus();    };  }

  componentDidMount() {
    // 组件挂载后，让文本框自动获得焦点
    this.focusTextInput();  }

  render() {
    // 使用 `ref` 的回调函数将 text 输入框 DOM 节点的引用存储到 React
    // 实例上（比如 this.textInput）
    return (
      <div>
        <input
          type="text"
          ref={this.setTextInputRef}        />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}        />
      </div>
    );
  }
}
```

React 将在组件挂载时，会调用 `ref` 回调函数并传入 DOM 元素，当卸载时调用它并传入 `null`。在 `componentDidMount` 或 `componentDidUpdate` 触发前，React 会保证 refs 一定是最新的。

你可以在组件间传递回调形式的 refs，就像你可以传递通过 `React.createRef()` 创建的对象 refs 一样。

```jsx
function CustomTextInput(props) {
  return (
    <div>
      <input ref={props.inputRef} />    </div>
  );
}

class Parent extends React.Component {
  render() {
    return (
      <CustomTextInput
        inputRef={el => this.inputElement = el}      />
    );
  }
}
```

在上面的例子中，`Parent` 把它的 refs 回调函数当作 `inputRef` props 传递给了 `CustomTextInput`，而且 `CustomTextInput` 把相同的函数作为特殊的 `ref` 属性传递给了 `<input>`。结果是，在 `Parent` 中的 `this.inputElement` 会被设置为与 `CustomTextInput` 中的 `input` 元素相对应的 DOM 节点。

### Refs 转发

Ref 转发是一项将 [ref](https://react.docschina.org/docs/refs-and-the-dom.html) 自动地通过组件传递到其一子组件的技巧。对于大多数应用中的组件来说，这通常不是必需的。但其对某些组件，尤其是可重用的组件库是很有用的。最常见的案例如下所述。

#### 转发 refs 到 DOM 组件

考虑这个渲染原生 DOM 元素 `button` 的 `FancyButton` 组件：

```jsx
function FancyButton(props) {
  return (
    <button className="FancyButton">
      {props.children}
    </button>
  );
}
```

React 组件隐藏其实现细节，包括其渲染结果。其他使用 `FancyButton` 的组件**通常不需要**获取内部的 DOM 元素 `button` 的 [ref](https://react.docschina.org/docs/refs-and-the-dom.html)。这很好，因为这防止组件过度依赖其他组件的 DOM 结构。

虽然这种封装对类似 `FeedStory` 或 `Comment` 这样的应用级组件是理想的，但其对 `FancyButton` 或 `MyTextInput` 这样的高可复用“叶”组件来说可能是不方便的。这些组件倾向于在整个应用中以一种类似常规 DOM `button` 和 `input` 的方式被使用，并且访问其 DOM 节点对管理焦点，选中或动画来说是不可避免的。

**Ref 转发是一个可选特性，其允许某些组件接收 ref，并将其向下传递（换句话说，“转发”它）给子组件。**

在下面的示例中，`FancyButton` 使用 `React.forwardRef` 来获取传递给它的 `ref`，然后转发到它渲染的 DOM `button`：

```jsx
const FancyButton = React.forwardRef((props, ref) => (  <button ref={ref} className="FancyButton">    {props.children}
  </button>
));

// 你可以直接获取 DOM button 的 ref：
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```

这样，使用 `FancyButton` 的组件可以获取底层 DOM 节点 `button` 的 ref ，并在必要时访问，就像其直接使用 DOM `button` 一样。

以下是对上述示例发生情况的逐步解释：

1. 我们通过调用 `React.createRef` 创建了一个 [React ref](https://react.docschina.org/docs/refs-and-the-dom.html) 并将其赋值给 `ref` 变量。
2. 我们通过指定 `ref` 为 JSX 属性，将其向下传递给 `<FancyButton ref={ref}>`。
3. React 传递 `ref` 给 `forwardRef` 内函数 `(props, ref) => ...`，作为其第二个参数。
4. 我们向下转发该 `ref` 参数到 `<button ref={ref}>`，将其指定为 JSX 属性。
5. 当 ref 挂载完成，`ref.current` 将指向 `<button>` DOM 节点。



### 关于回调 refs 的说明

如果 `ref` 回调函数是以内联函数的方式定义的，在更新过程中它会被执行两次，第一次传入参数 `null`，然后第二次会传入参数 DOM 元素。这是因为在每次渲染时会创建一个新的函数实例，所以 React 清空旧的 ref 并且设置新的。通过将 ref 的回调函数定义成 class 的绑定函数的方式可以避免上述问题，但是大多数情况下它是无关紧要的。

## 表单处理

### 受控组件

> 什么是受控组件？  `input框自己的状态被React组件状态控制`
>
> React组件的状态的地方是在state中，input表单元素也有自己的状态是在value中，React将state与表单元素的值（value）绑定到一起，由state的值来控制表单元素的值，从而保证单一数据源特性



```jsx
import React from 'react'

class InputComponent extends React.Component {
  // 声明组件状态
  state = {
    message: 'this is message',
  }
  // 声明事件回调函数
  changeHandler = (e) => {
    this.setState({ message: e.target.value })
  }
  render () {
    return (
      <div>
        {/* 绑定value 绑定事件*/}
        <input value={this.state.message} onChange={this.changeHandler} />
      </div>
    )
  }
}


function App () {
  return (
    <div className="App">
      <InputComponent />
    </div>
  )
}
export default App
```



#### 常用表单元素

![1675419129961](assets/1675419129961.png)



#### 处理多个输入

当需要处理多个 `input` 元素时，我们可以给每个元素添加 `name` 属性，并让处理函数根据 `event.target.name` 的值选择要执行的操作。

例如：

```jsx
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.name === 'isGoing' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value    });
  }

  render() {
    return (
      <form>
        <label>
          参与:
          <input
            name="isGoing"            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          来宾人数:
          <input
            name="numberOfGuests"            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}
```

#### 受控输入空值

在[受控组件](https://react.docschina.org/docs/forms.html#controlled-components)上指定 value 的 prop 会阻止用户更改输入。如果你指定了 `value`，但输入仍可编辑，则可能是你意外地将`value` 设置为 `undefined` 或 `null`。

下面的代码演示了这一点。（输入最初被锁定，但在短时间延迟后变为可编辑。）

```jsx
ReactDOM.render(<input value="hi" />, mountNode);

setTimeout(function() {
  ReactDOM.render(<input value={null} />, mountNode);
}, 1000);
```

### 非受控组件

> 什么是非受控组件？
>
> 非受控组件就是通过手动操作dom的方式获取文本框的值，文本框的状态不受react组件的state中的状态控制，直接通过原生dom获取输入框的值

```jsx
import React, { createRef } from 'react'

class InputComponent extends React.Component {
  // 使用createRef产生一个存放dom的对象容器
  msgRef = createRef()

  changeHandler = () => {
    console.log(this.msgRef.current.value)
  }

  render() {
    return (
      <div>
        {/* ref绑定 获取真实dom */}
        <input ref={this.msgRef} />
        <button onClick={this.changeHandler}>click</button>
      </div>
    )
  }
}

function App () {
  return (
    <div className="App">
      <InputComponent />
    </div>
  )
}
export default App
```

#### 文件 input 标签

在 HTML 中，`<input type="file">` 允许用户从存储设备中选择一个或多个文件，将其上传到服务器，或通过使用 JavaScript 的 [File API](https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications) 进行控制。 file 类型的 input 必然是一个非受控元素

```jsx
<input ref= type="file" />
```



 

### 应用场景

> 在大多数情况下，我们推荐使用 [受控组件](https://react.docschina.org/docs/forms.html#controlled-components) 来处理表单数据。在一个受控组件中，表单数据是由 React 组件来管理的。另一种替代方案是使用非受控组件，这时表单数据将交由 DOM 节点来处理。 

| 特征                                                         | 不受控制的 | 控制 |
| ------------------------------------------------------------ | ---------- | ---- |
| 一次性值检索（例如提交时）                                   | ✅          | ✅    |
| 提交时验证 | ✅          | ✅    |
| 即时现场验证 | ❌          | ✅    |
| 有条件地禁用“提交”按钮 | ❌          | ✅    |
| 强制输入格式                                                 | ❌          | ✅    |
| 一条数据的多个输入                                           | ❌          | ✅    |
| 动态输入        | ❌          | ✅    |

## 生命周期

> 组件的生命周期是指组件从被创建到挂载到页面中运行起来，再到组件不用时卸载的过程，注意，只有类组件才有生命周期
>
> 从出生到成长，最后到死亡，这个过程的时间可以理解为生命周期。React的生命周期同理也是这么一个过程。 

![1676202379708](assets/1676202379708.png)

![1676202294141](assets/1676202294141.png)

[生命周期图谱]: https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

### 两大阶段

#### 渲染阶段 Render

> **渲染** 阶段会确定需要进行哪些更改，比如 DOM。在此阶段，React 调用 `render`，然后将结果与上次渲染的结果进行比较 
>
> 纯净且不包含副作用。可能会被 React 暂停，中止或重新启动 

注: Render阶段为计算变化的阶段 计算状态的变化 汇总状态计算虚拟DOM的变化 确定最终应该生成什么样的UI Tree

##### 什么是副作用

> 从React组件中执行过**「数据获取」**、**「事件订阅」**或**「手动改变DOM」**。我们称这些操作为 "副作用"（或简称 "效果"），因为它们会影响其他组件，而且不能在渲染过程中进行。 

##### 为什么不要副作用

> 提交阶段通常会很快，但渲染过程可能很慢。因此，即将推出的 concurrent 模式 (默认情况下未启用) 将渲染工作分解为多个部分，对任务进行暂停和恢复操作以避免阻塞浏览器。这意味着 React 可以在提交之前多次调用渲染阶段生命周期的方法，或者在不提交的情况下调用它们（由于出现错误或更高优先级的任务使其中断）。 
>
> 为了解决这个问题就需要一套异步可中断的更新(Concurrent Render)来让耗时的计算让出js的执行权给高优先级的任务，在浏览器有空闲的时候再执行这些计算。所以我们需要一种数据结构来描述真实dom和更新的信息，在适当的时候可以在内存中中断reconcile的过程，这种数据结构就是Fiber。 

#### 提交阶段 Commit

> **提交** 阶段发生在当 React 应用变化时。（对于 React DOM 来说，会发生在 React 插入，更新及删除 DOM 节点的时候。）在此阶段，React 还会调用 `componentDidMount` 和 `componentDidUpdate` 之类的生命周期方法 

注: Commit阶段才是把Render阶段得到的最新的UI Tree更新到浏览器 进行DOM绘制



### 三个过程

> React 组件生命周期分为三个过程 分别为: 挂载时 更新时 卸载时

- 挂载期：一个组件实例初次北创建的过程。
- 更新期：组件在创建后再次渲染的过程。
- 卸载期：组件在使用完后被销毁的过程。

#### 挂载时

> 组件在首次创建后，进行第一次的渲染为挂载期。挂载期有的一些方法会被依次触发 

- constructor(构造函数，初始化状态值)
- static getDerivedStateFromProps (更新前检查props state 可通过return 修改state)
- render(渲染组件 生成)
- componentDidMount(render渲染之后执行的操作)

#### 更新时

> 当组件的 props 或 state 发生变化时会触发更新。组件更新的生命周期调用顺序如下： 



- static getDerivedStateFromProps()
- shouldComponentUpdate() (更新前可以根据props next决定是继续调用render或者终止render)
- render()
- getSnapshotBeforeUpdate() (在最近一次渲染输出（提交到 DOM 节点）之前调用  获取DOM快照信息)
- componentDidUpdate() (会在更新后会被立即调用。首次渲染不会执行此方法)

#### 卸载时

> 当组件从 DOM 中移除时会调用如下方法： 

- componentWillUnmount()

#### `constructor()`

> **如果不初始化 state 或不进行方法绑定，则不需要为 React 组件实现构造函数。**
>
> 在 React 组件挂载之前，会调用它的构造函数。在为 React.Component 子类实现构造函数时，应在其他语句之前调用 `super(props)`。否则，`this.props` 在构造函数中可能会出现未定义的 bug。
>
> 通常，在 React 中，构造函数仅用于以下两种情况：
>
> - 通过给 `this.state` 赋值对象来初始化[内部 state](https://zh-hans.reactjs.org/docs/state-and-lifecycle.html)。
> - 为[事件处理函数](https://zh-hans.reactjs.org/docs/handling-events.html)绑定实例
>
> 在 `constructor()` 函数中**不要调用 setState() 方法**。如果你的组件需要使用内部 state，请直接在构造函数中为 **this.state 赋值初始 state**：



注意: 如果调用constructor 必须使用props形参并且 调用 `super(props)` 继承  否则会报错;  也可以不调用constructor React会自动添加 并且附带 this.props

>  super关键字，它指代父类的实例（即父类的this对象）。子类必须在constructor方法中调用super方法，否则新建实例时会报错。这是因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工。如果不调用super方法，子类就得不到this对象。 

1. **如果需要访问this就设置constructor** 
2. **如果没用到constructor,是可以不写的；React会默认添加一个空的constructor。** 
3. **如果你用到了constructor就必须写super(),是用来初始化this的，可以绑定事件到this上;** 
4. **如果你在constructor中要使用this.props,就必须给super加参数：super(props)；** 
5. **无论有没有constructor，在render中this.props都是可以使用的，这是React自动附带的。** 

```js
constructor(props) {
  super(props);
  // 不要在这里调用 this.setState()
  this.state = { counter: 0 };
  this.handleClick = this.handleClick.bind(this);
}
```

#### `render()`

> `render()` 方法是 class 组件中唯一必须实现的方法。 

当 `render` 被调用时，它会检查 `this.props` 和 `this.state` 的变化并返回以下类型之一：

- **React 元素**。通常通过 JSX 创建。例如，`<div />` 会被 React 渲染为 DOM 节点，`<MyComponent />` 会被 React 渲染为自定义组件，无论是 `<div />` 还是 `<MyComponent />` 均为 React 元素。
- **数组或 fragments**。 使得 render 方法可以返回多个元素。欲了解更多详细信息，请参阅 [fragments](https://zh-hans.reactjs.org/docs/fragments.html) 文档。
- **Portals**。可以渲染子节点到不同的 DOM 子树中。欲了解更多详细信息，请参阅有关 [portals](https://zh-hans.reactjs.org/docs/portals.html) 的文档。
- **字符串或数值类型**。它们在 DOM 中会被渲染为文本节点。
- **布尔类型或 null**。什么都不渲染。（主要用于支持返回 `test && <Child />` 的模式，其中 test 为布尔类型。)

`render()` 函数应该为纯函数，这意味着在不修改组件 state 的情况下，每次调用时都返回相同的结果，并且它不会直接与浏览器交互。

如需与浏览器进行交互，请在 `componentDidMount()` 或其他生命周期方法中执行你的操作。保持 `render()` 为纯函数，可以使组件更容易思考。

在react中，触发render的有4条路径

（1）首次渲染Initial Render

（2）调用this.setState （并不是一次setState会触发一次render，React可能会合并操作，再一次性进行render）

（3）父组件发生更新（一般就是props发生改变，但是就算props没有改变或者父子组件之间没有数据交换也会触发render）

（4）调用this.forceUpdate


注意: 不要在render内 setState 这会导致死循环溢出



#### `componentDidMount()`

> `componentDidMount()` 会在组件挂载后（插入 DOM 树中）立即调用。依赖于 DOM 节点的初始化应该放在这里。如需通过网络请求获取数据，此处是实例化请求的好地方。
>
> 这个方法是比较适合添加订阅的地方。如果添加了订阅，请不要忘记在 `componentWillUnmount()` 里取消订阅
>
> 你可以在 `componentDidMount()` 里**直接调用 setState()**。它将触发额外渲染，但此渲染会发生在浏览器更新屏幕之前。如此保证了即使在 `render()` 两次调用的情况下，用户也不会看到中间状态。请谨慎使用该模式，因为它会导致性能问题。通常，你应该在 `constructor()` 中初始化 state。如果你的渲染依赖于 DOM 节点的大小或位置，比如实现 modals 和 tooltips 等情况下，你可以使用此方式处理

```js
componentDidMount()
```



#### `componentDidUpdate()`

> `componentDidUpdate()` 会在更新后会被立即调用。首次渲染不会执行此方法。
>
> 当组件更新后，可以在此处对 DOM 进行操作。如果你对更新前后的 props 进行了比较，也可以选择在此处进行网络请求。（例如，当 props 未发生变化时，则不会执行网络请求）。

```jsx
componentDidUpdate(prevProps, prevState, snapshot)
```

你也可以在 `componentDidUpdate()` 中**直接调用 setState()**，但请注意**它必须被包裹在一个条件语句里**，正如上述的例子那样进行处理，否则会导致死循环。它还会导致额外的重新渲染，虽然用户不可见，但会影响组件性能。 



如果组件实现了 `getSnapshotBeforeUpdate()` 生命周期（不常用），则它的返回值将作为 `componentDidUpdate()` 的第三个参数 “snapshot” 参数传递。否则此参数将为 undefined。 



#### `componentWillUnmount()`

> `componentWillUnmount()` 会在组件卸载及销毁之前直接调用。在此方法中执行必要的清理操作，例如，清除 timer，取消网络请求或清除在 `componentDidMount()` 中创建的订阅等。
>
> `componentWillUnmount()` 中**不应调用 setState()**，因为该组件将永远不会重新渲染。组件实例卸载后，将永远不会再挂载它。

```js
componentWillUnmount()
```



### 不常用生命周期

#### static getDerivedStateFromProps()

> `getDerivedStateFromProps` 会在调用 render 方法之前调用，并且在初始挂载及后续更新时都会被调用。它应返回一个对象来更新 state，如果返回 `null` 则不更新任何内容。

注意: 此方法为类自身的静态方法 内部无法获取组件this实例

- 如果你需要**执行副作用**（例如，数据提取或动画）以响应 props 中的更改，请改用 [`componentDidUpdate`](https://zh-hans.reactjs.org/docs/react-component.html#componentdidupdate)。
- 如果只想在 **prop 更改时重新计算某些数据**，[请使用 memoization helper 代替](https://zh-hans.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#what-about-memoization)。
- 如果你想**在 prop 更改时“重置”某些 state**，请考虑使组件[完全受控](https://zh-hans.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-controlled-component)或[使用 `key` 使组件完全不受控](https://zh-hans.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#recommendation-fully-uncontrolled-component-with-a-key) 代替。



#### shouldComponentUpdate()

> 根据 `shouldComponentUpdate()` 的返回值，判断 React 组件的输出是否受当前 state 或 props 更改的影响。默认行为是 state 每次发生变化组件都会重新渲染。大部分情况下，你应该遵循默认行为。 

```jsx
shouldComponentUpdate(nextProps, nextState)
```

当 props 或 state 发生变化时，`shouldComponentUpdate()` 会在渲染执行之前被调用。返回值默认为 true。首次渲染或使用 `forceUpdate()` 时不会调用该方法。

此方法仅作为**性能优化的方式**而存在。不要企图依靠此方法来“阻止”渲染，因为这可能会产生 bug。你应该**考虑使用内置的 PureComponent 组件**，而不是手动编写 `shouldComponentUpdate()`。`PureComponent` 会对 props 和 state 进行浅层比较，并减少了跳过必要更新的可能性。

如果你一定要手动编写此函数，可以将 `this.props` 与 `nextProps` 以及 `this.state` 与`nextState` 进行比较，并返回 `false` 以告知 React 可以跳过更新。请注意，返回 `false` 并不会阻止子组件在 state 更改时重新渲染。

我们不建议在 `shouldComponentUpdate()` 中进行深层比较或使用 `JSON.stringify()`。这样非常影响效率，且会损害性能。

目前，如果 `shouldComponentUpdate()` 返回 `false`， [`componentDidUpdate()`](https://zh-hans.reactjs.org/docs/react-component.html#componentdidupdate)。后续版本，React 可能会将 `shouldComponentUpdate` 视为提示而不是严格的指令，并且，当返回 `false` 时，仍可能导致组件重新渲染。 



#### getSnapshotBeforeUpdate()

> `getSnapshotBeforeUpdate()` 在最近一次渲染输出（提交到 DOM 节点）之前调用。它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）。此生命周期方法的任何返回值将作为参数传递给 `componentDidUpdate()`。
>
> 此用法并不常见，但它可能出现在 UI 处理中，如需要以特殊方式处理滚动位置的聊天线程等。





## 虚拟DOM (Virtual DOM )

> 　虚拟DOM（Virtual DOM）是在真实DOM树的基础上建立了一个抽象层，通过一个JavaScript对象表示真实DOM树结构，包括DOM树节点的标签名、属性、事件监听及子元素等。因此，虚拟DOM本质上是一个JS对象



![1676359174335](assets/1676359174335.png)



### createElement API创建虚拟DOM

```jsx
const button = React.createElement('button', {
  className: 'btn',
  onClick: () => {
    alert('我是button')
  }
}, '点我')
```

### JSX创建虚拟DOM

> JSX本质就是createElement API的模板语法糖 在CRA中由Babel最终转义为 createElement 的方式构建虚拟DOM

```jsx
const main = <div>
  <h1 onClick={() => { console.log(123) }} style={{ color: 'red', lineHeight: '80px' }}>react</h1>
  {123}
  {'张三'}
  {
    [
      <p className='te f12'>props <span>123</span></p>,
      <p>refs</p>,
      <p>states</p>,
    ]
  }

</div>
```

由Babel编译成create Element

```jsx
"use strict";

const main = /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
  onClick: () => {
    console.log(123);
  },
  style: {
    color: 'red',
    lineHeight: '80px'
  }
}, "react"), 123, '张三', [/*#__PURE__*/React.createElement("p", {
  className: "te f12"
}, "props ", /*#__PURE__*/React.createElement("span", null, "123")), /*#__PURE__*/React.createElement("p", null, "refs"), /*#__PURE__*/React.createElement("p", null, "states")]);
```

### 为什么要使用虚拟DOM

> React虚拟DOM在组件状态发生变化时，构造新的虚拟DOM树并依赖算法计算出与上一个虚拟DOM树的差异，只针对变化的部分执行原生DOM操作。相较于原生DOM每次数据发生改变就去创建一个真实DOM，经过比较去修改真实DOM的操作，React虚拟DOM将多次操作合并为一次操作，提高了渲染效率。为了计算出虚拟DOM差异，React Diff算法被提出。 

- 提供更好的性能

  ​	对比一下修改DOM时真实DOM操作和虚拟DOM的操作：
  		对于真实DOM：生成HTML字符串，重建所有DOM元素
  		对于虚拟DOM：生成虚拟DOM节点，采用diff算法，更新出现变化的真实DOM节点

  ​	可以看出，虚拟DOM虽然要进行更多的步骤，但它的性能消耗是极低的。

- 跨平台

  使用虚拟DOM可以很方便的进行跨平台操作
  





## 批处理

> 在React中 setState可能是异步的, React 可能会把多个 `setState()` 调用合并成一个调用 当调用 `setState()` 的时候，React 会把你提供的对象合并到当前的 state。 
>
> `setState()` 将对组件 state 的更改排入队列，并通知 React 需要使用更新后的 state 重新渲染此组件及其子组件。这是用于更新用户界面以响应事件处理器和处理服务器数据的主要方式 

![1676434293334](assets/1676434293334.png)

> 在React18之前  在原生事件 setTimeout  promise等异步处理中 setState为同步立刻更新  在react合成事件 生命周期中 setState为异步更新 我们称之为半自动批处理
> 在React18 使用 root API的情况下 setTimeout promise 原生事件中setState也会自动批处理, setState不再存在同步情况

| React 版本                                  | 是否进行全自动批处理 |
| ------------------------------------------- | -------------------- |
| React 18 使用 createRoot() 的方式           | 是                   |
| React 18 使用 旧的 ReactDOM.render() 的方式 | 否                   |
| React 18 以前的版本                         | 否                   |

## Diff

>  React diff算法是React框架中用于比较两个虚拟DOM树的算法。它的目的是尽可能有效地更新DOM，以便只更新发生变化的部分，而不是重新渲染整个组件。

 React Diff算法的步骤如下： 

1. 对比新旧虚拟DOM树，找出发生变化的节点。 

   ​	a. 如果新旧节点类型不同，则删除旧节点，添加新节点。 

   ​	b. 如果新旧节点类型相同，则比较属性，更新属性。 

2. 对比发生变化的节点，找出可以复用的节点。 

   ​	a. 如果新旧节点类型相同，则比较子节点，找出可以复用的节点。

   ​	b. 如果新旧节点类型不同，则不能复用节点。 

3. 将复用的节点移动到正确的位置。 

4. 删除旧的节点，添加新的节点。 



#### 什么是Diff算法

> Diff算法是React用来比较前后两次Virtual DOM差异的一种算法。当React需要更新UI时，它首先会生成新的Virtual DOM，然后使用Diff算法来比较新旧两个Virtual DOM的差异。React会找出两个Virtual DOM的最小不同点，并只更新这个最小不同点所涉及到的DOM节点，而不是更新整个DOM树。

### 基本原理

React的Diff算法是通过比较新旧两个虚拟DOM树来判断哪些部分需要进行更新的。在比较两个虚拟DOM树时，React会逐层比较它们的节点。

对于同一层的节点，React会根据它们的类型和属性来判断它们是否相同。如果节点类型不同，那么React会直接销毁旧节点并创建新节点;如果节点类型相同，但是属性不同，那么React会更新节点的属性。如果节点类型和属性都相同，那么React会继续比较它们的子节点。

对于子节点，React会使用一种称为“key”的属性来判断它们是否相同。如果两个子节点的key相同，那么React会认为它们是同一个节点，不需要进行更新。如果子节点的key不同，那么React会销毁旧节点并创建新节点。

在进行比较时，React会尽可能地复用旧节点来减少创建新节点的次数。如果节点类型相同，但是属性或子节点不同，那么React会将旧节点转换为新节点，而不是直接销毁旧节点并创建新节点。

### Diff算法的实现

React的Diff算法是基于两个假设的：

1. 两个不同类型的元素会产生出不同的树。
2. 开发者可以通过key prop来标注哪些子元素在不同的渲染中是稳定的。

![img](assets/d712a73769688afe1ef1a055391d99ed_720w.webp)  

### 三大策略

>  React的Diff算法是为了减少虚拟DOM的更新次数和提高性能而设计的。它包含三个策略：tree diff、component diff和element diff。 

1. Tree Diff

   Tree Diff是React中Diff算法的第一个策略。它的目的是比较新旧两棵虚拟DOM树的差异，从而找出需要更新的部分。具体流程如下：

   1）比较根节点。如果根节点的type不同，直接替换整个树；如果相同，进入第2步。

   2）比较子节点。React采用深度优先遍历算法，从根节点开始比较。如果子节点的type不同，直接替换子节点；如果相同，进入第3步。

   3）比较属性。如果两个节点的属性不同，需要更新该节点的属性；如果相同，进入第4步。

   4）比较子节点顺序。如果两个节点的子节点顺序不同，需要重新排列子节点。

2. Component Diff

   Component Diff是React中Diff算法的第二个策略。它的目的是比较组件的差异，从而找出需要更新的部分。具体流程如下：

   1）比较组件类型。如果新旧组件的type相同，进入第2步；如果不同，直接替换整个组件。

   2）比较组件属性。如果新旧组件的属性相同，进入第3步；如果不同，需要更新该组件的属性。

   3）比较子节点。如果新旧组件的子节点相同，不需要更新；如果不同，需要更新该组件的子节点。

   4）触发组件生命周期方法。如果需要更新，React会触发相应的生命周期方法，如componentWillUpdate和componentDidUpdate等。

   ![img](assets/52654992aba15fc90e2dac8b2387d0c4_720w.webp)  

3. Element Diff

   Element Diff是React中Diff算法的第三个策略。它的目的是比较同一层级的元素的差异，从而找出需要更新的部分。具体流程如下：

   当节点处于同一层级时，React diff 提供了三种节点操作，分别为：**INSERT_MARKUP**（插入）、**MOVE_EXISTING**（移动）和 **REMOVE_NODE**（删除）。

   - **INSERT_MARKUP**，新的 component 类型不在老集合里， 即是全新的节点，需要对新节点执行插入操作。
   - **MOVE_EXISTING**，在老集合有新 component 类型，且 element 是可更新的类型，generateComponentChildren 已调用 receive Component，这种情况下 prevChild=nextChild，就需要做移动操作，可以复用以前的 DOM 节点。
   - **REMOVE_NODE**，老 component 类型，在新集合里也有，但对应的 element 不同则不能直接复用和更新，需要执行删除操作，或者老 component 不在新集合里的，也需要执行删除操作。

![img](assets/7541670c089b84c59b84e9438e92a8e9_720w.webp) 



![img](assets/c0aa97d996de5e7f1069e97ca3accfeb_r.jpg) 





![img](assets/7b9beae0cf0a5bc8c2e82d00c43d1c90_r.jpg) 

总结：

React的Diff算法包含三个策略：tree diff、component diff和element diff。Tree Diff比较新旧两棵虚拟DOM树的差异，Component Diff比较组件的差异，Element Diff比较同一层级的元素的差异。三个策略分

React使用Diff算法来比较前后两个Virtual DOM的差异，该算法分为三个阶段：

1. 比较根节点：首先比较两个Virtual DOM根节点，如果它们的类型不同，则整个树需要被替换，如果它们的类型相同，则继续比较它们的属性和子元素。
2. 比较子元素：如果两个Virtual DOM的根节点类型相同，React会递归地比较它们的子元素。React会使用key prop来判断哪些子元素是稳定的，哪些子元素需要被移动、替换或删除。
3. 更新DOM：最后，React会根据差异更新DOM。React会尽可能地只更新需要更新的部分，而不会更新整个DOM树。

![1676466618467](assets/1676466618467.png) 

### 实现细节

React的Diff算法是在组件更新时自动执行的，因此开发者通常不需要手动实现Diff算法。但是，了解Diff算法的实现细节对于优化组件更新和调试应用程序非常有帮助。

React的Diff算法是通过递归比较新旧两个虚拟DOM树来实现的。在比较节点时，React会根据节点类型和属性来判断它们是否相同。如果节点相同，那么React会继续比较它们的子节点。如果节点不同，那么React会销毁旧节点并创建新节点。

在比较子节点时，React会使用key属性来判断它们是否相同。如果子节点的key相同，那么React会认为它们是同一个节点，不需要进行更新。如果子节点的key不同，那么React会销毁旧节点并创建新节点。

当React需要更新一个组件时，它会先生成新的虚拟DOM树，然后将新的虚拟DOM树和旧的虚拟DOM树进行比较。比较完成后，React会根据比较结果来更新组件



### 开发建议

React的Diff算法本身已经相当高效，但是在实际开发中，我们还可以采取一些优化措施来提高性能。以下是一些常见的优化措施：

高性能。以下是一些常见的优化措施

1. 减少不必要的更新

在React中，如果组件的状态或属性没有发生改变，那么该组件不需要重新渲染。因此，可以通过shouldComponentUpdate方法或者React.memo来避免不必要的更新。在shouldComponentUpdate方法中，可以通过比较前后两个状态或属性的值来决定是否需要重新渲染组件。而React.memo则可以用来封装函数组件，从而只有在其依赖项变化时才会重新渲染。

2. 利用Key提高Diff的效率

在进行Diff算法时，React会比较两个元素的type和key属性是否相同。如果相同，则认为是同一个元素，可以直接更新。因此，可以通过设置唯一的key来提高Diff的效率。如果没有设置key，则React会按照默认的方式进行Diff，可能会导致不必要的重渲染。

3. 批量更新

在React中，多次setState会触发多次更新，而React会对每次更新都进行一次Diff算法。如果需要多次更新同一个组件，可以通过将多个setState包装在一个函数中，或者使用React的批量更新API，如ReactDOM.unstable_batchedUpdates来实现批量更新。这样可以减少Diff算法的调用次数，从而提高性能。

4. 避免在render中进行复杂的计算

在render方法中进行复杂的计算会导致渲染性能下降。因此，可以将计算放在组件的生命周期方法中或者使用memoization等技术来避免重复计算。

5. 使用PureComponent或React.memo代替普通的组件

PureComponent和React.memo是React提供的两种优化组件性能的方法。PureComponent是一个类组件，继承自React.Component，但是它会自动实现shouldComponentUpdate方法，从而避免了不必要的重渲染。而React.memo则可以用来封装函数组件，从而只有在其依赖项变化时才会重新渲染。

### 总结：

React的Diff算法是React实现高效渲染的重要手段，同时也需要我们在实际开发中结合具体场景采取一些优化措施来提高性能。常见的优化措施包括减少不必要的更新、利用key提高Diff的效率、批量更新、避免在render中进行复杂的计算，以及使用PureComponent或React.memo代替普通的组件等。



## 函数式组件开发

> 在使用React时, 我们更推荐使用函数式组件开发, 在 React 中，函数式组件是一种纯函数，它只接收输入（props）并返回输出（JSX 元素） 

#### 函数式组件优势

1. 更简洁：函数式组件相对于类组件而言，代码量更少，结构更简单，更容易理解和维护。
2. 更高效：函数式组件没有实例化过程，不需要维护组件实例的生命周期，可以更快地渲染。
3. 更容易优化：由于函数式组件本身只依赖于 props 和 state，相对于类组件而言更容易优化性能。
4. 更容易测试：函数式组件的输入和输出都很明确，更容易进行单元测试。
5. 更容易理解：函数式编程(FP)是一种声明式编程方式，可以让代码更易于理解和推理，更容易发现潜在的错误和问题。

#### 函数式组件特点

- 只负责接受props和返回React元素。
- 没有实例或状态，没有生命周期方法，只是普通的JavaScript函数。
- 通常使用纯函数，没有副作用，每次输入相同的props时都会返回相同的输出。
- 与Class组件相比，函数式组件更加简洁和易于理解。
- 与Class组件相比, 渲染流畅简单, 无需实经过实例化繁复过程, 渲染效率高

#### 使用函数式组件注意事项

1. 函数式组件应该是无状态的：函数式组件没有实例或状态，因此应该在组件内部使用的任何变量都应该通过props传递进来。
2. 避免使用this关键字：在函数式组件中，this关键字没有定义。如果您需要使用this，可以考虑使用箭头函数。
3. 不要改变props：函数式组件应该是纯函数，也就是说，它们不应该改变它们的输入props。如果需要更改props，则需要使用状态管理或Redux等工具。
4. 避免在渲染期间进行副作用操作：因为函数式组件不支持生命周期方法，所以不应该在渲染期间进行副作用操作，如读取或更改DOM元素、进行网络请求等。如果需要进行此类操作，则可以考虑使用React的钩子，例如useEffect。
5. 避免使用函数式组件进行重复渲染：函数式组件应该尽可能避免在渲染期间进行重复渲染，因为这会影响性能。如果需要进行此类操作，则可以考虑使用Memoization等技术。
6. 使用PropTypes进行类型检查：虽然函数式组件没有实例，但它们仍然可以接受props参数。因此，建议使用PropTypes对输入props进行类型检查，以确保传递的数据类型正确。

## Hooks

> React Hooks 是 React 16.8 版本引入的新特性，它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。Hooks 将组件中相互关联的部分拆分成更小的函数，并且使你能够使用函数式编程的方式来复用状态逻辑。 

### 什么是React Hooks？

React Hooks 是 React 16.8.0 新增的一项特性，它使得我们可以在不编写 class 的情况下，使用 state 和其他 React 特性。Hooks 可以让我们在函数组件中使用 state，处理副作用和其他 React 功能，从而让函数组件更加强大和灵活。

在 React Hooks 之前，React 组件主要有两种形式：class 组件和函数组件。class 组件可以使用 state 和生命周期方法，而函数组件通常只能处理 props。但是，函数组件由于结构清晰、易于理解和使用，所以在 React 中越来越受欢迎。React Hooks 为函数组件提供了类似 class 组件的特性，因此它们在许多情况下可以替代 class 组件。

React Hooks 是一个 API 集合，其中包含一些可以帮助我们处理 state、副作用等的函数。其中一些最常用的 hooks 包括 useState、useEffect、useContext 等。

React Hooks 的好处是，它们可以使我们编写更简洁、可读性更好的代码，同时也可以提高代码的可测试性和可重用性。使用 hooks，我们可以将组件的逻辑和状态组织得更加清晰，使得我们的组件变得更加容易维护和扩展。

Hooks 的出现主要是为了解决以下几个问题：

    1. 组件之间复用状态逻辑的问题；
    2. 组件状态与生命周期函数的耦合问题；
    3. 组件复杂度增加的问题； 
    4. 组件可维护性和可测试性的问题。 

### 需要遵守的规则

#### 只在最顶层使用 Hook

**不要在循环，条件或嵌套函数中调用 Hook，** 确保总是在你的 React 函数的最顶层以及任何 return 之前调用他们。遵守这条规则，你就能确保 Hook 在每一次渲染中都按照同样的顺序被调用。这让 React 能够在多次的 `useState` 和 `useEffect` 调用之间保持 hook 状态的正确。

#### 只在 React 函数中调用 Hook

> 不要在React Class组件内使用Hook 也不要在普通JavaScript函数中调用Hook

**不要在普通的 JavaScript 函数中调用 Hook。**你可以：

- ✅ 在 React 的函数组件中调用 Hook
- ✅ 在自定义 Hook 中调用其他 Hook 

遵循此规则，确保组件的状态逻辑在代码中清晰可见。

### useState

useState是React Hooks的最基本部分之一。它允许你在函数组件中定义和更新状态。在下面的示例中，我们将使用useState来记录一个计数器，并在每次按钮点击时增加计数器的值。 

```jsx
import React, { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

在这个例子中，我们使用useState Hook来创建一个名为count的状态变量，并将它的初始值设为0。我们还使用setCount函数来更新这个变量，并在每次按钮点击时将它增加1。当我们调用setCount时，React会重新渲染组件，并使用新的count值更新页面上的内容。 

#### 应用技巧

##### 1. 将状态变量名称与状态值保持一致

在使用useState时，为状态变量选择一个有意义的名称非常重要。最好的做法是使用与状态值相关的名称，这将使代码更易于理解和维护。

例如，如果你在一个计数器组件中使用useState来管理计数器的值，你可以将状态变量命名为count，这样其他开发人员可以轻松地理解该状态变量的作用。

```jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={incrementCount}>Increment</button>
    </div>
  );
}
```

##### 2. 使用函数形式的setState来更新状态

在上面的示例中，我们使用setCount函数来更新count状态变量的值。useState的一种特殊形式是提供一个函数作为setState的参数，这个函数将接收当前状态的值作为参数，并返回一个新的状态值。这种方法通常被称为“函数形式的setState”。

使用函数形式的setState可以帮助你避免因为异步更新状态而导致的问题，因为它保证在更新状态时使用最新的状态值。此外，函数形式的setState还可以帮助你编写更干净的代码，因为它将状态更新逻辑分离到单独的函数中。

```jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(prevCount => prevCount + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={incrementCount}>Increment</button>
    </div>
  );
}
```

##### 3. 使用状态变量的默认值

useState允许你为状态变量提供一个默认值。这个默认值将在组件的初始渲染时使用，并在没有显式设置状态值时使用。

提供一个默认值可以帮助你避免在访问状态变量之前出现未定义的情况，并可以确保组件在渲染时具有预期的初始状态。

```jsx
import React, { useState } from 'react';

function Counter({ initialCount }) {
  const [count, setCount] = useState(initialCount);

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={incrementCount}>Increment</button>
    </div>
  );
}

Counter.defaultProps = {
  initialCount: 0
};
``
```

##### 4. 使用多个useState来管理多个状态变量

使用多个useState可以帮助你更好地组织组件的状态。将状态拆分为多个单独的变量可以使代码更易于理解，并使组件的状态管理更具可维护性。

```jsx
import React, { useState } from 'react';

function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    console.log(`Submitting ${firstName} ${lastName} (${email})...`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          type="text"
          value={firstName}
          onChange={event => setFirstName(event.target.value)}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          value={lastName}
          onChange={event => setLastName(event.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
```

##### 5. 避免在组件内部修改状态

在使用useState时，你应该尽量避免在组件内部修改状态变量。直接修改状态变量可能会导致意外的副作用，例如组件重新渲染的次数增加。

相反，你应该使用setState函数来更新状态变量的值。在这个函数中，React将处理状态更新，并根据需要触发组件的重新渲染。

##### 6. 使用useReducer代替复杂的状态管理

对于复杂的状态管理，你可能需要使用useReducer来代替useState。useReducer是useState的替代品，可以让你使用一个reducer函数来管理复杂的状态逻辑。

使用useReducer可以帮助你将状态逻辑分离到单独的函数中，并使状态管理更具可维护性。例如，你可以使用useReducer来管理购物车中商品的数量和总价。

```jsx
import React, { useReducer } from 'react';

function cartReducer (state, action) {

  switch (action.type) {
    case 'increment':
      return {
        ...state,
        itemCount: state.itemCount + 1,
        totalPrice: state.totalPrice + action.price
      };
    case 'decrement':
      if ((state.totalPrice - action.price) < 0 || (state.itemCount - 1) < 0) {
        return state
      }
      return {
        ...state,
        itemCount: state.itemCount - 1,
        totalPrice: state.totalPrice - action.price
      };
    default:
      return state;
  }
}

function ShoppingCart () {
  const [cart, dispatch] = useReducer(cartReducer, {
    itemCount: 0,
    totalPrice: 0
  });

  const addItem = price => {
    dispatch({ type: 'increment', price });
  };

  const removeItem = price => {
    dispatch({ type: 'decrement', price });
  };
  const Product = ({ name, price }) => (
    <div>
      <h3>{name}</h3>
      <p>${price.toFixed(2)}</p>
      <button onClick={() => addItem(price)}>添加到购物车</button>
      <button onClick={() => removeItem(price)}>从购物车删除</button>
    </div>
  );
  return (
    <div>
      <h2>购物车</h2>
      {cart.itemCount}
      {cart.itemCount === 0 && <p>购物车是空的</p>}
      {cart.itemCount > 0 && (
        <ul>
          <li>
            {cart.itemCount} 商品
          </li>
          <li>购物车总价: ${cart.totalPrice.toFixed(2)}</li>
        </ul>
      )}
      <Product name="香皂" price={9.99} />
      <Product name="牙刷" price={12.99} />
      <Product name="香水" price={19.99} />
    </div>
  );
}

export default ShoppingCart
```

---



### useEffect

React的`useEffect` hook是一个函数，它允许您在函数式组件中执行副作用。`useEffect`在组件挂载、更新和卸载时都会被调用，因此您可以使用它来管理组件的整个生命周期。

在使用`useEffect`时，您需要传递一个函数和一个可选的依赖项数组。该函数是`useEffect`的主体，它将在组件挂载、更新和卸载时执行。依赖项数组是一个可选参数，它告诉React什么情况下应该调用该函数。如果省略依赖项数组，`useEffect`将在每次组件更新时都被调用。

```jsx
javascriptCopy code
useEffect(() => {
  // 副作用代码
}, [依赖项数组]);
```

副作用函数可以返回一个清理函数，它将在组件卸载时调用。该清理函数用于取消副作用或清理该副作用产生的资源。如果您的副作用不需要清理，可以省略返回值。

```jsx

useEffect(() => {
  // 副作用代码

  return () => {
    // 清理代码
  };
}, [依赖项数组]);
```

#### 如何使用useEffect

以下是使用`useEffect`的示例。

```jsx

import React, { useState, useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

export default App;
```

在上面的示例中，我们使用了`useState` hook来管理一个状态变量`count`。我们还使用了`useEffect`来设置文档标题，该标题将在每次`count`更新时更新。



`useEffect`的第一个参数是一个函数，该函数在组件挂载、更新和卸载时都会被调用。在本例中，我们使用`useEffect`来更新文档标题。在组件挂载时，`useEffect`会将文档标题设置为`You clicked 0 times`。当`count`更新时，`useEffect`的依赖项数组中的`count`发生变化，它会重新运行副作用代码，将文档标题更新为`You clicked {count} times`。

#### 依赖数组

在上面的示例中，我们使用了 `count` 变量作为依赖项数组中的唯一项。这意味着当 `count` 发生变化时，`useEffect` 函数将被重新调用。

依赖数组的作用是在指定的变量发生更改时重新运行副作用函数。如果省略了依赖数组，则 `useEffect` 函数将在每次组件重新渲染时运行，这可能会导致性能问题。

依赖数组可以包含任何值，例如组件的状态、props 和回调函数等。如果需要在 `useEffect` 函数中使用多个变量，则可以将这些变量作为数组的多个项。



下面是一个使用多个依赖项的示例：

```jsx

import React, { useState, useEffect } from 'react';

function MyComponent(props) {
  const [count, setCount] = useState(0);
  const { id } = props;

  useEffect(() => {
    document.title = `Component ${id}: You clicked ${count} times`;
  }, [count, id]);

  return (
    <div>
      <p>Component {id}: You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

```

在这个例子中，我们使用了 `count` 和 `id` 作为依赖项数组的两个项。这意味着当 `count` 或 `id` 发生变化时，`useEffect` 函数都会被重新调用。

#### 清理函数

`useEffect` 函数可以返回一个清理函数，以便在组件卸载时执行清理操作。例如，如果您正在订阅事件，则可以在清理函数中取消订阅。

下面是一个示例，其中 `useEffect` 函数返回一个清理函数：

```jsx

import React, { useState, useEffect } from 'react';

function MyComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount(count + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <p>You clicked {count} times</p>
    </div>
  );
}

```

在这个例子中，`useEffect` 函数设置了一个间隔计时器，并返回一个清理函数来取消计时器。由于我们没有传递任何依赖项，因此 `useEffect` 函数只会在组件加载时运行一次，并且清理函数将在组件卸载时运行。

#### 注意事项

在使用 `useEffect` 时，有一些注意事项需要注意。

首先，副作用函数应该是幂等的。这意味着无论调用多少次，副作用函数都应该产生相同的结果。这是因为 `useEffect` 函数可能会在多个渲染周期中执行。

其次，如果您没有指定依赖项数组，则 `useEffect` 函数将在每次组件重新渲染时运行。这可能会导致性能问题。因此，最好总是指定依赖项数组，以便在必要时重新运行副作用函数。

最后，副作用函数可能会导致内存泄漏。如果您在副作用函数中订阅事件或添加计时器等，那么在组件卸载时，这些订阅和计时器可能会继续运行，从而导致内存泄漏。因此，总是确保在清理函数中取消这些订阅和计时器等。 

#### 网络请求

使用`useEffect`的另一个常见用途是发送网络请求。例如，您可以在组件挂载时发送网络请求，以获取初始数据并在组件中显示它。使用`useEffect`可以确保在组件卸载时清理请求，以避免产生未处理的网络请求。

```jsx

import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://api.example.com/todos')
      .then(response => response.json())
      .then(json => setData(json));
  }, []);

  return (
    <ul>
      {data.map(todo => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ul>
  );
}

export default App;
```

在上面的示例中，我们使用`useState` hook来管理一个状态变量`data`。我们还使用了`useEffect`来发送网络请求，并将响应数据存储在`data`中。在组件挂载时，`useEffect`会发送网络请求，并在响应到达时更新`data`状态。由于我们没有将任何依赖项传递给`useEffect`，因此它只会在组件挂载时运行一次。

> 在React中，`useEffect`是一个非常有用的hook，用于管理组件的副作用。使用`useEffect`，您可以在组件挂载、更新和卸载时执行副作用代码，并且可以使用依赖项数组来控制何时应该运行副作用代码。通过使用`useEffect`，您可以更好地管理组件的生命周期，并避免副作用带来的问题。 





### useContext

> React中的`useContext` hook提供了一种在组件层次结构中传递数据的简单方法，而不需要手动将props层层传递到每个组件。这篇文章将介绍`useContext`的用法和示例，帮助您更好地理解它的工作原理。 

#### 什么是useContext？

`useContext`是React提供的一个hook，用于从React组件中访问上下文。上下文是一种在组件树中共享数据的方法，让我们避免使用props将数据从父组件传递到子组件。使用`useContext`，我们可以在组件树中任何层次访问上下文数据，而不需要通过中间组件传递它们。

#### 使用useContext

使用`useContext`需要两个步骤：

1. 创建一个上下文对象
2. 在需要访问上下文数据的组件中使用`useContext`

##### 创建上下文对象

上下文对象是一个JavaScript对象，用于在组件树中共享数据。它有两个属性：

- `Provider`: 用于提供上下文数据的组件。
- `Consumer`: 用于访问上下文数据的组件。

在我们的示例中，我们将创建一个包含用户信息的上下文对象。用户信息将包括用户ID和用户名。

```jsx
import { createContext } from 'react';

export const UserContext = createContext({
  id: 0,
  name: ''
});

// Provider和Consumer可以使用以下语法导出
export const { Provider, Consumer } = UserContext;
```

在上面的代码中，我们使用`createContext`函数创建了一个名为`UserContext`的上下文对象。我们向`createContext`函数传递了一个默认值对象，该对象包含`id`和`name`属性的默认值。这些默认值在没有Provider提供的情况下使用。

我们还导出了Provider和Consumer。这是因为我们通常只需要`Provider`组件，而不需要使用`Consumer`组件。但是，有时候您可能需要使用`Consumer`组件，因此导出它们可以方便地在其他组件中使用。

##### 使用useContext

在需要访问上下文数据的组件中，我们使用`useContext` hook访问上下文数据。我们将使用上一步中创建的`UserContext`上下文对象示例。

```jsx
import React, { useContext } from 'react';
import { UserContext } from './UserContext';

function UserInfo() {
  const user = useContext(UserContext);

  return (
    <div>
      <p>User ID: {user.id}</p>
      <p>User Name: {user.name}</p>
    </div>
  );
}

export default UserInfo;
```

在上面的代码中，我们导入了`UserContext`上下文对象，并使用`useContext` hook访问了上下文数据。`useContext`函数接收上下文对象作为参数，并返回当前上下文值。

在`UserInfo`组件中，我们使用`useContext` hook获取`UserContext`的值，并将其分配给变量`user`。然后，我们使用`user`对象的属性在组件中呈现用户ID和用户名。

我们可以像这样将`UserInfo`组件放在组件树中的任何地方，并且只要在`UserInfo`的祖先组件中提供了一个`UserContext`提供者，我们就可以在`UserInfo`组件中使用`useContext` hook获取用户数据。

```jsx
import React from 'react';
import { Provider as UserProvider } from './UserContext';
import UserInfo from './UserInfo';

function App() {
  return (
    <UserProvider value={{ id: 123, name: 'John Doe' }}>
      <div>
        <h1>Welcome to my App</h1>
        <UserInfo />
      </div>
    </UserProvider>
  );
}

export default App;
```

在上面的代码中，我们创建了一个名为`App`的组件，并在其中提供了一个名为`UserProvider`的上下文提供者。我们将`UserInfo`组件作为`UserProvider`组件的后代，并在`UserProvider`组件上使用`value`属性将用户数据传递给它。

在`UserInfo`组件中，我们使用`useContext` hook访问`UserContext`上下文对象的值，而不是使用props从父组件传递用户数据。

##### 上下文默认值

当没有`Provider`提供上下文数据时，我们可以使用默认值。我们在创建上下文对象时为它提供了默认值。这使得我们可以在没有Provider的情况下使用上下文数据。 

```jsx
import React, { useContext } from 'react';
import { UserContext } from './UserContext';

function UserInfo() {
  const user = useContext(UserContext);

  return (
    <div>
      <p>User ID: {user.id}</p>
      <p>User Name: {user.name}</p>
    </div>
  );
}

UserInfo.defaultProps = {
  user: { id: 0, name: 'Anonymous' }
};

export default UserInfo;

```

在上面的代码中，我们将`UserInfo`组件的`defaultProps`属性设置为包含一个名为`user`的默认值对象。当我们没有提供`UserContext`的`Provider`时，我们将使用`defaultProps`中定义的默认值。 



>  `useContext` hook提供了一种简单的方法来在组件树中传递数据，而不需要手动将props从父组件传递到子组件。我们创建一个上下文对象，并使用`useContext` hook访问上下文数据。当没有Provider提供上下文数据时，我们可以使用默认值。通过使用`useContext`，我们可以更轻松地在组件树中共享数据。

### useRef

> `useRef` 是 React Hooks 中的一个 hook，它返回一个可变的 ref 对象，该对象可以在组件的整个生命周期内保留数据。`useRef` 主要用于在函数组件中保存对 DOM 元素或其他值的引用，以及在组件的多次渲染之间共享变量 

`useRef` 是 React Hooks 中的一个 hook，它返回一个可变的 ref 对象，该对象可以在组件的整个生命周期内保留数据。`useRef` 主要用于在函数组件中保存对 DOM 元素或其他值的引用，以及在组件的多次渲染之间共享变量 

#### 如何使用useRef

我们可以使用 `useRef` 来创建一个 ref 对象，并将它绑定到一个 DOM 元素上。然后，我们可以在组件中使用这个 ref 对象来引用该 DOM 元素。

```jsx
import { useRef } from 'react';

function TextInput() {
  const inputRef = useRef();

  function focusInput() {
    inputRef.current.focus();
  }

  return (
    <div>
      <input type="text" ref={inputRef} />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  );
}

```

在上面的代码中，我们创建了一个名为 `TextInput` 的组件，它包含一个文本输入框和一个按钮。我们使用 `useRef` hook 来创建一个名为 `inputRef` 的 ref 对象，并将它绑定到文本输入框上。在 `focusInput` 函数中，我们使用 `inputRef.current` 来引用文本输入框，并调用其 `focus` 方法。

另外，我们也可以在 `useRef` 中保存任何其他的数据，并且这些数据将在组件的多次渲染之间被保留下来。

```jsx
import { useRef, useEffect } from 'react';

function Counter() {
  const countRef = useRef(0);

  useEffect(() => {
    countRef.current = countRef.current + 1;
  });

  return (
    <div>
      <p>Count: {countRef.current}</p>
      <button onClick={() => console.log(countRef.current)}>Log Count</button>
    </div>
  );
}

```

在上面的代码中，我们创建了一个名为 `Counter` 的组件，它包含一个计数器和一个按钮。我们使用 `useRef` hook 来创建一个名为 `countRef` 的 ref 对象，并将其初始化为 0。在 `useEffect` hook 中，我们更新了 `countRef.current` 的值，每当组件重新渲染时，这个值就会自增。在 `render` 方法中，我们可以通过 `countRef.current` 来获取当前的计数器值，然后在控制台中输出它。

#### 注意事项

需要注意的是，使用 `useRef` 创建的 ref 对象不会引发组件的重新渲染。如果要引发重新渲染，可以使用 `useState` 或 `useReducer`。

另外，`useRef` 返回的 ref 对象不会自动进行深比较。如果要比较两个对象，需要手动进行比较。在一些情况下，可能需要使用 `useEffect` 来触发数据的更新。

> `useRef` 是一个非常有用的 hook，它可以用于保存 DOM 元素的引用，以及在组件的多次渲染之间共享变量

---



### useReducer

> useReducer是React的一个hook，它用于管理复杂的状态和数据流，并将组件的状态逻辑与组件的UI分离开来。它的使用方法和redux有一些类似，但比redux更加简洁和轻量化。在这篇教程中，我们将深入学习useReducer的用法和原理，并提供一些示例。 

#### 什么是useReducer？

在React中，通常使用useState hook来管理组件的状态。但是，当状态变得非常复杂时，useState可能会变得难以管理，这时就需要使用useReducer。useReducer是一个能够管理组件状态的hook，它接受两个参数：reducer函数和初始状态。reducer函数负责管理状态变化，初始状态则是组件的初始状态。

useReducer的工作原理非常简单，它将reducer函数和当前状态值传递给dispatch函数，当dispatch函数被调用时，reducer函数会根据操作类型更新状态，最终返回一个新的状态值。这样，我们就可以使用dispatch函数来更新组件的状态。

#### 如何使用useReducer？

使用useReducer非常简单，首先定义一个reducer函数和初始状态值，然后将它们传递给useReducer函数。例如：

```jsx
import React, { useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
    default:
      throw new Error();
  }
}

function Counter() {
  const [count, dispatch] = useReducer(reducer, 0);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
    </div>
  );
}

export default Counter;
```

在上面的例子中，reducer函数负责管理状态变化。在Counter组件中，我们使用useReducer hook来管理计数器的状态，并将初始状态设置为0。dispatch函数用于更新状态，当用户点击“Increment”按钮时，我们将一个action对象传递给dispatch函数，其中包含操作类型“increment”。这样，reducer函数将根据操作类型更新状态，并将新状态值返回给组件。同样，当用户点击“Decrement”按钮时，我们将一个action对象传递给dispatch函数，其中包含操作类型“decrement”，然后reducer函数将更新状态并返回新的状态值。

#### useReducer的优点

与useState相比，useReducer具有以下优点：

1. 处理复杂状态：当需要处理非常复杂的状态逻辑时，useReducer能够更好地管理状态，并使代码更加清晰。
2. 组件逻辑与UI分离：通过将状态逻辑放在reducer函数中，我们可以将组件逻辑与UI分离开来，这使得代码更加易于维护。
3. 可以使用中间件：与redux相似，useReducer可以使用中间件，以便处理异步操作、日志记录等操作。
4. 更轻量级：useReducer比redux更轻量级，没有太多的抽象概念和代码。

#### useReducer的缺点

尽管useReducer有很多优点，但也有一些缺点：

1. 相对较复杂：相对于useState，useReducer可能需要更多的代码和更深入的理解。
2. 可能会过度使用：在某些情况下，useReducer可能会被过度使用，导致代码更加复杂。

#### useReducer示例

下面是一个使用useReducer来管理todo列表的示例：

```jsx
import React, { useReducer } from 'react';

function reducer(todos, action) {
  switch (action.type) {
    case 'add':
      return [...todos, { text: action.text, completed: false }];
    case 'toggle':
      return todos.map((todo, index) =>
        index === action.index ? { ...todo, completed: !todo.completed } : todo
      );
    default:
      return todos;
  }
}

function TodoList() {
  const [todos, dispatch] = useReducer(reducer, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: 'add', text: e.target.elements.todo.value });
    e.target.elements.todo.value = '';
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="todo" />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {todos.map((todo, index) => (
          <li
            key={index}
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
            onClick={() => dispatch({ type: 'toggle', index })}
          >
            {todo.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
```

在上面的例子中，reducer函数负责管理`todo`列表的状态。在`TodoList`组件中，我们使用useReducer hook来管理`todo`列表的状态，并将初始状态设置为空数组。dispatch函数用于更新状态，当用户提交一个新的`todo`时，我们将一个`action`对象传递给dispatch函数，其中包含操作类型“add”和`todo`文本。这样，`reducer`函数将根据操作类型添加新的`todo`到列表中，并将新的状态值返回给组件。当用户点击一个`todo`时，我们将一个`action`对象传递给`dispatch`函数，其中包含操作类型“toggle”和`todo`的索引。这样，reducer函数将根据操作类型更新`todo`的`completed`状态，并将新的状态值返回给组件。



> 在React中，useReducer是一个非常有用的hook，用于管理复杂的状态和数据流。它可以帮助我们更好地组织代码，使代码更加清晰和易于维护。尽管它相对于useState更加复杂，但它可以处理非常复杂的状态逻辑，并且可以使用中间件处理异步操作和日志记录等操作。在使用useReducer 



----



### useCallback

#### 什么是useCallback hook？

`useCallback`是一个React Hook，它用于在函数组件中记忆回调函数，以减少组件重新渲染的次数。

在React中，每当组件状态或属性发生变化时，组件会重新渲染。如果一个组件中有很多回调函数，而这些回调函数并不依赖于组件的状态或属性，那么在每次重新渲染时，这些回调函数都会被重新创建，导致不必要的性能开销。使用`useCallback` hook可以解决这个问题，它会记忆回调函数并返回一个稳定的函数引用，从而减少组件的重新渲染次数。

#### 如何使用useCallback hook？

`useCallback` hook的使用非常简单，它只需要两个参数：

1. 回调函数
2. 依赖项数组

```jsx
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```

其中，第一个参数是要记忆的回调函数，第二个参数是依赖项数组，依赖项数组中的每个元素都会被用来检查是否需要重新创建回调函数。

如果依赖项数组为空，则回调函数只会在组件首次渲染时被创建，并在整个组件生命周期内保持不变。如果依赖项数组不为空，则回调函数会在每次依赖项发生变化时被重新创建。

例如，下面是一个简单的例子，其中使用了`useCallback` hook：

```jsx
import React, { useState, useCallback } from 'react';

function App() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}

```

在上面的例子中，当用户点击“Increment”按钮时，`handleClick`回调函数会被调用，并将计数器增加1。由于我们使用了`useCallback` hook，并将`count`作为依赖项，所以当计数器发生变化时，`handleClick`回调函数会被重新创建。否则，它将保持不变。

#### useCallback的优点和缺点

使用`useCallback` hook的主要优点是减少了组件的重新渲染次数，从而提高了性能。它还可以防止回调函数被无限制地创建，从而减少了内存消耗。

然而，使用`useCallback` hook也有一些缺点。如果依赖项数组太长或不正确，会导致回调函数的性能问题。此外，如果回调函数中使用了其他hook，如useState或useEffect，那么使用`useCallback` hook可能会导致一些意外的问题，如使用不当可能会导致内存泄漏。

此外，还有一些需要注意的事项：

1. 在依赖项数组中只包含简单的数据类型，如数字、字符串或布尔值，避免将复杂的数据类型，如对象或数组，包含在依赖项数组中。如果包含复杂数据类型，则在每次重新渲染时都需要对其进行深层比较，从而降低性能。
2. 避免在依赖项数组中使用函数作为依赖项。每次重新渲染时，函数都会被重新创建，这可能导致回调函数被重新创建的频率过高。
3. 当使用`useCallback` hook时，应该优先考虑使用`useMemo` hook，因为它可以用于记忆任何类型的值，而不仅仅是回调函数。此外，`useMemo` hook还可以提高组件的性能，因为它可以记忆复杂的计算结果，并减少重新计算的次数。



>  `useCallback`是一个非常有用的React Hook，它可以帮助我们减少组件的重新渲染次数，并提高组件的性能。它适用于任何需要记忆回调函数的场景，特别是当组件中包含许多回调函数时。使用`useCallback` hook需要注意的事项有很多，需要根据具体的使用情况进行选择。 



---







### useMemo

> `useMemo`是React Hook中的一种，它可以用于记忆函数的计算结果，以减少组件的重新渲染次数。在本篇文章中，我们将深入探讨`useMemo` hook，并学习如何使用它来提高React组件的性能。 

#### 什么是 useMemo？

`useMemo`是React Hook中的一种，它用于记忆函数的计算结果。当一个函数的计算结果可能会被重复使用，而这个计算过程比较耗时时，可以使用`useMemo`来缓存函数的计算结果，避免在每次重新渲染时都进行重复计算。使用`useMemo`可以提高组件的性能，特别是在渲染大型数据集或计算复杂数据时。

`useMemo`函数的基本语法如下：

```jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

其中，第一个参数是一个回调函数，用于计算一个昂贵的值。第二个参数是一个依赖项数组，用于指定在这个回调函数中使用的变量。如果任何一个变量发生变化，那么这个回调函数将被重新计算。

`useMemo`的工作原理类似于缓存，它会根据依赖项数组中的值来判断是否需要重新计算。如果依赖项数组中的值没有发生变化，那么`useMemo`将返回上一次计算的结果，否则将重新计算。

#### 如何使用 useMemo？

`useMemo`可以用于任何需要记忆计算结果的场景，例如：

- 计算函数结果并将其传递给子组件。
- 在列表或表格中渲染大量数据时，计算每个元素的样式或其他属性。
- 计算复杂的数学公式或数据转换。

下面是一个简单的例子，说明如何使用`useMemo`来缓存计算结果：

```jsx
import React, { useMemo, useState } from 'react';

function MyComponent({ a, b }) {
  const [count, setCount] = useState(0);
  const expensiveValue = useMemo(() => {
    console.log('Computing expensiveValue');
    return a + b;
  }, [a, b]);

  return (
    <div>
      <p>{`a = ${a}, b = ${b}, count = ${count}`}</p>
      <p>{`expensiveValue = ${expensiveValue}`}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

在这个例子中，我们使用`useMemo`来缓存计算结果，避免在每次重新渲染时都进行重复计算。如果`a`、`b`或发生变化，`expensiveValue`将重新计算。在这个例子中，我们还使用了`useState` hook来管理一个计数器，用于模拟数据的变化。每次单击“Increment”按钮时，由于我们使用了`useMemo`来缓存计算结果，即使`count`的值发生变化，也不会触发`expensiveValue`的重新计算, 以此来提升性能

#### 注意事项

使用`useMemo`时需要注意以下几点：

1. 不要过度使用`useMemo`。如果计算过程比较简单，或者计算结果只在组件渲染时使用一次，那么使用`useMemo`可能会降低性能。
2. 不要尝试在`useMemo`中修改状态或执行任何有副作用的操作。`useMemo`应该只用于记忆计算结果，而不应该用于更改组件状态或执行其他操作。
3. 使用`useMemo`时要小心依赖项数组的设置。如果依赖项数组不正确地设置，可能会导致`useMemo`无法正确地缓存计算结果，从而降低性能。一般来说，依赖项数组中应该包含所有计算结果所依赖的变量。
4. 如果你需要缓存一个函数，而不是一个值，可以使用`useCallback` hook，它与`useMemo`类似，但是用于记忆函数而不是值。



>  在本文中，我们学习了如何使用`useMemo` hook来记忆函数的计算结果。我们讨论了`useMemo`的工作原理、如何在React组件中使用它以及使用`useMemo`时需要注意的一些事项。使用`useMemo`可以显著提高组件的性能，特别是在渲染大型数据集或计算复杂数据时。在开发React应用程序时，请务必考虑使用`useMemo`来优化性能。



---



### forwarRef

> `forwardRef` 是 React 中一个非常有用的函数，它可以让我们在函数式组件中使用 ref，并将 ref 传递给子组件。在本文中，我们将深入探讨 `forwardRef` 的用法和内部原理。 

#### `forwardRef` 的基本用法

在 React 中，我们可以通过 `React.createRef()` 或 `useRef` 创建一个 ref，并将其传递给组件的 `ref` 属性。例如：

```jsx

import React, { useRef } from 'react';

function MyComponent() {
  const inputRef = useRef();

  const handleClick = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <input type="text" ref={inputRef} />
      <button onClick={handleClick}>Focus</button>
    </div>
  );
}

```

在上面的代码中，我们创建了一个 ref，将其传递给输入框的 `ref` 属性，并在按钮被点击时调用了 `inputRef.current.focus()` 方法，将输入框聚焦。

然而，如果我们想将 `MyComponent` 组件作为子组件传递给另一个组件时，我们就无法使用这种方式来访问子组件中的输入框。因为我们无法将 `MyComponent` 组件中创建的 `inputRef` 传递给父组件。

为了解决这个问题，React 提供了 `forwardRef` 函数，它可以让我们在函数式组件中使用 ref，并将 ref 传递给子组件。下面是一个简单的使用示例：

```jsx

import React, { forwardRef, useRef } from 'react';

const MyComponent = forwardRef((props, ref) => {
  return <div>
    <input type="text" ref={ref} />
  </div>
});

export default function ParentComponent() {
	const childRef = useRef();

  const handleClick = () => {
    console.log(childRef.current)
    childRef.current.focus();
  };

  return (
    <div>
      <Child ref={childRef} />
      <button onClick={handleClick}>Focus</button>
    </div>
  );
}

```

在上面的代码中，我们定义了一个 `MyComponent` 组件，使用 `forwardRef` 函数将其包装起来，并在组件中创建了一个 `inputRef`。在父组件中，我们使用 `MyComponent` 组件，并将其 ref 传递给了 `childRef`。在按钮被点击时，我们调用 `childRef.current.focus()` 方法，将子组件中的输入框聚焦。

注意，在 `MyComponent` 中，我们需要将 `ref` 作为第二个参数传递给 `forwardRef`，并在组件中将其传递给需要使用 ref 的子组件，例如输入框。

#### `forwardRef` 的内部原理

了解 `forwardRef` 的内部原理可以帮助我们更好地理解其使用方式和限制。在 `forwardRef` 中，我们可以使用一个函数组件返回另一个函数组件，这个函数组件接收两个参数，`props` 和 `ref`。在函数组件内部，我们可以通过 `useImperativeHandle` 钩子函数定义一些暴露给父组件的 API，并将这些 API 作为对象传递给 `ref.current`。例如：

```jsx
import React, { forwardRef, useImperativeHandle, useRef } from 'react';

const MyComponent = forwardRef((props, ref) => {
  const inputRef = useRef();

  const handleClick = () => {
    inputRef.current.focus();
  };

  useImperativeHandle(ref, () => ({
    focus: handleClick
  }));

  return (
    <div>
      <input type="text" ref={inputRef} />
    </div>
  );
});

export default function ParentComponent() {
  const childRef = useRef();

  const handleClick = () => {
    childRef.current.focus();
  };

  return (
    <div>
      <MyComponent ref={childRef} />
      <button onClick={handleClick}>Focus</button>
    </div>
  );
}
```

在上面的代码中，我们在 `MyComponent` 中使用了 `useImperativeHandle` 钩子函数，定义了一个 `focus` 的 API，将其传递给了 `ref.current`。在父组件中，我们仍然可以通过 `childRef.current.focus()` 方法来聚焦输入框。

在上面的代码中，`useImperativeHandle` 的第一个参数是 `ref`，表示将 API 挂载在 `ref.current` 上。第二个参数是一个函数，返回一个对象，这个对象包含了我们需要暴露给父组件的 API。

需要注意的是，使用 `useImperativeHandle` 时，我们必须确保暴露的 API 不会产生意外的副作用，并且不会修改组件内部的状态。否则，可能会引起一些难以排查的 bug。



>  `forwardRef` 是 React 中一个非常有用的函数，它可以让我们在函数式组件中使用 ref，并将 ref 传递给子组件。在使用 `forwardRef` 时，我们需要将函数组件传递给 `forwardRef` 函数，并在组件中使用 `useImperativeHandle` 钩子函数来定义一些暴露给父组件的 API。在使用 `useImperativeHandle` 时，我们需要小心使用，并保证暴露的 API 不会产生意外的副作用。



---



### useImperativeHandle

> `useImperativeHandle` 是 React 的一个钩子函数，它提供了一种在函数组件中向父组件暴露函数的方式。在这篇教程中，我们将深入探讨 `useImperativeHandle` 的用法和实现细节，以及它适合哪些场景。 

#### 什么是 `useImperativeHandle`？

在 React 中，当我们需要从一个子组件调用父组件的方法时，通常的做法是将该方法作为 props 传递给子组件。但是，在某些情况下，我们可能需要从子组件中显式地暴露一个 API，以便父组件可以直接调用它。`useImperativeHandle` 就是为了满足这种需求而生的。

`useImperativeHandle` 接受两个参数：

- 第一个参数是一个 ref 对象，通常是通过 `useRef` 创建的。
- 第二个参数是一个函数，用于定义一个暴露给父组件的 API。该函数返回一个对象，该对象的属性和方法可以被父组件直接调用。

使用 `useImperativeHandle`，我们可以在子组件中定义一个 API，并将其暴露给父组件。在这个 API 中，我们可以提供一些对组件内部状态和方法的操作。这样父组件就可以通过 ref 直接调用子组件的 API，而不需要通过 props 传递回调函数。

#### 使用 `useImperativeHandle`

下面是一个使用 `useImperativeHandle` 的简单示例：

```jsx
import { useRef, useImperativeHandle } from 'react';

function ChildComponent(props, ref) {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    blur: () => {
      inputRef.current.blur();
    }
  }));

  return (
    <input type="text" ref={inputRef} />
  );
}

export default forwardRef(ChildComponent);

```

在这个示例中，我们定义了一个 `ChildComponent`，它包含一个输入框。我们使用 `useRef` 创建了一个 ref，然后通过 `useImperativeHandle` 将该 ref 对象暴露给父组件。

在 `useImperativeHandle` 的第二个参数中，我们定义了一个包含 `focus` 和 `blur` 方法的对象。当父组件调用 `ref.current.focus()` 时，`ChildComponent` 的输入框将获得焦点。当父组件调用 `ref.current.blur()` 时，输入框将失去焦点。

这里需要注意的是，`useImperativeHandle` 的第一个参数必须是通过 `React.createRef()` 或 `useRef` 创建的 ref。如果我们使用了 `useRef` 创建了一个 ref，那么我们必须将它传递给子组件，并在子组件中使用 `useImperativeHandle` 将其暴露给父组件。

#### 实现细节

`useImperativeHandle` 的实现其实并不复杂。在使用它的组件中，`useImperativeHandle` 首先会创建一个内部的 ref，然后将父组件传递进来的 ref 和内部的 ref 进行关联。在关联之后，`useImperativeHandle` 就会调用传递进来的函数，该函数的返回值就是父组件可以直接调用的 API。

具体来说，`useImperativeHandle` 的实现可以分为以下几个步骤：

1. 创建内部的 ref 对象
2. 判断是否传入了 ref 参数，如果有则将其与内部的 ref 关联
3. 调用传递进来的函数，获取需要暴露给父组件的 API
4. 将 API 挂载到关联的 ref 上
5. 在组件卸载时清除关联的 ref

这个过程看起来比较简单，但是需要注意的是，如果使用了 `useImperativeHandle`，那么父组件在使用该子组件时必须使用 `forwardRef` 函数将其包装起来。这是因为只有使用 `forwardRef`，父组件才能够获得子组件中暴露出来的 ref。

#### 适用场景

`useImperativeHandle` 可以用于许多场景，特别是在需要在父组件中直接调用子组件的方法时。一些常见的场景包括：

- 将子组件的某些操作提供给父组件，以便父组件可以在某些事件或生命周期方法中调用。
- 在组件卸载时执行一些清理操作，例如清空表单中的数据或关闭定时器。
- 将子组件的某些方法作为插件提供给其他组件。

总之，如果你需要将某些组件的操作暴露给父组件，或者需要在组件卸载时执行一些清理操作，那么 `useImperativeHandle` 是非常有用的。



>  `useImperativeHandle` 是 React 提供的一个钩子函数，它可以让我们在子组件中向父组件暴露一个 API。使用 `useImperativeHandle`，我们可以在子组件中定义一个 API，并将其暴露给父组件。在这个 API 中，我们可以提供一些对组件内部状态和方法的操作。这样父组件就可以通过 ref 直接调用子组件的 API，而不需要通过 props 传递回调函数。

在使用 `useImperativeHandle` 时，需要注意以下几点：

- `useImperativeHandle` 的第一个参数必须是通过 `React.createRef()` 或 `useRef` 创建的 ref。
- 如果使用了 `useRef` 创建了一个 ref，那么我们必须将它传递给子组件
- 父组件在使用子组件时必须使用 `forwardRef` 函数将其包装起来，以便可以获得子组件中暴露出来的 ref。
- 在使用 `useImperativeHandle` 时，必须小心使用它。因为暴露给父组件的 API 可能会导致意外的副作用，例如修改组件内部的状态。所以在设计 API 时，需要保证其只会执行有限的操作，而且不会修改组件内部的状态。

以下是一个简单的使用示例：

```jsx
import React, { forwardRef, useImperativeHandle, useRef } from "react";

const ChildComponent = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    getValue: () => {
      return inputRef.current.value;
    }
  }));

  return (
    <input
      type="text"
      ref={inputRef}
      placeholder="Type something..."
    />
  );
});

export default function ParentComponent() {
  const childRef = useRef();

  const handleClick = () => {
    childRef.current.focus();
  };

  const handleGetValue = () => {
    console.log(childRef.current.getValue());
  };

  return (
    <div>
      <ChildComponent ref={childRef} />
      <button onClick={handleClick}>Focus</button>
      <button onClick={handleGetValue}>Get Value</button>
    </div>
  );
}
```

在上面的示例中，我们定义了一个 `ChildComponent` 组件，它包含一个输入框和两个 API：`focus` 和 `getValue`。`focus` 方法将输入框聚焦，`getValue` 方法返回输入框中的值。

在 `ChildComponent` 中，我们使用了 `useImperativeHandle` 将这两个 API 暴露给了父组件。在 `ParentComponent` 中，我们使用 `forwardRef` 包装了 `ChildComponent`，并使用 `ref` 属性将子组件的 ref 传递给了父组件。

在 `ParentComponent` 中，我们定义了两个事件处理函数 `handleClick` 和 `handleGetValue`，它们分别在按钮被点击时调用 `childRef` 中暴露出来的 `focus` 和 `getValue` 方法。

#### 结论

`useImperativeHandle` 是 React 提供的一个非常有用的钩子函数，它可以让我们在子组件中向父组件暴露一个 API。使用 `useImperativeHandle`，我们可以在子组件中定义一个 API，并将其暴露给父组件。在这个 API 中，我们可以提供一些对组件内部状态和方法的操作。这样父组件就可以通过 ref 直接调用子组件的 API，而不需要通过 props 传递回调函数。

在使用 `useImperativeHandle` 时，需要注意以下几点：

- `useImperativeHandle` 的第一个参数必须是通过 `React.createRef()` 或 `useRef` 创建的 ref。

- 如果使用了 `useRef` 创建了一个ref，在子组件内部需要使用 `useEffect` 监听这个 ref 是否有变化，并在变化时更新子组件的状态。

- 暴露给父组件的 API 必须保证只会执行有限的操作，而且不会修改组件内部的状态。

- 父组件在使用子组件时必须使用 `forwardRef` 函数将其包装起来，以便可以获得子组件中暴露出来的 ref。

  

  

使用 `useImperativeHandle` 可以在一些特定场景中提高组件的复用性和可维护性。在一些高阶组件或组合式组件中，我们可以定义一些公共的 API，将这些 API 暴露给父组件，让父组件直接调用这些 API，而不需要通过 props 传递回调函数。这样可以减少组件之间的耦合，提高代码的可读性和可维护性。



---



### useLayoutEffect

> `useLayoutEffect` 是 React 中提供的一个类似于 `useEffect` 的 Hook。它与 `useEffect` 的不同之处在于，`useLayoutEffect` 的回调函数会在 DOM 更新之前同步执行，而 `useEffect` 的回调函数则会在 DOM 更新之后异步执行。在本文中，我们将深入了解 `useLayoutEffect` 的使用和实现。 

#### 基本用法

`useLayoutEffect` 的用法和 `useEffect` 类似，接收两个参数，第一个参数是回调函数，第二个参数是依赖数组。例如

```jsx
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';

export default function Ted () {
  const [toggle, setToggle] = useState(false)

  useLayoutEffect(() => {
    setToggle(false)
  }, [toggle]);

  return (
    <div onClick={() => setToggle(!toggle)} style={{ backgroundColor: toggle > 0 ? 'red' : 'blue' }}>
      <p>aaaaaaaaaaaaaa</p>
      <p>bbbbbbbbbbbbbbbbb</p>
      {toggle && <a>闪烁闪烁闪烁</a>}
    </div>
  );

}

```

在上面的代码中，我们使用了 `useLayoutEffect` 来修改`toggle`开关，点击时并不会看到屏幕闪烁, 如果是用useEffect我们会看到屏幕的闪烁(先变红 再变蓝), useLayoutEffect帮我们实现了对实际渲染的防抖处理减少了 重绘和重排的消耗

#### 与 useEffect 的区别

`useLayoutEffect` 和 `useEffect` 的区别在于，`useLayoutEffect` 的回调函数会在 DOM 更新之前同步执行，而 `useEffect` 的回调函数则会在 DOM 更新之后异步执行。

这意味着，在使用 `useLayoutEffect` 时，我们可以在回调函数中直接操作 DOM，并得到最新的值。而在使用 `useEffect` 时，由于回调函数是异步执行的，所以在回调函数中无法得到最新的值。

另外，由于 `useLayoutEffect` 的回调函数是同步执行的，如果在回调函数中进行了大量的计算或者操作 DOM，可能会阻塞页面的渲染。因此，我们应该谨慎使用 `useLayoutEffect`，并尽量将计算或者操作 DOM 的逻辑放在异步的回调函数中。

#### 实现原理

`useLayoutEffect` 的实现原理与 `useEffect` 类似，都是通过调用 `scheduleEffect` 函数来实现的。在 `scheduleEffect` 函数中，React 会根据当前的任务队列是否为空来决定是同步执行回调函数还是异步执行回调函数。

在调用 `useLayoutEffect` 时，React 会在内部创建一个与当前组件实例相关的 effect 链表，将 `useLayoutEffect` 的回调函数添加到链表中。当组件更新时，React 会遍历 effect 链表，并依次执行每个 effect。对于 `useLayoutEffect`，它的回调函数会在 DOM 更新之前同步执行，因此 React 会在遍历 effect 链表时，优先执行 `useLayoutEffect` 的回调函数。

在执行 `useLayoutEffect` 的回调函数时，React 会将回调函数的返回值添加到一个清除函数的数组中，以便在组件卸载时执行清除函数。同时，React 还会将回调函数的返回值存储在 effect 对象的 cleanup 属性中，以便在下一次组件更新时执行清除函数。

下面是 `useLayoutEffect` 的简化实现代码：

```jsx
function useLayoutEffect(callback, dependencies) {
  const currentComponent = getCurrentComponent();
  const currentEffect = currentComponent.effectList[currentComponent.effectIndex++];

  if (shouldRunEffect(currentEffect, dependencies)) {
    // 同步执行回调函数
    const cleanup = callback();

    // 将 cleanup 函数添加到清除函数的数组中
    currentComponent.cleanupList.push(cleanup);

    // 将回调函数的返回值存储到 effect 对象的 cleanup 属性中
    currentEffect.cleanup = cleanup;
  } else {
    // 将回调函数的返回值存储到 effect 对象的 cleanup 属性中
    currentEffect.cleanup = undefined;
  }
}

function shouldRunEffect(effect, dependencies) {
  // 判断是否是第一次执行 effect
  if (!effect) {
    return true;
  }

  // 判断依赖数组是否发生变化
  const depsChanged = dependencies.some((dep, i) => dep !== effect.dependencies[i]);

  if (depsChanged) {
    effect.cleanup && effect.cleanup();
    return true;
  }

  return false;
}
```

在上面的代码中，`useLayoutEffect` 接收回调函数和依赖数组作为参数，并在内部调用 `shouldRunEffect` 函数来判断是否需要执行回调函数。如果需要执行回调函数，那么 `useLayoutEffect` 就会同步执行回调函数，并将清除函数添加到清除函数的数组中，将回调函数的返回值存储到 effect 对象的 cleanup 属性中。

由于 `useLayoutEffect` 的实现原理与 `useEffect` 类似，所以它也受到了与 `useEffect` 相同的限制。具体来说，就是我们不能在 `useLayoutEffect` 的回调函数中直接操作 DOM，因为这可能会导致页面阻塞或出现其他问题。

#### 流程

1. react 在 diff 后，会进入到 commit 阶段，准备把虚拟 DOM 发生的变化映射到真实 DOM 上
2. 在 commit 阶段的前期，会调用一些生命周期方法，对于类组件来说，需要触发组件的 getSnapshotBeforeUpdate 生命周期，对于函数组件，此时会调度 useEffect 的 create destroy 函数
3. 注意是调度，不是执行。在这个阶段，会把使用了 useEffect 组件产生的生命周期函数入列到 React 自己维护的调度队列中，给予一个普通的优先级，让这些生命周期函数异步执行
4. 随后，就到了 React 把虚拟 DOM 设置到真实 DOM 上的阶段，这个阶段主要调用的函数是 commitWork，commitWork 函数会针对不同的 fiber 节点调用不同的 DOM 的修改方法，比如文本节点和元素节点的修改方法是不一样的。
5. commitWork 如果遇到了类组件的 fiber 节点，不会做任何操作，会直接 return，进行收尾工作，然后去处理下一个节点，这点很容易理解，类组件的 fiber 节点没有对应的真实 DOM 结构，所以就没有相关操作
6. 但在有了 hooks 以后，函数组件在这个阶段，会**同步调用**上一次渲染时 useLayoutEffect(create, deps) create 函数返回的 destroy 函数
7. 注意一个节点在 commitWokr 后，这个时候，我们已经把发生的变化映射到真实 DOM 上了
8. 但由于 JS 线程和浏览器渲染线程是互斥的，因为 JS 虚拟机还在运行，即使内存中的真实 DOM 已经变化，浏览器也没有立刻渲染到屏幕上
9. 此时会进行收尾工作，**同步执行**对应的生命周期方法，我们说的componentDidMount，componentDidUpdate 以及 useLayoutEffect(create, deps) 的 create 函数都是在这个阶段被**同步执行**。
10. 对于 react 来说，commit 阶段是不可打断的，会一次性把所有需要 commit 的节点全部 commit 完，至此 react 更新完毕，JS 停止执行
11. 浏览器把发生变化的 DOM 渲染到屏幕上，到此为止 react 仅用一次回流、重绘的代价，就把所有需要更新的 DOM 节点全部更新完成
12. 浏览器渲染完成后，浏览器通知 react 自己处于空闲阶段，react 开始执行自己调度队列中的任务，此时才开始执行 useEffect(create, deps) 的产生的函数

>  上面介绍了 `useLayoutEffect` 的用法和实现原理。与 `useEffect` 不同，`useLayoutEffect` 的回调函数会在 DOM 更新之前同步执行，因此我们可以在回调函数中直接操作 DOM，并得到最新的值。不过，由于 `useLayoutEffect` 的回调函数是同步执行的，如果在回调函数中进行了大量的计算或者操作 DOM，可能会阻塞页面的渲染，因此我们应该谨慎使用。

### useTransition

> useTransition是React 18中引入的一个新的hook，它可以用来处理异步操作的渲染，并且可以实现平滑的过渡效果。



#### 什么是useTransition？

在React中，当组件的状态发生变化时，React会重新渲染整个组件。如果状态变化非常频繁，例如由于网络请求或用户输入导致的异步操作，这可能会导致UI的卡顿或闪烁。

useTransition通过将更新的UI渐进式地呈现给用户，从而实现平滑的过渡效果。这个过渡效果类似于骨骼动画，使得UI看起来更加平滑和自然。

使用useTransition需要提供两个参数：第一个参数是要进行过渡的状态，第二个参数是一个配置对象，可以包含以下属性：

- timeout：过渡的时间长度（以毫秒为单位）。
- busyDelay：在过渡开始之前，在UI上显示loading状态的时间（以毫秒为单位）。
- busyMinDuration：在过渡完成之前至少显示loading状态的时间（以毫秒为单位）。
- exitTail：在过渡完成之后，尾部留下的元素数。

下面是一个简单的例子，展示了如何使用useTransition来处理异步操作的渲染：



```jsx
import { useTransition } from 'react';

function App() {
  const [isPending, setIsPending] = useState(false);
  const [data, setData] = useState(null);

  const handleClick = async () => {
    setIsPending(true);
    const response = await fetch('https://api.example.com/data');
    const json = await response.json();
    setData(json);
    setIsPending(false);
  };

  const transitions = useTransition(isPending, {
    timeout: 500,
    busyDelay: 1000,
    busyMinDuration: 2000,
    exitTail: 2,
  });

  return (
    <>
      <button onClick={handleClick}>Fetch Data</button>
      {transitions((style, item) =>
        item ? (
          <div style={style}>Loading...</div>
        ) : (
          <div style={style}>{data ? data.title : ''}</div>
        )
      )}
    </>
  );
}
```

在这个例子中，当用户点击“Fetch Data”按钮时，组件的状态会被设置为“pending”，并且loading状态将显示在UI上。当异步操作完成时，数据将被更新并显示在UI上。过渡效果将使得UI在loading状态和数据状态之间平滑过渡。 



#### useTransition的实现原理

useTransition的实现原理可以分为两个部分：状态更新和过渡处理。

当useTransition接收到一个新的状态时，它会将这个状态保存到内部状态中，并在下一次渲染时使用这个状态。它还会将之前的状态（如果存在）与新的状态进行比较，并计算出要过渡的元素的状态和样式。

过渡处理是通过React中的协程（coroutine）机制实现的。协程是一种特殊的函数，它可以在执行过程中被挂起和恢复。React中的协程机制可以让UI组件在渲染过程中暂停和恢复，以便在异步操作期间渲染UI。

在useTransition中，过渡处理函数是由React协程调用的。当过渡开始时，过渡处理函数将被挂起，并在下一帧中继续执行。在这个过程中，UI将被逐渐呈现出来，从而实现平滑的过渡效果。

在过渡过程中，过渡处理函数会接收一个样式对象和一个状态对象。样式对象包含UI元素的样式，状态对象包含UI元素的状态。过渡处理函数可以使用这些对象来渲染UI，从而实现平滑的过渡效果。

最后，当过渡处理函数完成时，它将返回一个React元素。这个元素将被包含在调用useTransition的函数的返回值中，并在下一次渲染时渲染到UI中。

> useTransition是React 18中引入的一个新的hook，它可以用来处理异步操作的渲染，并且可以实现平滑的过渡效果。使用useTransition需要提供两个参数：第一个参数是要进行过渡的状态，第二个参数是一个配置对象。
>
> 在实现上，useTransition使用React中的协程机制来实现平滑的过渡效果。过渡处理函数是由React协程调用的，并且可以逐渐呈现UI元素，从而实现平滑的过渡效果。



---



### 自定义Hooks

> 在 React 中，Hook 是一种函数，可以让我们在函数组件中使用状态和其他 React 功能。React 提供了一些内置的 Hook，例如 useState 和 useEffect，用于管理组件的状态和副作用。但是，有时我们需要共享某些逻辑，并在多个组件之间重用它。这时，我们可以编写自定义 Hook 来封装这些逻辑。 

下面将介绍如何创建、使用自定义Hook，并提供一些最佳实践和注意事项。

#### 创建自定义 Hook

自定义 Hook 是一个普通的 JavaScript 函数，它可以使用任何已经存在的 Hooks（例如 useState、useEffect 等），也可以使用其他自定义 Hook。通常情况下，自定义 Hook 的名称应该以 `use` 开头，这样 React 就可以识别它是一个 Hook。

下面是一个简单的示例，展示了如何创建一个名为 useCounter 的自定义 Hook，它用于跟踪一个计数器：

```jsx

import { useState } from 'react';

function useCounter(initialCount) {
  const [count, setCount] = useState(initialCount);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return { count, increment, decrement };
}
```

在上面的示例中，我们使用 useState Hook 来跟踪计数器的状态，并返回了一个对象，该对象包含 count、increment 和 decrement 属性，用于访问和更新计数器。

#### 使用自定义 Hook

使用自定义 Hook 非常简单，只需要像使用任何其他 Hook 一样在组件中调用它即可。下面是一个示例，展示了如何使用上面定义的 useCounter 自定义 Hook：

```jsx

import useCounter from './useCounter';

function Counter() {
  const { count, increment, decrement } = useCounter(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}

```

在上面的示例中，我们导入了 useCounter 自定义 Hook，并在 Counter 组件中使用它。我们传递了一个初始值为 0 的参数给 useCounter，然后从返回的对象中获取 count、increment 和 decrement 属性，并将它们分别绑定到组件中的 UI 元素上。



#### 注意事项 

下面是一些使用自定义 Hook 的最佳实践和注意事项：

 - 自定义 Hook 应该以 `use` 开头，以便 React 能够正确识别它们。 
 - 将自定义 Hook 的逻辑封装在一个函数中，并使用 Hooks 来管理状态和副作用。 
 - 使用测试来确保自定义 Hook 在不同的场景下都能正常工作。 
 - 将自定义 Hook 定义在单独的文件中，并导出它们，以便在其他组件中重复使用。
 - 自定义 Hook 可以使用其他 Hooks，包括其他自定义 Hook，以便更好地重用和组合逻辑。 

>  总之，自定义 Hook 是 React Hooks 最强大和灵活的功能之一。通过将组件逻辑封装在可重用的函数中，我们可以更好地组织和管理我们的代码，并在不同的组件中共享逻辑，从而提高代码的可维护性和可复用性。 





## 组件通信

> React 组件之间通信是一个常见的需求，特别是在复杂的应用程序中。本章节将介绍几种实现 React 组件之间通信的方案，包括 props drilling、Context API、 Event Bus 以及 Redux

### Props Drilling

Props drilling 是一种通过将属性(props)传递到组件树中的深层嵌套组件来实现组件通信的方法。它是 React 中最基本、最简单的组件通信方法之一，但在大型应用程序中，这种方法可能会导致属性的层次结构非常深，使代码难以维护。

#### 传递 Props

最简单的传递 props 的方法是将属性逐级传递到所需的组件。例如，我们有一个父组件 `Parent`，它有一个子组件 `Child`，`Child` 组件需要获取 `Parent` 组件的某些属性，可以通过将这些属性作为 props 传递给 `Child` 组件来实现：

```jsx

// Parent.js
import React from 'react';
import Child from './Child';

function Parent() {
  const name = 'John';
  const age = 30;
  return <Child name={name} age={age} />;
}
```

```jsx

// Child.js
import React from 'react';

function Child(props) {
  return (
    <div>
      <p>Name: {props.name}</p>
      <p>Age: {props.age}</p>
    </div>
  );
}

export default Child;
```

#### 组件树层级过多

如果组件树的层级过多，将属性逐级传递可能会非常繁琐。在这种情况下，可以考虑使用 React 的 `Context API`。

### Context API

> 通常，您会通过 props 将信息从父组件传递到子组件。但是如果你必须在中间通过许多组件传递它们，或者如果你的应用程序中的许多组件需要相同的信息，那么传递 props 会变得冗长和不方便。*Context*允许父组件向其下方树中的任何组件提供一些信息——无论多深——而无需通过 props 显式传递。 

Context API 是 React 提供的一种用于在组件之间共享数据的方法，可以使组件树中的任何组件访问共享数据，而无需通过 props 属性将数据逐级传递下去。



<img src="assets/propstx.jpg" width="50%" height="auto" alt="props" style="zoom:50%"/><img src="assets/contexttx.jpg" width="50%" height="auto" alt="context" style="zoom:50%" / >

​    



#### 创建 Context

要使用 Context API，首先需要创建一个 Context 对象。可以使用 `createContext` 函数来创建一个 Context 对象：

```jsx

// MyContext.js
import React from 'react';

const MyContext = React.createContext();

export default MyContext;
```

#### 提供数据

> 每个 Context 对象都会返回一个 Provider React 组件，它允许消费组件订阅 context 的变化。
>
> Provider 接收一个 `value` 属性，传递给消费组件。一个 Provider 可以和多个消费组件有对应关系。多个 Provider 也可以嵌套使用，里层的会覆盖外层的数据。
>
> 当 Provider 的 `value` 值发生变化时，它内部的所有消费组件都会重新渲染。从 Provider 到其内部 consumer 组件（包括 [.contextType](https://zh-hans.reactjs.org/docs/context.html#classcontexttype) 和 [useContext](https://zh-hans.reactjs.org/docs/hooks-reference.html#usecontext)）的传播不受制于 `shouldComponentUpdate` 函数，因此当 consumer 组件在其祖先组件跳过更新的情况下也能更新。

要共享数据，需要将数据放入 Context 对象中，然后使用 `MyContext.Provider` 组件在组件树的某个位置提供该数据。下面是一个例子：

```jsx

// App.js
import React from 'react';
import MyContext from './MyContext';
import Parent from './Parent';

function App() {
  const name = 'John';
  const age = 30;
  return (
    <MyContext.Provider value={{ name, age }}>
      <Parent />
    </MyContext.Provider>
  );
}

export default App;
```

在上面的例子中，我们创建了一个 MyContext 对象，并在 `App` 组件中使用 `MyContext.Provider` 组件来提供共享数据。在这里，我们将`name` 和 `age` 作为一个对象传递给 `value` 属性，这样所有使用了 `MyContext.Consumer` 组件的组件都可以访问到这些数据。

#### 消费数据

> 一个 React 组件可以订阅 context 的变更，此组件可以让你在[函数式组件](https://zh-hans.reactjs.org/docs/components-and-props.html#function-and-class-components)中可以订阅 context。
>
> 这种方法需要一个[函数作为子元素（function as a child）](https://zh-hans.reactjs.org/docs/render-props.html#using-props-other-than-render)。这个函数接收当前的 context 值，并返回一个 React 节点。传递给函数的 `value` 值等价于组件树上方离这个 context 最近的 Provider 提供的 `value` 值。如果没有对应的 Provider，`value` 参数等同于传递给 `createContext()` 的 `defaultValue`。

要在组件中访问共享数据，可以使用 `MyContext.Consumer` 组件来订阅 Context 对象中的数据。下面是一个例子：

```jsx

// Child.js
import React from 'react';
import MyContext from './MyContext';

function Child() {
  return (
    <MyContext.Consumer>
      {({ name, age }) => (
        <div>
          <p>Name: {name}</p>
          <p>Age: {age}</p>
        </div>
      )}
    </MyContext.Consumer>
  );
}

export default Child;
```

在上面的例子中，我们使用 `MyContext.Consumer` 组件来订阅 `MyContext` 对象，并将共享数据（`name` 和 `age`）作为一个对象传递给一个函数，这个函数渲染组件。在这个函数中，我们可以通过解构赋值来获取共享数据，并将它们渲染到组件中。

#### 使用 useContext Hook

React 还提供了一个 `useContext` Hook，可以更方便地访问共享数据。下面是一个使用 `useContext` Hook 的例子：

```jsx

// Child.js
import React, { useContext } from 'react';
import MyContext from './MyContext';

function Child() {
  const { name, age } = useContext(MyContext);
  return (
    <div>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
    </div>
  );
}

export default Child;
```

在上面的例子中，我们使用 `useContext` Hook 来访问共享数据，它返回的是 `MyContext.Provider` 组件的 `value` 属性。这使得我们可以直接解构共享数据，并将它们渲染到组件中。

#### 注意事项

上下文非常诱人使用！然而，这也意味着它很容易被过度使用。**仅仅因为您需要深入传递一些道具并不意味着您应该将这些信息放入上下文中。**

在使用上下文之前，您应该考虑以下几个备选方案：

1. **从传递道具开始。**如果您的组件不是微不足道的，那么通过十几个组件向下传递一打道具并不罕见。它可能感觉像一个 slog，但它非常清楚哪些组件使用哪些数据！维护你的代码的人会很高兴你已经使用 props 明确了数据流。
2. **提取组件并将JSX 传递children给它们。**如果您通过许多不使用该数据的中间组件层传递某些数据（并且仅将其进一步向下传递），这通常意味着您忘记沿途提取某些组件。例如，也许您将数据道具传递`posts`给不直接使用它们的可视化组件，例如`<Layout posts={posts} />`. 相反，将`Layout`take`children`作为道具，然后渲染`<Layout><Posts posts={posts} /></Layout>`. 这减少了指定数据的组件和需要数据的组件之间的层数。



 

### 事件总线(发布订阅)

> React 发布订阅模式是一种用于组件之间传递消息的技术。通过发布订阅模式，一个组件可以订阅一个主题并接收更新，另一个组件可以发布一个主题并通知所有订阅者。这种方式可以降低组件之间的耦合度，使得组件更加灵活可复用。 

#### 事件总线简单实现

```jsx
//EventBus.js
class Event {
  constructor() {
    this.handlers = {}
    this.instance = null;
  }
  //处理命名空间
  static getNamespace (eventType) {
    const eventNamespaceArr = eventType.split('.')

    let [namespace = 'default', event = eventType] = eventNamespaceArr
    if (eventNamespaceArr.length === 1) {
      namespace = 'default';
      event = eventType
    }
    return [namespace, event]
  }
  //单例模式 保证全局唯一实例
  static getInstance () {
    if (!this.instance) {
      this.instance = new Event();
    }
    return this.instance;
  }
	//订阅
  subscribe (eventType, handler) {

    let [namespace, event] = Event.getNamespace(eventType)


    if (!this.handlers[namespace]) {
      this.handlers[namespace] = {}
    }
    if (!this.handlers[namespace][event]) {
      this.handlers[namespace][event] = []
    }
    this.handlers[namespace][event].push(handler)

  }
  
  //取消订阅
  unsubscribe (eventType, handler) {
    let [namespace, event] = Event.getNamespace(eventType)
    if (!this.handlers[namespace] || !this.handlers[namespace][event]) {
      return
    }
    this.handlers[namespace][event] = this.handlers[namespace][event].filter(h => h !== handler)
    if (this.handlers[namespace][event].length === 0) {
      delete this.handlers[namespace][event]
    }
    if (Object.keys(this.handlers[namespace]).length === 0) {
      delete this.handlers[namespace]
    }
  }
  //发布
  publish (eventType, data) {
    let [namespace, event] = Event.getNamespace(eventType)

    if (!this.handlers[namespace] || !this.handlers[namespace][event]) {
      return
    }
    this.handlers[namespace][event].forEach(async handler => {
      try {
        await handler(data)
      } catch (error) {
        console.error(`Error handling event ${eventType}: ${error.message}`)
      }
    })
  }
}

const $EventBus = new Event()
export default $EventBus
```

#### 使用方式

```jsx
//组件A 发布者角色
import React, { useState, useCallback } from 'react';
import $EventBus from '../pubsub';

const Achild = () => {
  const [value, setValue] = useState('')
  const handleInputChange = useCallback((e) => {
    let val = e.target.value
    setValue(val)
    $EventBus.publish('Achild.inputChange', val)
  }, [])
  return (
    <div>
      <p>组件A</p>
      <input type="text" value={value} onChange={handleInputChange} />
    </div>
  );
}

export default Achild;

```

```jsx
//组件B 订阅者角色
import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react';
import $EventBus from '../pubsub';
const Bchild = () => {
  const [val, setVal] = useState('')

  const handleSub = useCallback((msg) => {
    setVal(msg)
  }, [])
  useLayoutEffect(() => {
    $EventBus.subscribe('Achild.inputChange', handleSub)
    return () => {
      $EventBus.subscribe('Achild.inputChange', handleSub)
    }
  }, [])
  return (
    <div>
      <p>来自组件A的消息 {val}</p>
    </div>
  );
}

export default Bchild;

```



#### 使用第三方库

> 如果不想自己封装, 开发中我们可以使用第三方发布订阅的事件总线库 , 用法和API都大同小异
>
> 下面推荐两个常用的总线通信库

events: https://github.com/browserify/events

PubSubJS:  https://github.com/mroderick/PubSubJS



#### 使用addEventListener

> addEventListener API 除了可以支持DOM事件监听 还可以监听通过 由 new CustomEvent  创建的 由 dispatchEvent  触发的自定义事件



```jsx

```

```jsx
//组件B
import React, { useState, useEffect, useCallback, useLayoutEffect } from 'react';
const Bchild = () => {
  const [val, setVal] = useState('')
	
  const handleSub = useCallback(({ detail: { inputValue } }) => {
    //从event对象上解构出 detail属性的inputValue
    setVal(inputValue)
  }, [])
  useLayoutEffect(() => {
    //window监听自定义事件inputChange的触发
    window.addEventListener('inputChange', handleSub)
    return () => {
      //组件销毁时解绑监听
      window.removeEventListener('inputChange', handleSub)
    }
  }, [])
  return (
    <div>
      <p>来自组件A的消息 {val}</p>
    </div>
  );
}

export default Bchild;

```



#### 注意事项

在使用事件总线时，我们需要注意以下几点：

1. 事件总线是一个全局的事件中心，因此需要避免事件名称的冲突。
2. 事件总线可以实现任意组件之间的通信，但是也会带来一定的复杂性和不可控性，因此需要谨慎使用。
3. 事件总线与组件之间的关系比较松散，因此在代码可维护性方面可能存在一定的风险。
4. 事件订阅在组件销毁的时候一定要清除, 否则在组件创建的时候 会发生二次订阅导致叠加

综上所述，使用事件总线来实现组件之间的通信可以是一种有效的方案，但需要根据具体情况进行权衡和选择。

