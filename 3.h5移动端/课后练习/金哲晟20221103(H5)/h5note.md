# HTML5

### 定义

```
应用超文本标记语言（HTML）的第五次重大修改
```

## 新增语义化标签

```
1. <header>
2. <nav>
3. <main>
4. <section>
5. <article>
6. <aside>
7. <footer>
```

## 媒体元素标签

```
<video src controls></video>
<audio src controls></audio>
```

## H5中新增全局属性

```
1. contenteditable 规定内容是否可编辑
2. data-自定义属性名  可以通过 元素.dataset.自定义属性名 获得属性值,也可以设置dataset的自定义属性名的值,可读可写.
3. hidden 设置内容隐藏
4.draggable 规定元素是否可拖动
5.dropzone 在拖动元素时,是否可以复制,移动,链接
```

## H5中新增功能标签

```
1. <mark>222</mark> 突出显示文本
2. <meter low high value min max></meter>  图像占比用表示程度 如果设置了min,max,value就用正常整数,如果没有,value就使用小数表示百分比
3. <output></output> 表示输出,语义化标签
4. datalist 下拉列表加强版,可以自定义输入
<input type="text" list = "city">
<datalist id="city">
<option value="001">上海</option>
<option value="002" label="北京">
<option value="003" label="广州">
</datalist>
5.<progress value="22" max="100"></progress>
6.<ruby>被注释内容<rt>注释内容</rt></ruby>
7.<time datatime="2022-11-02">普通的一天</time> 语义化,苹果设置提醒日程.
8. <wbr>不可截断内容<wbr>  work breaking opportunity 控制换行时机,不会截断一些连续字符.
在css中可以设置content为 attr(标签属性) 来获取标签中该属性的值.
```

## 表单类型新增

```
1.input type=color 色盘
2.input type=number
3.input type=month
4.input type=range 拖动条
5.input type=week
6.input type=emai
7.input type=date
8.input type=datetime
9.input type=datetime-local
10.input type=search
11.input type=time
12.input type=tel
```

## 表单属性复习和新增属性

```
1. placeholder 表单默认值
2. autofocus 自动聚焦在某个input
3. multiple 可选择多个文件  文件input元素有files属性,是一个类数组对象,保存了每个文件信息.
4. form 指定提交数据给哪个表单 form(表单id值)
5. pattern 设置验证信息的正则
6. required 必须填写的内容
7.accept 设置接收图像的格式 accept="image/*"
以下为旧属性
7. diabled 禁止输入
8.maxlength
9.readonly
```

## H5新增DOM API

> 获取元素

```
1.document.getElementsByClassName(类名)
2.document.querySelector()
3.document.querySelectorAll()
```

> 类名操作

```
ele.classList.add(className);
ele.classList.remove(className);
ele.classList.contains(className);
ele.classList.toggle(className);
```

> 插入元素

```
1. child.after(ele,ele)
2.child.before(ele,ele)
```

> 替换元素

```
1. child.replaceWith(ele)
```

> 删除元素

```
1. ele.remove();
```

> 追加元素 append prepend

```
1. append(ele,ele)
2.prepend(ele,ele)
与appendChild不同,append可以追加多个元素,并且可以追加文本,没有返回值.appendChild只能追加一个并且只能是元素节点,有返回值为 添加元素.
```

## H5拖拽系列事件 drag drop

## 定义和用法

> 要让元素可拖动,需要在标签上加 属性 draggable = "true",图片和链接标签初始就有该属性为true

> 事件分为两类 

1. 事件触发者为拖拽元素

```
ondragstart 用户开始拖动元素触发
ondragend 元素完成拖动后触发
ondrag 元素在拖动时触发
```

2. 事件触发者为所处容器元素

```
ondragover 被拖动元素在某容器范围内时触发
ondragenter 元素拖动时.鼠标进入某容器范围内时触发.
ondragleave 元素拖动时,鼠标离开某容器范围内时触发.
ondrop 拖动元素时,松开鼠标时触发.将当前拖拽元素移到鼠标所处容器. 要想ondrop生效,注意阻止ondragover事件的默认行为
```

## 文件上传的两种方法

+ 主动调用文件input元素的click方法,即可选择文件

1. base 64 持久性

   ```
   let reader = new FileReader();
   reader.readAsDataURL(ele.files[0]);
   reader.onload = function () {
   	src = reader.result;
   }
   ```

2. 对象url  当前会话使用

   ```
   src = URL.createObjectURL(ele.files[0])
   ```


## 拖拽一个元素到另一个容器中

```
document.ondragstart = function (e) {
      e.target.style.border = "2px solid cyan";
      e.dataTransfer.setData("text/html",e.target.id);
      // console.log(e.target);
      console.log("开始拖拽");
    }
    
document.ondrop = function (e) {
      console.log("wosi Drop");
      console.log(e.target);
      //指向的是进入的标签元素
      let id = e.dataTransfer.getData("text/html")
      e.target.append(document.querySelector(`#${id}`));
      // console.log(e.dataTransfer.getData("text/html"));
    }
```

