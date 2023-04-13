## WebApi

> 接口: 函数,数据输入输出通道

## Dom是什么

> 文档对象模型,一套操作页面元素的API,把html当做一个文档树,进行操作.

## Dom名词解释

> 文档-网页
>
> 节点: 网页中的所有内容(包括标签 属性 文本内容 注释 文档 文档声明 片段)

## 操作之获取元素对象

>1. document.getElementById(id名称); 如果有多个,只返回第一个元素对象
>2. document.getElementsByTagName(标签名称) 返回一个包括所有该标签对象的伪数组(没有数组方法,但可以读取length,通过index获取值)
>   + 以下为新方法
>3. (IE9) document.getElementsByClassName(类名)  类名值和标签的class属性中的值一样,多个用空格隔开.
>4. (IE8) document.querySelector(选择器) document.querySelectorAll(选择器)
>
>+ 几个直接获取元素对象的属性
>
>5. document.body  document.title  document.head
>
>+ 注意: 任何节点对象都可以使用get和query系列方法,只是缩小了查找范围.

## 节点对象属性

> 1. ele.title
> 2. ele.src
> 3. ele.innerText 只识别文本,不保存格式
> 4. ele.textContent 只识别文本,保持格式
> 5. ele.innerHTML 可以识别输出标签
> 6. ele.tagName  获取标签名(大写)
> 7. ele.className 获取类名
> 8. nodeList.length
> 9. nodeList[index] === nodeList.item(index)
> 10. ele.attributes 得到一个属性对象

## 获取节点对象属性的两种方式

> ele.属性名 获取的是节点对象的属性值, 是经过处理的,和标签行内样式存在区别, 并且由于它的构造函数是一开始就确定好的,所以无法获取自定义属性名的值.

> ele.getAttribute(属性名) 得到的是标签属性中内容,是由自己书写的,所以也可以获取到自定义属性名的值.

> ele.setAttribute(属性名, 属性值) 设置自定义属性名和值

> ele.hasAttribute(属性名) 查看是否有该属性

## 细节提示

> 1.  false == undefined //false
> 2. 元素对象.style得到的cssOM中只包括行内样,不包括选择器中的页内样式.
> 3. 元素对象.属性名 = 属性值 , 属性值是实际显示的值,而不是标签样式中的值.
> 4. 在获取或者修改元素对象中的多单词属性时, 要使用驼峰命名.

## 获取元素对象所有样式的方法

> 1. window.getComputedStyle(元素对象, null); //返回一个包含所有样式的对象.

## 获取元素对象相关节点的属性

> 1. eleObj.children //返回一个子元素对象的伪数组
> 2. eleObj.childNodes //返回一个子节点对象的伪数组
> 3. eleObj.firstChild //返回第一个节点对象
> 4. eleObj.lastChild //返回最后一个节点对象
> 5. eleObj.firstElementChild //返回第一个元素对象
> 6. eleObj.lastElementChild //返回最后一个元素对象
> 7. eleObj.parentElement //返回父元素对象
> 8. eleObj.parentNode //返回父节点对象
> 9. eleObj.nextSibling //返回下一个兄弟节点对象
> 10. eleObj.previousSibling //返回前一个兄弟节点对象
> 11. eleObj.nextElmentSibling //返回下一个兄弟元素对象
> 12. eleObj.previousElementSibling //返回前一个兄弟元素对象

## 创建节点的两种方式

> 1. ```
>   var oDiv = document.createElement("div");
>   eleObj.appendChild(oDiv);
>   ```
> ```
> 
> ```
>
> ```
> 
> ```
>
> ```
> 
> ```
>
> ```
> 
> ```
>
> ```
> 
> ```
>
> ```
> 
> ```
>
> ```
> 
> ```
>
> 2. ```
>   var str = "<p>可爱捏</p>"
>   eleObj.innerHTML = str;
>   ```
> ```
> 
> ```
>
> ```
> 
> ```
>
> ```
> 
> ```
>
> ```
> 
> ```
>
> ```
> 
> ```
>
> ```
> 
> ```
>
> ```
> 
> ```

+ tip: 当你通过innerHTML修改了某元素对象内部后,之前获取的该元素对象的内部(元素/节点)对象消失.无法对它进行操作.

## 拷贝和插入节点 替换节点 删除节点

> 1. ele.cloneNode()  
>
>    ```
>    ele.cloneNode() //只拷贝ele元素对象,不拷贝ele元素里面的元素对象
>    ele.cloneNode(true) //不仅拷贝ele元素对象,也拷贝ele元素内部的元素对象
>    ```
>
> 2. parentEle.insertBefore(替换节点对象, 被替换节点对象)
>
> 3. parentEle.replaceChild(替换节点对象, 被替换节点对象) 如果替换节点对象已经存在,则剪切该节点对象,覆盖被替换节点对象
>
> 4. parentEle.removeChild(删除节点对象)   h5写法: ele.remove() 删除自己

## 节点检查 has系列

> 1. ele.hasAttributes() // 如果该元素对象有标签属性,则返回true
> 2. ele.hasAttribute(属性名)  //如果该元素对象有指定标签属性,返回true
> 3. ele.isEqualNode(ele) //两个节点对象是不是同一个
> 4. ele.hasChildNodes()  //元素对象是否有子节点对象

## 减少重绘 document.createDocumentFragment()

> ```
> var container = document.createDocumentFragment();
> 循环多次 container.appendChild(元素对象);
> 父元素对象.appendChild(container);
> ```
>
> 

## 事件初见

> 1. 事件绑定: 给元素对象的事件属性赋值回调函数,回调函数有事件参数event,包含事件的信息
>
> ```
> ele.onClick = function(e) {
> 	e.target; //触发事件所在的标签
> 	e.type; //触发事件的类型
> 	e.pageX; //触发点在视口中的x坐标
> 	e.pageY; //触发点在视口中的y坐标
> 	this //指向触发的元素对象
> }
> ```
>
> + 鼠标事件: onclick
> + 键盘事件: onkeydown  onfocus onblur
> + 页面事件: onload  onabort onerror

+ 细节: input元素对象是单标签,虽然有innerText属性,但内容存放在value属性中,双标签没有value属性

## 轮转法替代循环

> 用全局变量index代表当前css效果所在位置, 进入循环时,将index所在位置css样式清空,将未来css效果位置赋值给index,给未来css效果位置添加样式.

## 事件委托

> 利用了事件绑定的回调函数在 冒泡阶段执行,需要对多个子元素进行事件绑定时,可以对他们的父元素进行事件绑定,然后通过e.target获取触发子元素.

## 事件阶段

> 1. event.eventPhase     三个阶段: 捕获,当前目标,冒泡.(绑定事件的回调函数在冒泡阶段执行).

## 阻止冒泡 阻止默认行为

> ```
> 阻止冒泡  event.stopPropagation()
> ```
>
> ```
> 阻止默认行为 event.preventDefault() 或者 在事件绑定的回调函数中return false
> ```
>
> + 对于a标签,可以href = "javascript:;" 将a标签行为托管给js,也可以实现阻止默认行为.

## 事件解绑

> 给元素对象的事件属性赋值为null
>
> ```
> ele.onclick = null
> ```
>
> 

## 键盘事件

> 1. onkeydown 键盘按下瞬间,执行回调函数
> 2. onkeyup 键盘抬起时,执行回调函数
> 3. onkeypress 键盘按下并抬起,执行回调函数.不能响应中文
> 4. oninput 有内容输入时,执行回调函数
> 5. onchange 当内容发生改变,且焦点从有变无时,执行回调函数

## 鼠标事件

> onmouseover onmouseout

## 事件监听

> 1. addEventListener("事件",回调函数,布尔值)  默认情况是false,设置true表示回调函数执行在事件捕获阶段.
> 2. removeEventListener("事件,回调函数名")

> IE9兼容
>
> 1. attachEvent("on事件",回调函数)
> 2. detachEvent("on事件",回调函数)

+ 相比于属性绑定,监听的优势在于可以在一个dom元素一个事件上绑定多个回调函数,并且可以设置回调函数的执行时期,不过监听方法在解除绑定时,无法解除匿名函数,需要我们自己封装方法实现. 另外attachEvent回调函数内this指向window,addEventListener内this指向绑定的元素对象.

## 定时器

> ```
> var order = window.setTimeout(function(){},时间间隔) 内部this指向window
> var order = window.setInterval(function(){},时间间隔) 内部this指向window
> clearInterval(order)
> clearTimeout(order)
> 回调函数和元素绑定事件一样,可以是匿名函数也可以是函数名.
> ```
>
> + 倒计定时器和循环计时器,返回值order作为同步任务进入执行栈,然后按时间间隔把回调函数任务放入任务队列,回调函数当做是异步任务,必须在同步执行完毕后执行.  同步任务有阻塞时,异步任务不会停止放入任务队列, 同理,如果异步任务内部执行时间过长,后面的异步任务执行时间会受到影响.
>
> ![定时器同步异步图](D:\十字波\2.js\我的课后练习\20220924金哲晟(Js)\定时器同步异步图.png)

> setTimeout实现 每个任务执行间隔相等
>
> ```
> function myInterval(t, fn) {
> 	function setTime(t, fn) {
> 		setTimeout(function(){
> 			fn();
> 			setTime(t, fn);
> 		}, t)
> 	}
> 	setTime(t, fn);
> }
> ```
>
> 

## 鼠标事件对象属性

> 1. pageX pageY 以文档document左上角为起点.坐标表示
> 2. offsetX offsetY 以事件目标元素对象的内容左上角(content+padding)为起点
> 3. clientX clientY 以视口左上角为起点.
> 4. screenX screenY 以屏幕左上角为原点
> 5. layerX layerY 以定位父级内容左上角为起点

## 视口属性

> 1.window.innerWidht window.innerHeight 包括border,滚动条的视口宽度和高度
>
> 2.window.outerWidth window.outerHeight 包括工具栏,控制台的宽和高
>
> 3.document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset   文档顶部到视口顶部的距离
>
> 4.window.screenLeft || window.screenX window.screenTop || window.screenY 视口距离显示器左上角的距离

## 元素属性

> 1. clientWidth clientHeight 元素content+padding的宽度和高度
> 2. offsetWidth offsetHeight 元素包括border,滚动条的长度和高度
> 3. clientTop clientLeft 上边框和左边框的厚度
> 4. offsetTop offsetLeft  元素距离定位父级内容(border+padding)左上角的坐标
> 5. offsetParent 获取定位父级.

## scroll系列

> 1. scrollHeight 表示内容高度,包括溢出内容,padding,不包括边框
> 2. document.body.scrollHeight  / document.documentElement.scrollHeight

## 元素对象.getBoundingClientRect() 

> 获取一个元素对象相对于视口的距离,和自身宽高.

## 防抖节流

> 节流  理解为技能CD
>
> ```
> 1.时间戳
> 2.定时器
> 3.束流 同一定时器,不同元素分配不同速度
> ```
>
> 防抖 理解为重置平A  在触发事件后,必须等它一段时间再执行,如果在这段时间再次触发,等待时间重置
>
> ```
> 输入框连续输入,不执行翻译操作,停止输入一小段时间,执行翻译操作
> ```
>
> 

## 事件补充

> 1. scroll 滚动条滚动, 元素对象内容发生滚动触发,手动修改scroll值,也会触发该事件,赋值时,不用加px单位.
> 2. mousewheel 鼠标滚轮事件 e.wheelDelta 正负代表了 是向上滚还是想下滚

## 自定义滚动条案例知识点

> 窗体高度 / 内容高度 = 滚动轴高度 / 滚动条高度
>
> (内容高度 - 窗口高度)  /  (滚动条高度 - 滚动轴高度)   为内容移动相对于滚动条比例

## 开关属性 checked disabled readOnly

> 对input设置开关属性时,有两种方式,一般用 元素对象.属性 = true,而不是用 setAttribute方式,因为setAttribute方式设置,无论值是什么,开关属性都生效,无法失效, 对象.属性方式可以设置该属性开启或者不开启.

## 阻止input框选中的默认样式

> 虽然表现上input框无法选中,但是选中该元素后,该元素的checked属性值为true

## textarea注意点

> value innerHTML innerText 三个属性都可以修改他的值.
>
> 但是innerText无法获取他的值, innerHTML只能获取初始设置值, value可以获取动态值.

## 动态添加dom

> 添加元素时,可以临时寻找条件元素是否存在,作为是否添加元素的条件.

## 放大镜案例

> (大图宽度 - 放大区宽度 ) / (小图宽度 - 蒙版层宽度) 比例为 对应小图1px 大图应移动的像素数

##  scrollIntoView()

> ele.scrollIntoView(boolean) 使滚轮 滚到对应元素位置, 参数默认为true,表示与浏览器上部对齐,false则在视口居中.







# Bom

>Bom中的document
>
>document.referrer 获取  跳转过来的页面的地址
>
>document.title
>
>document.lastModified  上次修改时间的字符串. 
>
>document.URL 可读写
>
>

## location对象

> 1. 属性
>
>    ```
>    location.href 当前页面地址栏完整的URL
>    location.host URL的主机名和端口
>    location.hostname URL的主机名
>    location.port URL使用的端口
>    location.pathname URL的资源路径
>    location.protocol URL的协议
>    ```
>
> 2.  方法
>
>    ```
>    location.reload(true | false) 代表是否从服务器读取数据,不是则从缓存中获取数据.
>    location.assign(地址);
>    location.replace(地址);
>    添加合并资源路径
>    ```
>
>    

## navigator对象

> 1. 属性
>
>    ```
>    navigator.appName
>    navigator.connection
>    navigator.cookieEnabled
>    navigator.language
>    navigator.product
>    ```
>
>    

## history对象

> 当前同类型地址历史记录
>
> 1. 属性
>
>    ```
>    history.length
>    ```
>
> 2. 方法
>
>    ```
>    history.back()
>    history.forward()
>    history.go( -|+ num) 表示向前后移动几次.
>    ```
>
>    

## Screen对象 显示器信息

> 1. 属性
>
>    ```
>    screen.height
>    screen.width
>    ```
>
>    

## window方法

> ```
> 1. window.print() 打开打印服务
> 2.window.close() 关闭当前页面
> ```
>
> 

## Uri编码的方法

> ```
> 编码 encodeURI("你好");
> 解码 decodeURI("符号码");
> ```
>
> 

## 正则表达式

> 作用: 匹配文本 字符串

> 1. /abc/.test("abc") //true  完全匹配
> 2. /A|B|C/.test("Asg") //true 或匹配

### 元字符 一类数据的标识符

> 1. \d 代表 0-9
>
> 2. \D 代表 0-9以外的字符
>
> 3. \w 代表 字母数字下划线
>
> 4. \W 代表 数字字母下划线以外
>
> 5. \s 代表空白符
>
> 6. \S 代表空白符以外的字符
>
> 7. \b 代表字符边界 表示他旁边的字符已经是整个字符串的两端中的一端
>
> 8. \B 代表非字符边界
>
> 9. \n 代表匹配换行符
>
> 10.  . 代表匹配任意字符
>
> 11. 转义字符:对正则的保留字进行转义使用
>
>     + ```
>       \\  \/  \*  \+  \?  \!  \[\]   \{\}  \^  \$  \- 
>       ```
>    ```
> 
>    ```
>
> ```
> 
> ```
>
> ```
> 
> ```

### 量词 对一类字符进行指定数量

> 1. ```
>   n{a,b} 匹配数量至少为a或者至多为b的n序列字符串
>   n{a,} 匹配数量至少为a的n序列字符串
>   n{a} 匹配数量为a的n序列字符串
>   ? 0个或者一个 模糊匹配 
>   ```
> ```
> 
> ```
>
> ```
> 
> 2. ```
> n+ n类型字符存在 1个或者多个
> n* n类型字符存在 任意个
> ```
> ```
> 
> 3. ```
> ^n 以n类型字符开头
> n$ 以n类型字符结尾
> ```
> ```
> 
> ```

## 字符簇 []   -

> 1. ```
>   [abc] 代表匹配a,b,c中任意一个
>   [^abc] 代表匹配除了a,b,c外任意一个
>   ```
> ```
> 
> ```
>
> ```
> 
> 2. ```
> -,用于连接有序序列的两端值,代表一个数据范围 [1-9a-zA-Z]
> ```
> ```
> 
> + 匹配汉字 /[\u4e00-\u9fa5]/
> ```

### 修饰符 g i m

> /XX/g 表示全局匹配
>
> /XX/i 表示匹配模式忽略大小写
>
> /XX/m 执行多行匹配

## 字符串的方法

> 1. match
>
>    ```
>    str.match(/xxx/)  返回对应匹配项的伪数组  如果在匹配项上加上()子组,非全局匹配下也会返回子组字符.
>    ```
>
>    
>
> 2. replace
>
>    ```
>    str.replace(/xx/,function (item,index) {
>    	//item 匹配值
>    	//index 匹配值开头在str中的index
>    	return xx;
>    	//xx作为替换值
>    })
>    ```
>
>    
>
> 3. split
>
>    ```
>    str.split(/xx/);
>    ```
>
>    
>
> 4. search
>
>    ```
>    str.search(/XX/) 找到第一个符合要求匹配值的index
>    ```
>
>    

## 正则的方法

> 1. test
>
>    ```
>    正则表达式.test(str) 返回布尔表示是否存在符合匹配的字符
>    ```
>
>    
>
> 2. exec
>
>    ```
>    全局匹配正则的变量.exec(str)  返回第一个符合条件匹配值,连续调用,会记忆之前的位置,从该位置之后进行匹配查找.
>    ```

## 懒惰 贪婪模式

> 默认情况是贪婪模式,在可以取得值中取最多.
>
> 在数量符号后写?,表示开启懒惰模式,在可以取得值中取最少.

## 正向预言(?=) 正向否定预言(?!)  负向预言 (?<=)  负向否定预言 (?<!)   不会返回预言值

> ```
> "window8 window10".match(/window(?=8)/)  //返回window8的window
> "window8 window10".match(/window(?!8)/)  //返回window10的window
> "海牙".match(/(?<=海)牙)/) //返回牙
> "海2牙".match(/(?<!海)牙/) //返回牙
> 
> ```

## $1 $2 代表子组1的值 子组2的值

> ```
> var str = "a123bcb123";
> console.log(str.replace(/(c)|(\d{3})/g, "$1o$2"));
> ```
>
> 

## 捕获和非捕获 :?

> 分组中使用  (?:\d)
>
> 在str.match(reg)  reg非全局匹配时,有分组是非捕获状态时,他不会被返回.

## 循环 reg(全局匹配).test(str)  lastIndex问题

> 可类比 在字符串中寻找出某重复字符的位置 多次使用indexOf,起始位置为上一次找到字符位置+1

> ```
> var arr = [
>       'a.jpg',
>       'b.jpg',
>       'c.jpg',
>       'd.jpg'
>     ];
>     var reg = /\w{1}\.jpg/g;
>     for (var i in arr) {
>        console.log(reg.lastIndex);
>        console.log(reg.test(arr[i]));
>     }
> ```
>
> 通过test匹配成功一次后,下一次匹配位置从上一次成功位置+1开始,会匹配失败.

## h5方法

> ele.dataset.property = 属性值
>
> ```
> 1. 需要元素的属性为 data-property = "xxx"
> ```
>
> 

## new对象创建正则对象

> 1. 需要注意传入参数不带/ /
>
> 2. 并且如果参数是在js中产生,"\ "会被当做转义字符,比如
>
>    ```
>    var regExp = new RegExp("\d");
>    console.log(regExp.test("d")); //true
>    console.log(regExp.test("2")); //false
>    ```
>
>    

## cookie

> 保存用户状态信息,保存在本地对应域名硬盘中,访问相同域名时,会查找对应cookie.cookie默认保存时间是直到浏览器关闭.

> 书写格式
>
> ```
> document.cookie = "key=value;expires=xxxxx"
> ```
>
> ```
> 设置cookie保存时间:
> var date = new Date();
> date.setTime(date.getTime + time);
> date.toUTCString()
> ```
>
> 

## 严格模式

> 在当前作用域顶部写上 "use strict",不建议写在script标签顶部,合并文件会出错,建议在全局执行一个自调用函数.自调用函数内部声明严格模式
>
> 1. 变量必须声明后再使用
> 2. this指向默认不是window,而是undefined











### ES6

### let const

> 1. let
>
>    ```
>    特性:
>    1.必须先声明再调用
>    2.不能在同一作用域声明重复变量(不管声明方式是什么)
>    3.没有变量提升
>    4.在一个作用域中,如果要使用let声明的变量,必须在他声明之后使用,存在死区.(一个作用域中let声明的变量会被绑定在这个区域,如果要使用这个变量,不会向外寻找)
>    5.开启块级作用域 {}
>    ```
>
> 2. const 
>
>    ```
>    特性:
>    1.声明的同时必须赋值.(一般赋值一个可读属性值)
>    2.声明赋值之后不能再修改值.(可以修改引用类型内部值)
>    3.具有let的所有特性(重复声明 先声明再调用 开启块作用域,绑定变量)
>    ```
>
>    + const变量名一般全部大写,多个单词用_隔开

### 块作用域 

> 1. 函数中
> 2. { }里面
>    + 函数在除了函数内部,全局作用域,在块级作用域内声明,会被浏览器js解释器解释为var 声明方式,会提升变量到当前作用域头部.