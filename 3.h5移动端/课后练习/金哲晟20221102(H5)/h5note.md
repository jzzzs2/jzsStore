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
以下为旧属性
7. diabled 禁止输入
8.maxlength
9.readonly
```

