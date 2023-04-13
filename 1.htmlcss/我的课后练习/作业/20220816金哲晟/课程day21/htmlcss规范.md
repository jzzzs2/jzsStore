# 编程规范 html+css

## 命名规范

``` 
1.语义性单词命名
2.多个单词连接用-
3.过多单词连接进行适当缩写
4.不通过1,2,3序号命名
tips: 避免class和id重名
```

## 标签空行

>禁止出现连续两行已及以上的无意义空行行为

## 转义符号

> 防止传输,识别错误,字符使用对应的转义字符表示

## 标签书写

> 1. 属性值带引号
> 2. ul>li,ol>li,dl>dt>dd绝对父子关系标签.
> 3. 行内元素中只有a可以嵌套块元素.
> 4. p,dt,h不能嵌套块级元素

## 图片命名

> 1.图片后缀小写
>
> 2.文件名用间隔符 - 连接
>
> 背景图片以bg-开头
>
> 按钮图片以btn-开头
>
> 图标图片以icon-开头
>
> 聚合图以spr-开头

## 布局方式选择

> 文档流>margin+padding>浮动>定位

## CSS书写顺序

> 1. 确定自身位置的样式,display,float,position,z-index,clear,overflow,list-style
> 2. 自身属性样式,width,height,padding,margin,border,background,line-height
> 3. 内容(文本),color,font-xx,text-xx,
> 4. 其他
>
> tips: 目的是避免重绘

## CSS细节优化

> 1. 0后面不需要单位,如 0px可以写为  0
> 2.  没有边框时,border: none
> 3. 为了seo,为了隐藏文本使用text-indent