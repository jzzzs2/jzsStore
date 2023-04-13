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

## Video 和 audio

> video
>
> ```
> <video src='' controls>
> 	<source src="">
> 	<source src="">
> </video>
> ```
>
> 
>
> ```
> 1.属性
> autoplay 视频加载完毕后自动播放,需要和muted属性一起使用.
> controls 状态属性,显示自带控件
> height,width 设置宽高
> loop 状态属性 是否循环播放
> muted 状态属性,出现则默认静音
> poster 当视频未开始播放时,给用户显示的图像
> preload 状态属性 预加载
> playsinline ios/微信支持小窗
> volume double 0-1 音量
> paused 只读,视频的状态
> playbackRate 视频播放速度 1是默认
> duration 视频的时间长度 单位是秒
> currentTime 当前视频所处时间.可读写
> ```
>
> ```
> 2.方法
> play() 开始播放
> pause() 暂停 
> load() 从头开始播放
> 
> ```
>
> ```
> 3. 事件
> onloadstart 资源开始加载时触发
> oncanplay 资源加载完毕时触发
> ontimeupdate 视频的当前时长改变时触发
> onpause 视频暂停时触发
> onended 视频结束时触发
> onplay 视频开始时触发(初次开始,暂停后再开始)
> onplaying 视频开始时触发,无论是什么时候开始(初次 暂停开始 结束循环开始)
> onabort,onemptied 资源中断时触发
> 
> ```
>
> + autoplay要和muted一起使用时,video资源才会自动播放,并且对audio资源无效.

## FileReader 

>异步读取存储在用户计算机上的文件（或原始数据缓冲区）的内容使用 [`File`](https://developer.mozilla.org/zh-CN/docs/Web/API/File) 或 [`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob) 对象指定要读取的文件或数据

> 属性
>
> ```
> 1.onloadstart 读取操作开始时触发
> 2.onload 读取操作完成时触发
> 3.onabort
> 4.onerror 默认有传参数
> 5.onprogress 读取过程中时不断触发
> 6.result 保存加载完成后的返回值.
> 7.readyState 0 未加载 1 正在加载 2 加载完成
> ```
>
> + 文件进度条:  FileReader实例对象的事件对象e的属性中total表示文件总大小,loaded表示当前加载大小.

> ```
> 方法:
> 1.readAsDataURL() 把base64字符串返回.
> 2.readAsText() 把文本文件内容读取出来
> 3.readAsBinaryString() 把文件读取为二进制数据
> 4.readAsArrayBuffer() 返回一个ArrayBuffer数据对象
> ```
>
> 

## 地理信息 navigator.geolocation

```
if (window.navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
} 
function successCallback(position) {
    var output = '';
    output += "您的位置已经确定下来\n\n";
    output += '经度：' + position.coords.longtitude + "\n\n";
    output += '纬度：' + position.coords.latitude + "\n\n";
    output += '精度：' + position.coords.accuracy + " 米\n";
    if (position.coords.altitudeAccuracy) {
        output += '海拔精度：' + position.coords.altitudeAccuracy + " 米\n";
    };
    if (position.coords.heading) {
        output += '速度：' + position.coords.Speed + "m/s\n";
    };
    output += '时间戳：' + position.timestamp;
    console.log(output);
}
function errorCallback(error) {
    console.log(error);
}

// GeolocationPositionError {code: 3, message: "Timeout expired"}
 const options = {
    enableHighAccuracy: true, //是否定位更加精确 默认false
    maximumAge: 1000,  // 位置获取时间间隔 默认0
    timeout: 10000, //最大等待响应事件 默认infinity
}
```

## 画布canvas

```
1.属性
width height
```

```
2.方法
getContext()
toBlob()
toDateURL()
```

> 我们操作画布都是对画布的上下文对象进行操作 即 canvas.getContext('2d')

### context2D上下文

>```
>let convas = document.querySelector("canvas")
>const context = convas.getContext("2d");
>```

> 属性
>
> ```
> 1. fillStyle = color 纯色填充
> 2. strokeStyle = color 描边样式
> 3. lineWidth = value 默认是1.0 线的宽度 如果是负数，0，NaN，或者Infinity都会忽略。
> 4. font = "20px 字体1,字体2"  默认值: 10px sans-serif
> 5. textAlign left center right 表示文本的左右或者中间哪条边作为初始位置的标志
> 6. shadowColor 阴影颜色
> 7.shadowoffsetX 向X轴偏移量
> 8.shadowoffsetY 向Y轴偏移量
> 9.shadowBlur 模糊度 默认是0
> 10.fillText(XX,x,y) 填充文本,并设置初始位置.
> ```
>
> 方法
>
> ```
> 1.beginPath() 开始绘制新路径.
> 2.moveTo(x,y) 绘制点的起始位置
> 3.lineTo(x,y) 绘制点的终点位置
> 4.closePath() 闭合起点和终点,并且之后的绘制点起点为最初moveTo点
> 4.stroke() 绘线
> 5.fill() 填充
> 6.arc(x,y,radius,startDeg,endDeg,isDirection) 画圆, 方向参数为true,代表逆时针化,反之.但标准方向是顺时针代表正弧度.
> 7.arcTo()
> 9.clearRect(x,y,width,height) 擦除指定位置区域内内容
> ```
>

## 渐变 用于fillStyle

```
context.createLinearGradient(初始x,初始y,终点x,终点y); 这四个参数代表了渐变方向和范围,范围是垂直与他们连线的范围
context.addColorStop(0,color)
context.addColorStop(1,color)
```

## 图片模板 用于fillStyle

```
context.createPattern(img对象,param) param 可以传入 repeat,no-repeat,repeat-x,repeat-y
```

## 画矩形的三个办法

```
context.rect(初始x,初始y,width,height)
context.strokeRect(初始x,初始y,width,height)
context.fillRect(初始x,初始y,width,height)
```

## 绘制文本和保存状态值

```
context.fillText(str,起点x,起点y);
context.measureText(str) 返回测量对象,对象的width代表了文本的实际宽度
context.save() 保存状态值,比如font,fillStyle,strokeStyle
context.restore() 恢复状态值
```

## clip

> 1. 创建路径
>
> 2. 剪裁
>
> 3. 绘制图像,只有clip的区域内才会显示
>
>    ```
>    context.beginPath();
>      //   context.moveTo(100, 100);
>      //   context.lineTo(300, 200);
>      //   context.lineTo(200, 400);
>      //   context.closePath();
>      //   context.clip();
>      //   context.drawImage(img, 100, 100);
>    ```
>
>    

## translate rotate scale   改变绘制的初始位置

```
1.context.translate(x移动,y移动) 移动绘制的初始原点
2.context.rotate(弧度值) 移动绘制的标准坐标轴.
3.context.scale(倍数,倍数) 设置之后的图像才会生效.放大或者缩小 包括宽高和初始位置.
```

## requestAnimationFrame(回调函数)

```
- CPU节能：使用setTimeout实现的动画，当页面被隐藏或最小化时，setTimeout 仍然在后台执行动画任务，由于此时页面处于不可见或不可用状态，刷新动画是没有意义的，完全是浪费CPU资源。而requestAnimationFrame则完全不同，当页面处理未激活的状态下，该页面的屏幕刷新任务也会被系统暂停，因此跟着系统步伐走的requestAnimationFrame也会停止渲染，当页面被激活时，动画就从上次停留的地方继续执行，有效节省了CPU开销。

- 函数节流：在高频率事件(resize,scroll等)中，为了防止在一个刷新间隔内发生多次函数执行，使用requestAnimationFrame可保证每个刷新间隔内，函数只被执行一次，这样既能保证流畅性，也能更好的节省函数执行的开销。一个刷新间隔内函数执行多次时没有意义的，因为显示器每16.7ms刷新一次，多次绘制并不会在屏幕上体现出来。
```

