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
<数据类型>params     <string>str 
params as 数据类型   str as string
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

## 接口 interface

```
1.接口对对象的约束
interface IPerson {
  readonly id: number
  name: string
  age: number
  sex?: string
}
2.接口对函数约束
interface Func {
	(参数名1:数据类型,参数名2:数据类型,...):返回值类型
}
3.对类约束,类实现接口
interface IAnimal {
      eat() :void
      sleep() :void
}
class Animal implements IAnimal{
	eat(){
	},
	sleep(){
	}
}
一个类可以实现多个接口,为了方便书写,可以让一个接口继承多个接口,再由类实现这一个接口.
```

## 类

```
1.类继承类只能单继承,extends
2.子类对象初始化数据调用父类构造方法 super(参数1,xxx),也可以super.方法() 调用父类方法
3.子类可以重写父类方法
```

```
多态: 父类引用指向子类对象
let animal :Animal = new Cat()
let animal1 :Animal = new Dog()
animal.eat("fish")
animal1.eat("bone")
```

```
成员修饰符(类中 属性 构造函数 方法的可访问 ): public(默认) protected private
public 在子类,类外,类内都可访问
protected 在子类,类内可访问
private 在类内可访问
```

```
readonly修饰类的属性
1.直接在类内定义时修饰
class Person {
  readonly name: string = 'abc'
  constructor(name: string) {
    this.name = name
  }
}

let john = new Person('John')
// john.name = 'peter' // error
2.在构造函数参数上修饰,修饰后,不用手动进行类内定义和赋值操作.
class Person2 {
  constructor(readonly name: string) {
  }
}

const p = new Person2('jack')
console.log(p.name)
```

```
存取器:

类中声明get和set方法

class Person {
  firstName: string = 'A'
  lastName: string = 'B'
  get fullName () {
    return this.firstName + '-' + this.lastName
  }
  set fullName (value) {
    const names = value.split('-')
    this.firstName = names[0]
    this.lastName = names[1]
  }
}

const p = new Person()
console.log(p.fullName)

p.firstName = 'C'
p.lastName =  'D'
console.log(p.fullName)

p.fullName = 'E-F'
console.log(p.firstName, p.lastName)
```

```
静态成员
通过类名.属性(方法) 方式调用
```

```
抽象类: 为子类服务,提供公共方法和diy抽象方法,不能实例化
abstract class Animal {
  abstract cry ()
  run () {
    console.log('run()')
  }
}
```

## 函数

```
1. 可选参数 默认值参数 剩余参数
function  test(params?:string = "jzs") {
	
}
function  test(params:string = "jzs",...rest :string[]) {
	
}
```

```
2.函数重载
function add (x: string, y: string): string
function add (x: number, y: number): number

// 定义函数实现
function add(x: string | number, y: string | number): string | number {
  // 在实现上我们要注意严格判断两个参数的类型是否相等，而不能简单的写一个 x + y
  if (typeof x === 'string' && typeof y === 'string') {
    return x + y
  } else if (typeof x === 'number' && typeof y === 'number') {
    return x + y
  }
}
```

## 泛型 声明时不清楚参数的数据类型,使用时定义参数数据类型

```
单泛型参数
function test<K>(value:K,num:number) :K[] {
let arr:K[] = []
       for (let i = 0; i < count; i++) {
         arr.push(val)
       }
       return arr
}
test<number>(2,6)
多泛型参数
function test<K,V,T>(first:K,second:V,third:T) :[K,V,T] {
	return [first,second,third]
}
test<string,number,string>("22",11,"33")
```

+ 当某个数据变量可能为空时报错,在它后面加感叹号

## Vue3项目创建

```
1.vite创建
文档: https://v3.cn.vuejs.org/guide/installation.html
npm init vite-app <project-name>
cd <project-name>
npm install
npm run dev
2.vue-cli创建
## 安装或者升级
npm install -g @vue/cli
## 保证 vue cli 版本在 4.5.0 以上
vue --version
## 创建项目
vue create my-project

```

+ vue3中只需要在script标签上写上setup属性,setup函数即可不用返回值,也可以在模板中直接调用函数和使用数据

## 组合API

```

```

> 1.setup

```
setup函数返回对象,对象中的属性值和方法可以直接在模板中使用.
```

> 2.ref 普通数据类型的响应式

```
let acData = ref(普通数据类型数据)
修改它的值,acData.value = xxxx,在页面上渲染只需要传acData对象
```

```
ref的解包机制:
1)如果ref在模板中作为顶级属性访问,会被自动解包,不用写value
2)如果ref是一个reactive对象的属性被访问,则需要写value
const object = { foo: ref(1) }
{{ object.foo + 1 }}
渲染为 [object Object]1
可以修改为 const { foo } = object {{ foo + 1 }} 结果为2
特殊情况:作为文本插值 {{ object.foo }} 则可以渲染为1
3)ref在响应式对象中的解包
ref作为响应式对象属性,ref被响应式对象访问或修改时自动解包,前提是该响应式对象是深层对象而不是浅层.例外:当ref作为响应式数组或者MAP原生集合类型元素被访问时,不会进行解包.
const books = reactive([ref('Vue 3 Guide')])
// 这里需要 .value
console.log(books[0].value)
```



> 3.reactive 复杂数据类型的响应式,深层响应式

```
let acObj = reactive({name: "jzs", games:["csgo", "world2"]})
acObj.属性 直接操作数据
```

```
对同一个原始对象,创调用多次reactive获得的代理对象是同一对象,对代理对象再次调用reactive返回是自身,保证了代理对象的唯一性.
```



## 动态属性绑定

```
:[变量名]="变量值" <a :[attributeName]="url"> ... </a>
@[事件名]="事件回调函数" <a @[eventName]="doSomething">
对象的所有属性绑定到一个组件上  v-bind="obj"
```

## nextTick

```
import { nextTick } from 'vue'

function increment() {
  state.count++
  nextTick(() => {
    // 访问更新后的 DOM
  })
}
```

## 类名和样式的绑定

```
1.类名
对象形式: <div :class="{类名: 逻辑值,类名: 逻辑值}">
数组形式: <div :class="[值为类名的变量1,xx,xx]">
2.样式
对象形式: <div :style="{backgroundColor: 变量1}"
数组形式: <div :stlye="[包含样式的对象变量1,包含样式的对象变量2]">
```

## v-if v-for

```
1.v-if和v-for同时使用的时候,v-if优先级更高,所以v-if无法使用v-for中的item或者idx等其他变量
```

## 模板引用

```
标签上ref属性和存放模板对象的变量名相同
1.普通引用
<script setup>
import { ref, onMounted } from 'vue'

// 声明一个 ref 来存放该元素的引用
// 必须和模板里的 ref 同名
const input = ref(null)

onMounted(() => {
  input.value.focus()
})
</script>

<template>
  <input ref="input" />
</template>
2.列表v-for引用
const itemRefs = ref([])
<template>
  <ul>
    <li v-for="item in list" ref="itemRefs">
      {{ item }}
    </li>
  </ul>
</template>
3.函数模板引用
在组件更新时,会执行一次回调函数,传入dom元素作为参数
<input type="text" :ref="(el) => {}" />
4.组件上也可以使用ref
如果组件是选项式 API 或没有使用 <script setup>,则可以获得到组件实例,使用组件实例上的数据
```

## script setup

```
1.<script setup>，导入的组件都在模板中直接可用,不需要注册
```

```
2.传递props
script setup中:
数组写法 const obj = defineProps(['属性值','xx']) //声明的属性值会被暴露给模板
对象写法 const obj = defineProps({
	name: {
	type: String,
	default: "xxx"
	},
	propE: {
	type: Object,
	default(rowProps) {
	//rowProps是所有原始接收的props
		return xxx
	}
	},
	disabled: Boolean

})
非script setup中:
props: {
 xx: {
 type: xx
 }
}
setup(props) {
//因为没有this,此时实例还未创建好
}

```

+ Boolean特殊数据转换,如果props接收一个布尔值变量,外部没传值,只写了该属性名,则为true,如果属性名都没写,则为false

```
3.emit函数
在script setup中:
const emits = defineEmits(["自定义事件名1","自定义事件名2"])
emits("自定义事件名1")
在非 script setup中:
setup(props,ctx) {
ctx.emit("自定义事件名")
}
```

## 动态组件

```
import 组件名1 from "xxxx"
const test = ref(组件名1)
<component :is="test">
```



## 全局注册组件

```
import { createApp } from 'vue'
import MyComponent from './App.vue'
const app = createApp({})

app.component(
  // 注册的名字
  MyComponent
)
```





## vue2 和 vue3 响应式 对比

```
vue2:
1)本质是defineProperty对对象的属性的获取和修改进行监听劫持,进行发布和订阅,数组则是通过重写数组和内部的push等方法实现响应.
缺点: 无法新增/删除响应式属性,无法使用idx等方式修改/新增数组内容
```

```
vue3:
1)本质是通过proxy代理,拦截对data任意属性的任意(13种)操作, 包括属性值的读写, 属性的添加, 属性的删除等...,通过 Reflect(反射): 动态对被代理对象的相应属性进行特定的操作
优点: 可以新增/删除响应式属性,使用idx等方式修改/新增数组内容
```

> 4.setup细节

```
1.执行时间在beforeCreate之前,所有setup方法中this为undefined
```

> 5.setup返回值细节和参数

```
setup不能是async函数,无法识别返回对象
setup中返回的方法和属性最终会和data和methods合并到组件对象上.
setup中方法不能访问data中属性或者methods中方法,methods中的方法可以访问setup中的属性
```

```
setup(props,context) {}
1)props是从父组件中接收的props值的键值对对象.
2)context对象,{attrs,emit,slots} = context
attrs是从父组件中未接收的键值对对象,emit是触发自定义事件的函数,slots包含所有传入的插槽内容的对象, 相当于 this.$slots
```

> 6.ref细节

```
ref内部也可以传入对象,但是对象在内部会被转化为Proxy对象.
const obj = ref({name: "jzs",age: 22})
obj.value.name 
```

> 7.计算属性和监视

```
1)计算属性,watch写在setup中
写法1:只有计算属性 获取的方法
const 计算属性变量 = computed(() => {
	return 其他属性的合并值
})
写法2:有计算属性 获取,赋值的方法
const 计算属性变量 = computed({
	get() {
	return 其他属性的合并值
	},
	set(value) {
	//进行对其他数据的操作
	}
})
2)监视函数,watch写在setup中
写法1:监视单个数据
watch(数据,(new,old) => {
//操作
},{
immediate: true
deep: true
})
写法2:监视多个数据
watch([ref数据,() => reactive数据], values => {
console.log(values)  //最新值的数组
})
写法3: watchEffect
watchEffect(() => {
  //右查询的响应数据会自动被监听到,并且watchEffect初始会执行一次,不用手动配置
},{
  flush: "post"
})
```

+ 侦听响应式对象的值,watch(()=> 响应式对象.属性,()=>{})

> 8.生命周期

```
在vue3中使用vue2生命周期:
beforeCreate() {
    console.log("vue2 beforeCreate");
  },
  created() {
    console.log("vue2 created");
  },
  beforeMount() {
    console.log("vue2 beforeMount");
  },
  mounted() {
    console.log("vue2 mounted");
  },
  beforeUpdate() {
    console.log("vue2 beforeUpdate");
  },
  updated() {
    console.log("vue2 updated");
  },
  beforeUnmount() {
    console.log("vue2 beforeUnmount");
  },
  unmounted () {
    console.log("vue2 unmounted");
  }
Vue3中的生命周期函数:
onBeforeMount(()=> {
      console.log("vue3 onBeforeMount");
    })
    onMounted(() => {
      console.log("vue3 onMounted");
    })
    onBeforeUpdate(() => {
      console.log("vue3 onBeforeUpdate");
    })
    onUpdated(() => {
      console.log("vue3 onUpdated");
    })
    onBeforeUnmount(() => {
      console.log("vue3 onBeforeUnmount");
      
    })
    onUnmounted(() => {
      console.log("vue3 onUnmounted");
    })
```

+ 他们可以同时存在,且vue3语法的生命周期会比vue2..先执行

## 自定义hook

```
1.将功能代码封装为函数在ts中,返回需要的响应数据
2.将响应数据渲染
```

> 9.toRefs

```
将reactive响应式数据,转化为普通对象,value是原先数据的ref对象.
```

> 10.ref获取元素

```
<input ref="xxx">
setup() {
	const xxx = ref<HTMLElement>()
	onMounted(()=> {
	xxx.value && xxx.value.focus()
	})
	return {
	xxx
	}
}
```

> 11.shallowReactive和shallowRef

```
shallowReactive(对象数据) 对象内第一层属性的值修改会及时渲染,内部对象的属性修改不会触发渲染
shallowRef(对象数据) 对象数据在内部不会被reactive成为响应式对象
```

> 12.readonly和shallowReadonly

```
对代理数据(reactive,ref)进行再次包装,获得一个只读的代理数据,readonly是深度只读,shallowReadonly是浅只读
```

> 13.toRaw和markRaw

```
toRaw可以返回一个reactive代理对象的普通对象,作为临时访问使用
```

```
markRaw 可以包装一个普通对象,该对象之后不可成为响应式数据
```

> 14.toRef

```
源响应式对象上的某个属性创建一个 ref对象, 二者内部操作的是同一个数据值, 更新时二者是同步的
const state = reactive({
      foo: 1,
      bar: 2
    })
const foo = toRef(state, 'foo')
```

> 15.customRef

```
返回一个ref对象,自定义控制get,set
const ref = customRef((track,trigger) => {
	return {
	get() {
		track()
		return xx
		},
	set(newValue) {
		trigger()
		}
	}
})
```

## vue3中组件通信

```
1. prop 自定义事件
const props = defineProps(["属性名"])
const emit = defineEmits(["自定义事件名"])
在模板中用emit传递多个参数 @click="emit(['事件名',1,2,$event])"
2. v-model (父子组件状态维持)
本质是给v-model所在组件传递一个modelValue属性和绑定一个update:modelValue自定义事件,且事件的执行函数是获取emit传递的参数对modelValue属性绑定的值进行修改.
相比于vue2,vue3可以给组件绑定多个v-model
<Child v-model:test="dataOne" v-model:shout="dataTwo"></Child>
Child组件中:
let emit = defineEmits(["update:test","update:shout"])
let props = defineProps(["test","shout"])
3. 全局事件总线,mitt插件
npm install --save mitt
import mitt from 'mitt'
const emitter = mitt()
emitter.on('foo', e => console.log('foo', e) )
emitter.on('*', (type, e) => console.log(type, e) )
emitter.emit('foo', { a: 'b' })
4. useAttrs
import {useAttrs} from "vue"
let noUsedProps = useAttrs()
noUsedProps包括了没有被defineProps声明接收的传递进来的属性和事件
5. $parent和ref
ref:
<Child ref="son"></Child>
let son = ref(null) //son.value就是Child组件的实例对象
要想通过son.value修改实例对象数据,需要实例的组件内部对数据进行暴露
defineExpose({
数据key: xxx
})
$parent: (在模板的事件回调中传入)
@click=touch($parent)
let touch = ($parent) => {
 $parent //是父组件实例对象
}
要想通过$parent.value修改实例对象数据,也同样需要实例的组件内部对数据进行暴露
defineExpose({
数据key: xxx
})
6. provide和inject
父组件: 
provide("名称",数据变量)
孙组件:
const 变量 = inject("名称")
return {
	变量
}
7.pinia
import {createPinia} from "pinia"
let piniaStore = createPinia()
const app = createApp(App)
app.use(piniaStore)
option用法:
import {defineStore} from "pinia"
let storeObj = defineStore("标识名",{
	state: () => {
		return {
			arr: [1,2,5,6]
		}
	},
	actions: {
		add(num) {
		this.arr.push(num)
		}
	},
	getters: {
	total(state) {
		xxx
	}
	}
})
setup组合api用法:
import {defineStore} from "pinia"
import {ref,computed} from "vue"
let storeObj = defineStore("标识名",() => {
	let arr = ref([1,2,5])
	let total = computed(() =>{
		return arr.value.reduce(xxxxx)
	})
	let add = (num) => {
		arr.push(num)
	}
	return {
	arr,
	add,
	total
	}
})
8.插槽
匿名插槽:
<template #default>
我是匿名插槽
</template>
<slot></slot>
具名插槽:
<template #msg>
我是具名插槽
</template>
<slot name="msg"></slot>
作用域插槽:
<template #msg="props">
我是作用域插槽
<p v-for="item in props.arr">{{item}}</p>
</template>
<slot name="msg" :arr="arr"></slot>
```

+ 对proxy对象中ref对象进行修改时,不用.value

+ defineStore函数执行完后返回一个store对象,对象上有方法和数据

```

```

## 判断数据类型

```
1.isRef 检查一个值是否为一个 ref 对象
2.isReactive 检查一个对象是否是由 reactive 创建的响应式代理
3.isReadonly 检查一个对象是否是由 readonly 创建的只读代理 
4.isProxy 检查一个对象是否是由 reactive 或者 readonly 方法创建的代理
```

## 遇到的细节

```
input type=checkbox使用v-model="isSelect"绑定,如果isSelect是boolean类型,手动选中和取消表单,会使isSelect值为true和false
```

