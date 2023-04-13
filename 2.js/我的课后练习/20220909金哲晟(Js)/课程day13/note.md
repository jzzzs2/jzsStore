# 字符串的方法

> 1. charAt(index)
>
> ```
> var str = "acfsad";
> str.charAt(1) // “c“
> str.charAt(100) // ""
> ```
>
> 2. indexOf(字符串,寻找起始位置)  找到并返回该字符串首字的索引
>
> ```
> var str = "好吃么好吃的好吃嘎好吃么好吃哈哈";
> str.indexOf("好吃的") //3
> ```
>
> ```
> 搜索字符串值默认为"undefined",起始位置小于0,从头开始找,起始位置大于长度,则找不到返回-1
> ```
>
> ```
> 特例: 寻找"",起始位置大于长度,返回数组长度。起始位置为负,返回0
> ```
>
> 3. split(分隔符,数组最大长度), 返回一个根据分隔符分开的字符串数组
>
> ```
> split("") 则将每单个字符都作为数组元素
> split() 不进行分割,将整个字符串作为数组的唯一字符串元素。
> ```
>
> 4. slice 和数组方法同
> 5. trim() 清除字符串左右两边的空字符

## javascript函数

> 1. 声明式定义,表达式定义
> 2. typeof 函数么 === "function"
> 3. 不写return和return; 返回undefined
> 4. 函数形参不传参,调用时,函数内该形参为undefined
> 5. return 是函数内部执行的结束,之后代码不再执行。

##  函数内对象 arguments

> arguments是函数实参组成的伪数组,可以赋值,改变length,但是不能使用数组的方法。

## 匿名函数自调用

> (function() {})();  
>
> (function() {} ());

## 函数注释

> 快捷键 ctrl+alt+m

```
"fileheader.cursorMode": {
    "description": "",
    "param": "",
    "return": "",
    "Date": ""
  }
```

## 作用域(重要捏)

> 1. script标签中是全局作用域,函数体中是局部作用域.
> 2. 作用域是单向访问,只能内作用域往外作用域访问,不能外向内访问.
> 3. 私有变量,是指在当前作用域内声明的变量,是当前作用域的私有变量.
> 4. 调用或者赋值 未声明变量(非私有变量), 会向外作用域寻找声明该变量的位置,直到全局作用域(如果全局作用域也没有,则在全局作用域隐式声明)
> 5. 变量访问和使用,优先使用自己作用域内的私有变量,找不到再向外寻找.
>    + 以目前知识来说,只有函数内部是局部作用域,其他控制流程的{}都不是局部作用域.
>    + Js中作用域是静态的,函数内变量的指向从声明时就确定了,不会动态变化.

## 作用域链(函数 套 函数)

```
function getAll() {
	function getSum() {
	
	}
}
```

## 预解析

> 1. 把变量声明 提升到当前作用域的最前,赋值不变.
> 2. 把函数声明提升到当前作用域的最前,不会提升调用.
> 3. var 比 function 优先级更高.
>    + 同一作用域,相同变量占有相同内存空间,变量和函数重名,函数覆盖变量.
> 4. 按顺序执行 执行代码.
> 5. 对于局部作用域,需要等到它执行时,再解析,它不使用解析没有意义.

### 特殊.对于函数的形参在作用域中的理解

```
function getSum(all) {
	function all() {}
	all //函数体
}
getSum(22);
执行顺序: 1. var all = 22;
       	2.变量,函数提升.
```

## 创建对象的四种方式

> 1. 字面量
>
>    ```
>    var obj = {}
>    ```
>
> 2.  原生对象实例化
>
>    ```
>    var obj = new Object()
>    ```
>
> 3. 工厂函数
>
>    ```
>    function createPerson(age, name) {
>    	var arr = new Object();
>    	arr.age = age;
>    	arr.name = name;
>    	arr.eat = function() {
>    		console.log("吃饭了");
>    	}
>    	return arr;
>    }
>    ```
>
> 4. 自定义构造函数
>
>    ```
>    function Teacher(age, name, sex) {
>    	this.age = age;
>    	this.name = name;
>    	this.sex = sex;
>    	this.eat = function() {
>    		console.log("吃饭了捏")
>    	}
>    }
>    var tc = new Teacher(22, "jzs", "man");
>    ```
>
>    

## this的几种指向

> 1. 在全局作用域下,指向Window对象
>
> 2. 在构造函数内部,指向实例化的对象.
>
> 3. 在普通函数内部,this指向调用该函数的对象.如果没有调用该函数的对象,则函数中的this指向window对象
>
>    ```
>    function eat() {
>    	console.log(this)
>    }
>    eat(); //window
>    ```
>
>    

## 包装对象和基本数据类型

> 为了节约空间,基本数据类型在作为数值/字面量时,不会进行包装,在需要调用方法,或者属性的时候,创建一个包装对象,把基本数据类型作为参数传入,在调用完方法或者属性之后,再销毁这个包装对象.
>
> ```
> var str = "22";
> console.log(str.length) //2
> 其实进行了以下工作:
> var obj = new String(str);
> console.log(obj.length); //2
> obj = null;
> ```
>
> 

## instanceof 使用

> 判断某对象是否是某个构造函数创建的
>
> ```
> new String("abc") instanceof String //true
> ```
>
> 
>
> 

## Json数据类型 json的序列化和反序列化

> JSON.stringify(对象数组)     返回字符串
>
> JSON.parse(字符串)             返回对象数组

## new 做了什么

> 1. 在函数体内部声明了一个空对象
> 2. 并且使得内部this指向了这个空对象.
> 3. 最后return 返回了这个对象.

## 关于对象的操作

> 删除对象某属性 delete obj.age 

> 遍历一个对象
>
> ```
> for(var key in obj) {
> 	console.log(key + "|" + obj[key]);  key是string类型
> }
> ```
>
> 

> 获取对象中值的两种方式
>
> 1. obj[key的字符串]
>
> 2. obj.key值
>
>    ```
>    var obj = {
>    	name: "jzs",
>    	age: 22
>    }
>    var realName = "name"
>    obj["name"] //"jzs"
>    obj[realName] //"jzs"
>    obj.name // "jzs"
>    obj.realName //undefiend
>    通过对象.属性的方式获取值,属性不能写变量,变量名会被当做是对象的key值.
>    通过对象[key字符串]的方式获取值,在[]中可以使用变量,也可以直接写字面量字符串值.
>    ```
>
>    