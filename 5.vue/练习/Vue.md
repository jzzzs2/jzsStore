## Vue

>1.渐进式框架
>
>数据双向绑定简单实现(发布订阅模式):
>
>```
>步骤:
>前置条件:
>将传入的data参数,挂载在了vm对象上,并且对vm对象上的数据进行defineProperty监听获取和修改
>订阅者: sub,内部有根据vm中数据修改node节点数据的方法
>发布者:pub,内部有保存对应订阅者的数组,还有调用所有订阅者更新的方法
>1)vm对象对参数容器内部进行解析,对vue框架规定的特殊数据绑定语法进行解析(比如{{}}和v-model),解析时创建订阅对象,从vm中获取数据进行渲染,并进行订阅,在defineProperty的get方法中进行订阅者存储,当通过有v-model属性的input标签修改vm中数据或者直接修改vm数据时,触发defineProperty的set方法中进行发布,对所有订阅者执行更新操作,获取最新的vm中数据.
>
>更新总结1:
>vue2 会给data里的每个属性创建一个发布者对象,通过Object.defineProperty对每一个属性的获取和修改进行劫持,在初次解析组件模板时,会识别出特殊数据绑定语法,生成一个订阅者对象,并渲染绑定值,渲染取值操作被get捕获,将订阅者对象存储到发布者对象的订阅者数组属性中. 当修改数据时,会被set捕获,由发布者对象对它的订阅者数组进行循环更新操作.
>更新总结2:
>vue实例初始化时,会给data里的每个属性,创建一个发布者对象, 然后会对组件模板进行解析,解析到特殊数据绑定语法时,会把创建一个相关信息的订阅者对象,内部获取vue管理属性渲染dom, 获取操作被object.defineProperty()的get方法截获,订阅者对象被push到相应的发布者对象的订阅者数组属性中,当data属性被修改时,会被set方法截获.该属性的发布者对象会通知所有订阅者进行更新操作.
>```
>
>
>
>```
>//发布者和监听者
>let Publisher = class Publisher {
> constructor(attr) {
>   this.attr = attr
>   this.subs = []
> }
> pub() {
>   for (let i = 0; i < this.subs.length; i++) {
>     this.subs[i].update()
>   }
> }
>}
>let Subscriber = class Subscriber {
> constructor(node, attr, vm) {
>   this.node = node
>   this.attr = attr
>   this.vm = vm
>   Publisher.target = this
>   this.get()
> }
> get() {
>   this.update()
>   Publisher.target = null
> }
> update() {
>   this.node.nodeValue = this.vm[this.attr]
>   this.node.value = this.vm[this.attr]
> }
>}
>//1.转接函数
>function propertyTransplant(target, data) {
> Object.entries(data).map(([key, value]) => {
>   target[key] = value
> })
>}
>//2.解析指代标识为仓库数据并对一些元素进行事件绑定
>function compile(el, vm) {
> let nodes = document.querySelector(el).childNodes
> //input标签
> for (let i = 0; i < nodes.length; i++) {
>   let node = nodes[i]
>   if (node.nodeType == 1) {
>     console.log("TYPE 1");
>     let attributes = node.attributes
>     console.log(attributes, "Attr");
>     if ("v-model" in attributes) {
>       console.log("你是有v-model的元素");
>       let key = node.getAttribute("v-model")
>       //初次赋值
>       node.value = vm[key]
>       //进行绑定
>       node.addEventListener("input", function (e) {
>         console.log("修改仓库");
>         vm[key] = this.value
>       })
>       //TODI 订阅者创建
>       new Subscriber(node,key,vm)
>     }
>   }
>   //文字
>   if (node.nodeType == 3) {
>     console.log("TYPE 3");
>     let regExp = /\{\{(.+)\}\}/
>     if (regExp.test(node.nodeValue)) {
>       let key = node.nodeValue.match(regExp)[1]
>       console.log(key, "key");
>       node.nodeValue = vm[key]
>       //toDo 订阅者创建
>       new Subscriber(node,key,vm)
>     }
>   }
> }
>}
>//对vm中的数据进行监听
>function watchAttr(data, vm) {
> let keys = Object.keys(data)
> console.log(keys, "keys");
> for (let i = 0; i < keys.length; i++) {
>   let value = data[keys[i]]
>   let publisher = new Publisher()
>   console.log(keys[i], "curr key", value);
>   Object.defineProperty(vm, keys[i], {
>     get() {
>       if (Publisher.target) {
>         console.log("进行订阅");
>         publisher.subs.push(Publisher.target)
>       }
>       return value
>     },
>     set(val) {
>       if (val == value) {
>         return
>       }
>       value = val
>       //toDo 发布消息
>       publisher.pub()
>     }
>   })
> }
>}
>
>//3.对vue对象上的数据进行监听
>class Vue {
> constructor({ el, data }) {
>   this.el = el
>   propertyTransplant(this, data)
>   watchAttr(data, this)
>   compile(el, this)
>   // this.init()
>   
> }
>}
>let app = new Vue({
> el: "#app",
> data: {
>   name: "jzs"
> }
>})
>```
>

## Vue

```
let app = new Vue({
      el: document.querySelector(".box"),
      data() {
        return {
          message: "welcome to my home",
          name: "jzs",
          num: 9,
          type: "acti",
          // age: 22
          age: 0
        }
      },
      methods: {
      }
    })
```

```
内部参数:
el 解析的容器
data 挂载到vm对象上的数据,只有一开始初始化vm设置的data具有响应性,data一般用函数写法,不用对象写法
methods方法内部的this指向vm对象(不使用箭头函数)
```



## Vue  插值语法 内容指令 属性指令  插值和指令值的表达式书写

```
1.进行标签内容进行数据绑定
<p> {{key}} </p> 
<p v-text='key'></p>  如果key对应的value值是标签字符串,标签字符串不会被解析为标签
<p v-html='key'></p>  标签字符串会被解析为标签
<p v-once>{{key}}</p> 该处的值 第一次被解析后就变为静态内容,之后不会再响应数据变化
```

```
2.对标签属性绑定
<p v-bind:属性名='key'></p>
简写: <p :属性名='key'></p>
动态属性  <p :[key1]='key2'></p>
```

```
对hidden属性: vue将undefined,null,false视为假值,设置为这三个值时,没有该属性
对其他属性不能统一而论
```

```
3.插值表达式
vue允许在插值内容和指令值中书写js表达式
例子:
<div> {{message.toUpperCase()}}</div>
<div :class="type+'ve'"> {{message.toUpperCase()}}</div>
<div v-text="String(num)[1] && String(num) || 0+String(num)"></div>
不允许:
{{ num++ }} //响应式导致无限循环
{{ if(isTrue){return 'yes'}}} //流程控制
{{ let count = 10 }}
```

```
防止vue模板加载慢,显示插值{{}}的问题
[v-cloak] {
      display: none
}
```

## 条件渲染 循环渲染 事件绑定 事件修饰符  key属性

```
1.条件渲染
<p v-if='true'>123</p>
<span v-else-if='false'>123</span>
<h2 v-else>suki</h2>
0,null,undefined,NaN,""会被判断为条件不符
```

```
2.列表渲染
数组
<li v-for='(item,idx) in arr'></li>
对象
<li v-for='(value,key,idx)' of obj></li>
对数组进行增删改查操作时,如果需要使得数据可以自响应,
(×)list[0] = xxxx  不会即时渲染,会在下一次列表重新渲染时渲染该值
(√)通过vue中的侦听方法操作,push,pop,unshift,shift,sort,reverse,splice
(√)通过map,filter方法 获取一个新数组进行覆盖
```

```
3.事件绑定
<span v-on:事件名='函数名'></span> 简写方式 <span @事件名='函数名'></span>
函数不带参时,默认也会传事件对象给回调函数
函数带参
<span @click='add(item)'></span>  这个的函数不会被认为是函数被执行

事件的修饰符
.prevent .stop .capture .once .self
按键修饰符
@keyup
.enter
.tab
.delete (捕获“删除”和“退格”键)
.esc
.space
.up
.down
@click
.left
.right
系统修饰键 (需要在按下系统修饰键时,进行事件触发,回调才会执行)
@click
.ctrl
.alt
.shift
.meta (windows)

.exact 指定系统修饰键,才可触发,不能同时按下多个系统修饰键.
```

```
4. :key属性 唯一不可更改,作为for循环如何渲染的依据
在循环中,如果标签元素没有该唯一属性,添加并列标签时,会使用diff算法,减少dom开销,但会导致元素状态混乱.所以需要添加key属性.
```

## Class Style绑定      计算属性

```
1.class绑定 字符数据,对象,数组
:class='classStr'  let classStr = "类名1 类名2"
:class='{类名1:vm上data数据或表达式(逻辑值),类名2:XX}'
:class='[{类名1:vm上data数据或表达式(逻辑值)},{类名:XX}]' 需要判断
:class='[vm的key1,vm的key2]'  不需要判断,key对应的数据为类名
2.style绑定 字符数据,对象,数组
:style = '{样式名1: vm上data的key,样式名2: vm上data的key,xxxx}'
:style = '[{样式名1: vm上data的key},{样式名2: vm上data的key..}]'
3.computed vm上会挂载一个计算属性,计算属性方法会把get执行结果赋值给vm上的计算属性
计算属性 完整形式
computed: {
	getAllName: {
		get() {
			return this.firstName +  this.lastName
		},
		set() {
			let firstName = val.split("")[0]
            let lastName = val.slice(-val.length + 1)
            this.firstName = firstName
            this.lastName = lastName
		}
	}
}
计算属性 只有get形式
computed: {
	getAllName() {
		return this.firstName +  this.lastName
	}
}
计算属性具有依赖性,只有依赖的数据发生变化,计算属性值才会更新.
```

+ 普通class属性和绑定class内容会合并,style同理

+ style中特殊用法

  ```
  :style="{display:['-ms-flexbox','-webkit-box']}"  选择浏览器能使用的最后一个样式
  ```

  

## v-model 表单数据绑定 $event watch filter 以及和methods,computed使用区别

```
1.表单数据绑定 (本质是监听标签状态改变,对vm中数据进行修改操作)
单个复选框 (绑定布尔值
<input type="checkbox" name="" id="" v-model="isAgree">
data: {isAgree:false}
多个复选框 (data数据用数组
<input type="checkbox" name="hobbies" id="" :value="hb1" v-model="hobbies">抽烟
<input type="checkbox" name="hobbies" id="" :value="hb2" v-model="hobbies">喝酒
<input type="checkbox" name="hobbies" id="" :value="hb3" v-model="hobbies">烫头
data: {hobbies: []}
单选框
<input type="radio" name="sex" id="" value="男man" v-model="sex">男
<input type="radio" name="sex" id="" value="女women" v-model="sex">女
data: {sex: ""}
下拉选择框
<select name="period" id="" v-model="period" multiple>
      <option value="001">硕士</option>
      <option value="002">本科</option>
      <option value="003">专科</option>
      <option value="004">高中</option>
</select>
data: {period: []}
tip:如果option有value,则响应数据value,如果没有,则把option标签的内容作为数据响应
tip: 响应对象数据写法 <option :value="{name: item.name,title:item.title}" v-for="item in arr">{{item.title}}</option>
```

```
$event作为标识符,用在method方法调用时,有多个参数传入的情况下,传入event对象
例子:
@click='getAllCount('param1','param2',$event)'
```

```
watch属性: 对数据进行监听,当数据改变,执行数据的监听方法
简易写法(无配置)
watch: {
	num(newValue,oldValue) {
		//不用return
	}
}
完整写法
watch: {
 num: {
 	handler(newValue,oldValue) {
 		//不用return
 	},
 	immediate: true //组件初次渲染是否执行
 	deep: true //是否深度检测,内部对象属性都会被检测到
 }
}
所以一般不推荐深度检测,过于消耗性能,对单个属性进行检测写法
watch: {
	'obj.age': {
		handler(newValue,oldValue) {
 		//不用return
 		}
	}
}

```

```
filters 属性: 用来放置工具方法
filters: {
	padLeft (val) {
		return String(val)[1] && String(val) || "0" + val
	}
}
使用: {{num | padLeft() | functionName() | functionName() }}
tip: num会默认作为padLeft的第一个实参,如果padLeft还要传入多个参数,要在filters下函数定义的参数列表按顺序排列.
tip: 前一个函数的返回值作为后一个函数的第一个输入参数,最后文本结果为最后一个函数的返回结果.
```

```
methods,computed,watch,filters区别
1.内部this指向  只有filters内部this指向window对象,其他都是指向vm
2.返回值 computed必须有return返回, filters渲染数据必须有return返回,methods在views渲染需要有return返回,watch不需要return
3.异步 computed不允许异步 watch推荐异步 methods允许异步(有限制 @click后绑定的函数不能是async await 可 then catch) filters不推荐异步
4.应用场景区别
methods 用于事件函数,业务逻辑书写 可异步
computed 用于数据处理,对数据进行抽取等处理 不可异步
watch  触发,被动响应一些数据操作 可异步 
filter 用于工具方法书写,对数据进行格式等处理 不推荐异步
```

+ v-show v-if  区别: v-if是否渲染dom / v-show是否display,隐藏dom

## Vue的生命周期

> 1.生命周期 简单来说就是 vm对象从创建到销毁中,对各个事件发生的阶段 进行的定义名称

```
1.创建阶段
beforeCreate: 没有初始化data和methods,只有生命周期函数和对自有属性,事件绑定等语法进行初始化.
created: 已经完成了对data和method的混入,并进行了define响应配置,在$data上可以访问到可响应的data数据.
beforeMount:已经对vm接管的模板进行了解析,但还没有进行实际渲染,此时没有$el属性.
mounted:已经将vdom进行了实际渲染,$el属性中保存了实际的dom元素
2.运行阶段
beforeUpdate:数据已经改变,但页面还没有进行渲染更新,可以通过$el.innerText进行获取(旧内容)
updated:vdom已经生成,并和原vdom进行比较,完成了页面的渲染更新,可以通过$el.innerText进行获取(新内容)
3.销毁阶段
beforeDestroy:
destroyed:
```

+ js是单线程执行,GUI和js解释引擎会抢占,导致阻塞

  ```
  let dom = document.createElement("span")
  dom.innerText = "testSpan"
  document.querySelector(".box").append(dom)
  alert("123")
  ```

  

## 组件

```
1.组件  简单理解 高内聚低耦合的独立功能模块,可移植
```

>2.全局组件创建 注册 使用
>
>```
>传统创建:
>let vm = Vue.extend({
>template: `xxxx`
>})
>语法糖创建并注册(常用)
>Vue.component("test-button",optionObj)
>let optionObj = {
>	template: ``,
>	data() {
>	return {}
>	}
>}
>补充:
>// 注册组件，传入一个扩展过的构造器
>Vue.component('my-component', Vue.extend({ /* ... */ }))
>// 注册组件，传入一个选项对象 (自动调用 Vue.extend)
>Vue.component('my-component', { /* ... */ })
>// 获取注册的组件 (始终返回构造器)
>var MyComponent = Vue.component('my-component')
>使用:
><div id='app'>
>	<test-button></test-button>
></div>
>```
>
>+ 组件template内容必须只有一个根元素,data属性是函数方式(防止数据混乱)
>+ 因为html标签和属性大小写不被区分,所以这里建议组件注册名使用 kebab-case写法.
>
>```
>3,局部组件使用
>let optionObj = {
>	template: ``,
>	data() {
>	return {}
>	}
>}
>new Vue({
>	xx,
>	components: {
>		'test-button': optionObj
>	}
>})
>使用:
><div id='app'>
>	<test-button></test-button>
></div>
>```
>
>+ 局部组件,要想使用,在他的直接父组件上进行components注册



### 组件属性

-  components  

   - props       
   - data         
   - created    
   - mounted   
   - activited   
   - update  
   - beforeRouteUpdate    
   - methods       
   - filter    
   - computed   
   - watch

## 父子组件嵌套

```
1.props使用(子组件使用父组件的数据)
first 父组件在自己的作用域下给子组件标签添加自定义属性并赋值
second 子组件在构造器配置对象props属性中接收属性值
third 在自己的模板中使用


props属性
类型: Array<string> | Object(推荐)
props: ['xx','xx']

props: {
	'testAttr': {
		type: Number,
        required: true,
        default: 666,
        validator (value) {
            return /^.{3,}$/.test(value)
        }
	}
}

<div id='app'>
<son-temp :test-attr='name'></son-temp>
</div>

new Vue({
	data() {
		return {
			name: "jzs"
		}
	}
})
```

```

let sonObj = {
      template: `<div>123 {{diyTitle}}</div>`,
      props: {
        "diyTitle": {
          type: String
        }
      }
    }
    let app = new Vue({
      el: "#app",
      components: {
        'son-component': sonObj
      },
      data () {
        return {
          
        }
      },
    })
给子组件传输静态值:
1.默认是传输字面量的字符串类型,如果传数字或者布尔或者对象或者数组要对属性进行绑定
<div id="app">
    <son-component :diy-title="123"></son-component>
</div>
<div id="app">
    <son-component :diy-title="false"></son-component>
</div>
其他类型同上
2.给子组件传输一个对象的多个属性的简单写法:
<div id="app">
    <son-component v-bind="obj"></son-component>
</div>
data ()	{
        return{
          obj: {
            name: "jzs",
            age: 22
          		}
        	}
      	}
3.
```



+ 子组件标签上的自定义属性使用kebab-case写法,子组件props中key使用对应的驼峰写法.

## template抽离

```
1.<template id="test">
    <div>
      <button @click='sonNum++'>add</button>{{sonNum}} --- {{sonMessage}}
    </div>
  </template>
2.<script type="text/x-template" id="app">
    <div>
      <button @click='sonNum++'>add</button>{{sonNum}} --- {{sonMessage}}
    </div>
  </script>
Vue.component('xxx',{
	template: '#app'
})
```

## $emit 方法 触发自定义事件,对父组件数据进行修改

```
$emit(自定义函数名,参数1,参数2...)
使用样例:
<div id="app">
    <product-item v-for="(item,idx) in products" :product="item" :key="item.id" @change-num="changeNum(idx,$event)" :index="idx"></product-item>
  </div>

1.父组件 给 子组件 定义自定义事件,使用父组件的函数作为回调函数,修改数据. 子组件通过方法调用this.$emit(自定义函数名,参数1,参数2..)对事件进行触发
自定义事件回调函数中可以用关键字$event接收$emit传递的一个参数,用关键字arguments接收$emit传递的所有参数.
```

+ 自定义函数名统一用 kebab-case 写法

#### 数据传递

数据永远从上想下传递 通过props

数据流向永远是 向下的 

props传递数据不能跨域组件层级传递 必须逐级流动

修改数据永远只能在数据源头修改

## v-model  $parent $children $refs $root

```
1.v-model 就是自定义属性传props和自定义事件$emit的语法糖:
<son-temp v-model='父组件中data'></son-temp>
子组件option:
{
template: 'xxx',
model: {
	prop: "接收父组件值的prop名",
	event: "触发父组件数据改变的自定义事件名"
}
props: {
	'model中的prop参数作为接收的key': 数据类型
}
}
子组件中触发 $emit(event事件名,参数1) 将会修改 父组件中v-model绑定的值为参数1
++++++++++++ 等于 <son-temp :自定义属性名='data的key' @自定义事件='data的key=$event'></son-temp>
```

```
2. $children,$parent
子组件可以通过$parent属性直接获取到父组件组件对象,进行修改对象上的数据
父组件可以通过$children属性直接获取到子组件对象数组,进行修改对象上的数据
因为父子组件解析渲染顺序问题,所以$children不能在computed等方法中使用.如下总结:
```

## 父子组件解析渲染顺序

```
parent的beforeCreate打印children []
parent的created打印children []
parent中beforeMount打印$children []
son中beforeCreate打印$parent [VueComponent]
son中created打印$parent [VueComponent]
son中beforeMount打印$parent [VueComponent]
son中mounted打印$parent [VueComponent]
parent的mounted打印children [VueComponent]
总结: 先对父组件进行解析,然后对子组件进行解析,所以在子组件的beforeCreate中就能够访问到父元素的data.
然后先对子组件进行渲染,最后渲染父组件.所以只有在父组件的mounted后才能访问到$children
```

```
3. $root, $refs
任意组件可以通过$root直接访问vm实例对象
$refs使用:
<son-temp ref='blue'></son-temp>
<son-temp ref='red'></son-temp>
<son-temp ref='yellow'></son-temp>
在父组件对象作用域下 使用 this.$refs 获取到他的多个子组件包装对象,key为组件标签上的ref,value为组件对象.用于精准获取某个子组件.
```

## $attrs $listeners

```
$attrs 在子组件中获取父组件传递的自定义属性中未被props接收的自定义属性,并包装为对象,可用于跨组件父组件给隔代子组件传递数据
使用形式:
<parent-temp v-bind='$attrs'></parent-temp>

$listeners 子组件中获取父组件传递的所有的事件绑定,包装为对象,key为事件名,value为父作用域的函数,实现跨组件,子组件修改父组件数据.
使用形式:
<son-temp v-on='$listeners'></son-temp>
son的template中: <input type='text' v-on='$listeners'>
```

## provide and inject

```
provide和inject是组件实例的属性
暂时书写形式
provide () {
	return {
	'传递给子组件使用的key值': 本作用域中的值(如:this.message),
	xx:xx
	}
}
暂时书写形式
inject: ['key1','key2']
inject: {
	本作用域中使用key值: {
	from: 父组件中传输使用的key值,
	default() {
		return xxx
		}   //当父组件未传时,使用默认值
	}
}
provide提供的值,可以被所有子组件通过inject获取
```

## slot 插槽

```
1.使用位置: 组件标签中间
<parent-temp>
	插槽模板
</parent-temp>
2.分类
匿名插槽============
<parent-temp>
	xxxx任意值或者标签(所有没有v-slot:标识的标签都被归类为一个匿名插槽)
</parent-temp>
parent-temp组件的template内部使用:
<slot></slot>
具名插槽=============
<parent-temp>
	<template v-slot:插槽名 || #插槽名>
		xxxxxx
	</template>
</parent-temp>
组件template内部使用:
<slot name='插槽名'></slot>
作用域插槽============
<parent-temp>
	<template #插槽名='接收的变量名'>
		{{接收的变量名.key1}} {{接收的变量名.key2}}
	</template>
</parent-temp>
组件template内部使用:
<slot name='插槽名' :key1='本作用域data' :key2='本作用域的data'></slot>
3.插槽默认值
<slot>默认值</slot>
```

## 动态组件

```
1.根据数据渲染多个不同组件
<component :is="组件注册名"></component>
2.keep-alive标签 决定是否缓存该标签的信息
<keep-alive>
	<component v-for='xxxx'></component>
</keep-alive>
3.keep-alive属性 :include 设置要缓存的组件     :max 设置最多缓存标签数量
<keep-alive :include='/正则匹配组件注册名/'>
	<component v-for='xxxx'></component>
</keep-alive>
<keep-alive :include='注册名1,注册名2,xx'>
	<component v-for='xxxx'></component>
</keep-alive>
<keep-alive :include='[注册名1,注册名2,xx]'>
	<component v-for='xxxx'></component>
</keep-alive>
如果组件不是在当前组件环境下注册，则通过组件的name属性进行寻找。
被keep-alive的组件有activated和deactivated生命周期
```

## Vue-cli 快速搭建Vue项目环境

```
1.npm i @vue/cli -g
2.vue create 项目名
```

```
单组件原型开发
npm i @vue/cli-service-global -g
vue serve 文件名
```

```
输出一个js文件,显示vue-cli自带的webpack配置
vue inspect > xx.js
```

+ 如果想要自定义webpack配置, 在项目根目录vue.config.js中设置

## 事件总线$bus,发布订阅

总体思路就是:   在Vue原型上挂载一个$bus属性,值为空值的vue实例,这样所有的vm组件都可以访问到它,对他进行绑定和触发自定义事件,从其他组件获取到参数,在自己作用域内进行值的修改

```
Vue.prototype.$bus = new Vue()
$on(事件名,回调函数)
$once(事件名,回调函数) 执行一次后,回调函数移出发布者的数组中
$off(事件名,回调函数) 解绑
$emit(事件名,参数1,参数2..)
```



+ 注意事项 在创建自定义组件时,由于组件会频繁创建,如果不在beforeDestroyed中解绑mounted定义的自定义事件,几次组件创建后,当触发该自定义事件时,就会触发所有在发布者数组中的重复函数.

## Vuex初见 状态管理容器

```
1.npm i vuex@3 因为vue是2.xx版本
2.
import Vuex from "vuex"
Vue.use(Vuex)
let store = new Vuex.Store({
  state: {
    obj: {
      countA: 0,
      countB: 0
    }
  },
  mutations: {
    addA (state) {
      state.obj.countA++
    },
    addB (state) {
      state.obj.countB++
    }
  }
})
new Vue({
  render: h => h(App),
  store
}).$mount('#app')
```

## Vuex 第二天 mutations中必须是同步代码 vuex中数据自响应规则和vue的data中一样  不能直接操作state数据,要通过mutations,统一管理

```
let store = new Vuex.Store({
  state: {
    productInfo: {
      products: [],
      totalNum: 0,
      totalPrice: 0,
    },
    testNum: 0,
    testPrice: 0,
  },
  getters: {
    totalPrice (state) {
      let price = state.productInfo.products.reduce((acc,item) => {
        return acc + item.price
      },0)
      return "$" + price 
    },
    totalNum (state) {
      return state.productInfo.products.length
    }
  },
  mutations: {
    addProp (state) {
      state.productInfo.products[0].name = "hhhh"
    },
    removeProduct (state) {
      state.productInfo.products = []
    },
    add (state) {
      state.testNum++
    }
  }
})
```

> 1.调用mutation并传参
>
> ```
> this.$store.commit(方法名,参数)
> ```
>
> 2.使用getters (getters类似于计算属性)
>
> ```
> this.$store.getters.属性名
> ```
>
> + getters方法可以返回一个方法 接收调用处传入的参数.

> 2.几个vuex内置方法
>
> ```
> 1.import {mapState,mapMutations,mapGetters} from "vuex"
> 特点: 他们都是函数,参数是对象参数,返回值是对象
> 2. state,getters一般在组件computed中使用:
> computed: {
>  ...mapState(["计算属性名同时也是state中的key"])  写法1
>  ...mapState({
>  	计算属性名: "state中的key"
>  })                                          写法2
>  ...mapState({
>     计算属性名: state => {
>     	return xxxx                            写法3
>     }
>  })
> }
> 3. mutations一般在组件method中使用:
> methods: {
> 	...mapMutations(["方法名同时也是mutations中的key"])
> }
> methods: {
> 	...mapMutations({
> 		组件方法名: mutations中的key
> 	})
> }
> ```
>
> 

##   Vuex 第三天   actions 和 store模块化

```
1.actions 书写业务逻辑(可异步),然后调用mutations方法修改数据
```

+ tips: mutations方法全大写

```
2.store仓库模块化
import shop from "./store/shop"
let store = new Vuex.Store({
  actions: {
    addProduct () {
      console.log("我是顶层addProduct");
    }
  },
  state: {
    message: "顶层msg"
  },
  modules: {
    shop(仓库模块名)
  }
})

当子仓库配置对象中没有namespaced为true时,仓库中的方法被合并到顶层仓库,state不会合并.
当子仓库配置对象有namespaced为true时,我们要访问仓库数据时,需要执行仓库
1.  ...mapGetters("仓库名",["xx"]) ...mapGetters("仓库名1/仓库名2",["xx"])
2.  $store.state.仓库名(如果多层仓库则链式选择).数据的key
3.  $store.getters["仓库名1/仓库名2/数据key"]


快捷方法:
import {createNamespacedHelpers} from "vuex"
let {mapState} = createNamespacedHelpers("仓库名")
let {mapState} = createNamespacedHelpers("仓库名1/仓库名2")
```

## Vue-router  第一天

```
1.vue-cli项目中引入vue-router和vuex插件
vue add router
vue add vuex
```

```
2.router基本配置
import VueRouter from "vue-router"
let router = new VueRouter({
  routes: [
    
    {
      path: "/(ho)?me/",
      // component: Home
      redirect: "/user"
    },
    // {
    //   path: "/home",
    //   component: User
    // },
    {
      path: "/user",
      component: User,
      children: [
        // {
        //   path: "/test",
        //   component: Home
        // },
        {
          name: "oneUser",
          path: ":id",
          component: Sign
        },
        {
          name: "test",
          path: "test",
          component: Test,
          // props: true
          // props: {
          //   addr: "zhejiang",
          //   name: "keainie"
          // }
          props: (route) => {
            return {...route.query,...route.params,key1: "testValue"}
          }
        },
        {
          path: "*",
          component: NotFoundUser
        },
      ]
    },
    {
      path: "*",
      component: NotFound
    }
  ]
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
```

```
3. 编程时和声明式 使用router进行跳转
声明式:
<router-link to="/"></router-link>  直接传hash路径
<router-link v-for="user in users" :key="user.uid" :to="{name: 'user',params: {id: user.id}}"></router-link>  动态路由传参
<router-link v-for="user in users" :key="user.uid" :to="{path: `/user/${user.id}`}"></router-link>  动态路由传参

<router-view></router-view> 渲染组件位置
编程式:
this.$router.push("/")
this.$router.push({
	path: '/xx',
	name: 'xxx',
	params: {
	
	},
	query: {
	
	}
})
$router.back()
```

+ path需要包括params,解析了path就不再解析params

+ 动态路由,当属于一个动态路由的多个不同参数值的路由切换,不会重新渲染组件.params参数作为动态路由参数

+ 路由匹配顺序从上往下,匹配之后不再寻找.

+ 路由path可以使用全字符路径,也可以使用正则字符串

+ 限制动态参数的几种方式:

  > ​	path: "/pss/:id?",*
  >
  >    path: "/pss/:id(\\d+)",

```
3.路由嵌套

new VueRouter({
	name: "xxx",
	component: XXX,
	children: [
		{
		路由配置1
		},
		{
		路由配置2
		}
	]
})
```

+ 子路由path开头不能写/, /代表根路径,即#/,直接写要拼接的路径即可

```
4.路由传参
1.直接在router-link上绑定自定义属性传值
2.在router中进行配置，设置props
name: "xxx",
	component: XXX,
	props： Boolean | Function | Object
	children: [
		{
		路由配置1
		},
		{
		路由配置2
		}
	]
布尔值为true,表示将路由跳转时传递的params参数传递给要渲染的组件
为Object时，一般传递静态值，props： {name： "jzs", age： 22}
为Function时，利用回调参数route，混入多个值，传给渲染组件
props： （route）=> {return {...route.params,...route.query,自定义:xxx}}
```

## VueRouter 第二天

```
1. 命名视图 (一个路径生成多个组件)
{
          name: "oneUser",
          path: "all",
          components: {
            default: Default,   //key为视图的name属性值,value为对应组件
            OneUser,
            TwoUser,
            ThreeUser
          }
},
```

+ 没有指定name属性值的router-view的name属性默认值为default

```
2.router-link的属性
append 在当前路径之后追加路径,不用重复写父路由路径
replace 在路径历史栈中替换当前路径为要访问路径,默认是push模式
tag 解析后的标签类型
event 触发的事件,默认是click
active-class 指定非精确激活状态的class名

```

+ 准确激活状态存在exact和普通的class,不准确时只存在普通class.

```
3.redirect和alias
redirect三种写法:
{
    //   path: "*",
    //   component: NotFound,
    //   // redirect: "/home"   1
    //   // redirect:  {
    //   //   path: "/home",       2
    //   //   params: {
    //   //     testParams: "params123"
    //   //   },
    //   //   query: {
    //   //     testQuery: "query123"
    //   //   }
    //   // }
    //   redirect: (to) => {
    //     console.log(to,"to");    3
    //     // return "/home"
    //     return {
    //       path: "/home",
    //       params: {
    //         test: "123"
    //       },
    //       query: {
    //         test: "123"
    //       }
    //     }
    //   }
alias:给一个路由定义别名,当访问该路由别名时,渲染同一个组件.
```

```
4.路由守卫

1.全局路由守卫
router.beforeEach((to,from,next) => {
	next()
})
router.beforeResolve( (to,from,next) => {
	next()
})
router.afterEach((to,from) => {
	
})
```

> - next: Function`**: 一定要调用该方法来 **resolve** 这个钩子。执行效果依赖 `next` 方法的调用参数。
>   - **`next()`**: 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 **confirmed** (确认的)。
>   - **`next(false)`**: 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 `from` 路由对应的地址。
>   - **`next('/')` 或者 `next({ path: '/' })`**: 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 `next` 传递任意位置对象，且允许设置诸如 `replace: true`、`name: 'home'` 之类的选项以及任何用在 [`router-link` 的 `to` prop](https://router.vuejs.org/zh/api/#to) 或 [`router.push`](https://router.vuejs.org/zh/api/#router-push) 中的选项。
>   - **`next(error)`**: (2.4.0+) 如果传入 `next` 的参数是一个 `Error` 实例，则导航会被终止且该错误会被传递给 [`router.onError()`](https://router.vuejs.org/zh/api/#router-onerror) 注册过的回调。
>
> **确保 `next` 函数在任何给定的导航守卫中都被严格调用一次。它可以出现多于一次，但是只能在所有的逻辑路径都不重叠的情况下，否则钩子永远都不会被解析或报错**。`

```
2.路由独享守卫(组件内)
const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
  }
}
```

```
3.路由元信息 meta
{
      path: "/home",
      alias: "/h",
      component: Home,
      name: "home",
      meta: {
        title: "主页"
      },
      children: [
        {
          path: "photo",
          component: Photo,
          meta: {
            title: "个人相册"
          },
          children: [
            {
              path: "child",
              component: Child,
              meta: {
                title: "童年"
              }
            },
            {
              path: "sex",
              component: Sex,
              meta: {
                title: "性"
              }
            }
          ]
        },
        {
          path: "game",
          component: Game,
          meta: {
            title: "游戏"
          }
        }
      ]
    },
```

+ 那么如何访问这个 `meta` 字段呢？

  首先，我们称呼 `routes` 配置中的每个路由对象为 **路由记录**。路由记录可以是嵌套的，因此，当一个路由匹配成功后，他可能匹配多个路由记录

  例如，根据上面的路由配置，`/foo/bar` 这个 URL 将会匹配父路由记录以及子路由记录。

  一个路由匹配到的所有路由记录会暴露为 `$route` 对象 (还有在导航守卫中的路由对象) 的 `$route.matched` 数组。因此，我们需要遍历 `$route.matched` 来检查路由记录中的 `meta` 字段。

> 面包屑案例,通过访问$route.matched中的多个匹配父子路由记录实现.

## Vue过渡 | 动画

```
1.过渡
<transition>
	<p v-if=""></p>
</transition>
默认情况对应的过渡class为
.v-enter .v-enter-active .v-leave-active .v-leave-to
v-enter书写初始渲染状态,enter-active书写变化transition,标签本来类名为最终状态
v-leave-active书写变化transition,v-leave-to书写被删除前状态
当给transition标签设置name时,对应其class名称中的v被替换为name属性值.
当然类名也可以写在transition标签内,比如enter-class,enter-active-class,leave-active-class,leave-to-class
2.动画
  在v-enter-active或者v-leave-active中除了书写transition,也可以加上动画animation属性.
当动画时长和过渡时长不同时,选用最短的时长.设置transition的type属性为animation或者transition
  当使用动态组件或者v-if v-else渲染标签时,可以设置transition的mode属性为out-in或者in-out,使元素的动画按顺序执行.
  transition标签的属性 设置过渡transition时间  :duration="{ enter: 3000, leave: 1000 }"
3.动画过程中的hook
@before-enter="beforeEnter"
@enter="enter"
@after-enter="afterEnter"
@enter-cancelled="enterCancelled"
@leave="leave"
@before-leave="beforeLeave"
@after-leave="afterLeave"
@leave-cancelled="leaveCancelled"
其中enter和leave构造的回调参数中,第一个参数是标签,第二个参数是done函数,如果显示定义接收了他们,必须执行完done函数,过渡效果才结束,移除对应的active类名或者删除dom操作.
4.animate.css
npm i animate.css
import animated from "animate.css"
Vue.use(animated)
<transition enter-active-class="animate__animated animate__swing" leave-active-class="animate__animated animate__backOutDown" name="ani">
      <p v-if="isShow">我是P</p>
    </transition> -->
<transition>
只要在enter-active-class和leave-active-class中书写animate.css中的类名,即可实现相应动画的过渡.
5.transition-group v-move 对列表的增加,换位的操作进行动画监听,删除无法动画
<transition-group
      enter-active-class="animate__animated animate__heartBeat"
      leave-active-class="animate__animated animate__bounceOutDown"
      move-class="move"
    >
      <p v-for="(item, idx) in arr" :key="item" @click="remove(idx)">
        {{ item }}
      </p>
</transition-group>
.move 
  transition: transform 1s;
```

```
1.Nprogress使用
npm install --save nprogress
import NProgress from "nprogress"
import "nprogress/nprogress.css"
NProgress.start();
NProgress.done();
NProgress.inc();
2.gsap使用
npm i gsap
<div id="animated-number-demo">
  <input v-model.number="number" type="number" step="20">
  <p>{{ animatedNumber }}</p>
</div>
new Vue({
  el: '#animated-number-demo',
  data: {
    number: 0,
    tweenedNumber: 0
  },
  computed: {
    animatedNumber: function() {
      return this.tweenedNumber.toFixed(0);
    }
  },
  watch: {
    number: function(newValue) {
      gsap.to(this.$data, { duration: 0.5, tweenedNumber: newValue });
    }
  }
})
3.lodash使用
npm i --save lodash
import _ from "lodash";
```

## element-ui

```
1.在vuecli项目中中导入:
vue add element  注意安装中选项是否覆盖scss文件,选择否,不然会报错.
```

+ 获取element中el-form表单的数据,要在他的父组件上获得.

## 在组件中引入stylus文件使用配置别名

```
vue.config.js:
const path = require("path");
function resolve (dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("views", resolve("src/views"))
    // .set("base", resolve("baseConfig"))
    // .set("public", resolve("public"));
  }
}

<style lang="stylus">
@import '~assets/css/variable.styl';
```

## vuescroll使用

```
npm i vuescroll -S
import Vue from "vue";
import vuescroll from "vuescroll";

// You can set global config here.
Vue.use(vuescroll, {
  ops: {
    // The global config
  },
  name: "myScroll" // customize component name, default -> vueScroll
});



<template>
  <vuescroll> <!-- Your content... --> </vuescroll>
</template>
<script>
  import vuescroll from "vuescroll";

  export default {
    components: {
      vuescroll
    }
  };
</script>

<template>
  <div class="parent-element">
    <!-- bind your configurations -->
    <vue-scroll :ops="ops"> <div class="child-element"></div> </vue-scroll>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        ops: {
          vuescroll: {},
          scrollPanel: {},
          rail: {},
          bar: {}
        }
      };
    }
  };
</script>


<vue-scroll @handle-scroll="handleScroll"> </vue-scroll>
    // ...
    {
        methods: {
            handleScroll(vertical, horizontal, nativeEvent) {
                console.log(vertical, horizontal, nativeEvent)
            }
        }
    }
```

+ 使用条件: vuescroll组件内部容器高度大于vuescroll组件父容器高度

## wangEditor v4 在Vue使用

```
1.npm i wangeditor
2.import wangEditor from 'wangeditor'
const editor = new wangEditor(`#demo1`)
    // 配置 onchange 回调函数，将数据同步到 vue 中
    editor.config.onchange = (newHtml) => {
      this.editorData = newHtml
    }
    // 创建编辑器
    editor.create()
3.
this.editor.txt.html()
this.editor.txt.clear()
```



## $nextTick(cb) $set $forceUpdate

```
1.$nextTick(cb) 用于想获取最新dom的内容,但dom在当次任务中未渲染.相当于setTimeout异步获取
2.$set(对象/数组,属性/idx,初始值) 给vm实例创建自响应的key
```

## .native

```
在组件上绑定原生事件时,想要触发时,需要使用.native修饰.
```

+  JSON.strinfy 清除值为undefined的key 

## window.onload window.onunload window.onbeforeunload

```
1.页面渲染好时触发 load 2.unload 页面标签关闭时触发
```



## live2d

```
1.live-widget (使用简单 使用本地素材文件)
放在vue项目中的public下static文件中,在app.vue中引入js文件,在vue渲染时加入以下代码
```

```
setTimeout(function () {
      window.L2Dwidget.init({
        pluginRootPath: "static/live2dw/",
        pluginJsPath: "lib/",
        pluginModelPath: "live2d-widget-model-z16/assets/",
        tagMode: false,
        debug: false,
        model: {
          jsonPath: "../static/live2dw/live2d-widget-model-z16/assets/z16.model.json"
        },
        display: {
          position: "right",
          width: 300,
          height: 450
        }
      })
    },1000)
```

```
2.live-2d
 1.vue文件中引入live2d.js文件
 2.创建canvas画布,并渲染
 <canvas id="live2d" width="300" height="500"> </canvas>
 loadlive2d("live2d", `${GET_URL}?id=${this.modelId}-${this.texturesId}`);
 3.
 const GET_URL = `https://live2d.fghrsh.net/api/get/?id=${this.modelId}-${this.texturesId}`;  切换模型和衣服
 const MODEL_URL = `http://api.fghrsh.net/live2d/switch/?id=${this.modelId}`; 获取新模型id
 const TEXTURES_URL = `https://api.fghrsh.net/live2d/rand_textures/?id=${this.modelId}`; 获取同一模型的新衣服id
```

## WEbSocket 有状态持续通信协议

```
1.客户端与服务器端双向通信
客户端（vue）
this.ws = new WebSocket("ws://127.0.0.1:8888")
    this.ws.addEventListener("message",(event) =>{
      console.log(event.data,"event")
      this.serverMessage = event.data
    })
    this.ws.addEventListener("open",(e) => {
      console.log("客户端连接",this.ws.readyState,e);
      this.ws.send("hello server")
    })
    this.ws.addEventListener("close",function (ws) {
     console.log(e,"客户端关闭连接");
    })
服务器端
let WebSocket = require("ws").Server
let server = new WebSocket( {port: 8888})
server.on("connection",function (req) {
  console.log("服务器连接");
  req.on("message",function (msg) {
    console.log("msg",msg);
    req.send(msg + "123")
  })
})
```

## 代理服务器

```
vue.config.js文件中配置
module.exports = {
  configureWebpack: {
    devServer: {
      proxy: {
        "/api": {
          context: ['/auth', '/api'],
          target: "http://127.0.0.1:3000",
          // changOrigin: true,
          // pathRewrite: {
          //   "^/api": ""
          // }
        }
      }
    }
  }
}
```

## 项目优化webpack配置

```
1.publicPath (打包出来的文件的路径)
为"",代表使用相对路径
module.exports = {
  parallel: false,
  publicPath: "",
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin).end();
    }
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("views", resolve("src/views"))
    // .set("base", resolve("baseConfig"))
    // .set("public", resolve("public"));
  }
}
```

```
2.查看打包各个文件大小
npm i webpack-bundle-analyzer -D
if (process.env.NODE_ENV === 'production') {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin).end();
    }
```

```
3.vant element-ui局部引入
"plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ],
     ['import', {
       libraryName: 'vant',
       libraryDirectory: 'es',
       style: true
     }, 'vant']
  ]
```

## webpack 优化

```
1.lodash按需引入
npm i lodash-webpack-plugin babel-plugin-lodash -D
1)babel.config.js配置
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ],
    [
      "lodash"
    ]
    // ['import', {
    //   libraryName: 'vant',
    //   libraryDirectory: 'es',
    //   style: true
    // }, 'vant']
  ]
}
2) vue.config.js配置
module.exports = {
  parallel: false,
  publicPath: "",
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin).end();
      config.plugin("lodash-webpack-plugin").use(require("lodash-webpack-plugin"))
    }
    config.optimization.minimize(true)
    config.externals({
      'wangeditor': 'wangEditor',
      'vue': 'Vue',
    })
    config.plugins.delete("prefetch")
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("views", resolve("src/views"))
  }
}
```

```
2. js文件压缩
npm i compression-webpack-plugin@5 -D
在vue.config.js中配置:
const CompressionPlugin = require("compression-webpack-plugin");
configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new CompressionPlugin({
            test: /\.js$|\.css$|\.html$/,
            algorithm: 'gzip',
            threshold: 10240,
            deleteOriginalAssets: false,
          })
        ]
      }
    }
  }
```

```
3.打包排除,使用cdn引入
    //压缩代码
    config.optimization.minimize(true)
    config.externals({
      'wangeditor': 'wangEditor',  key是包名,value是导入变量名
      'vue': 'Vue'
    })
```

```
4.组件按需引入
router.js中:
const Column = () => import( /* webpackChunkName: column*/ '@/views/Column.vue')  column是单独打包js文件名
component: Column
vue.config.js中配置:
防止静默加载:  config.plugins.delete("prefetch")
```



