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
> 2. ```
> var str = "<p>可爱捏</p>"
> eleObj.innerHTML = str;
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