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