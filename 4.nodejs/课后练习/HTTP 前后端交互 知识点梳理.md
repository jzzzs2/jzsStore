# 前后端数据交互

>  客户端 服务端 之间 通信数据 所需要的用到的知识点 梳理汇总



## 原理

> 静态 网页上的内容 与 数据信息 都是写死在 HTML 的标签内的 图片 文本 
>
> 动态 网页上的信息 是随着与 服务端进行数据交互而变化的 可以随时与后台通信 获取新的 内容 表现在网页上



### 通信

> HTTP 1990年 诞生了 HTTP/0.9 协议
>
> HTTP/2  HTTP/1.1

通信分层管理 TCP/IP

- 应用层  HTTP FTP DNS 在这一层工作
- 传输层  相对于应用层 提供处于网络连接中的两台计算机(客户端的电脑 , 服务端的电脑)的数据传输  TCP / UDP
- 网络层  处理网络上流动的数据包  IP协议(电脑的门牌号) ARP协议  
- 链路层 用于处理网络连接中的硬件部分 系统 驱动 硬件 通信线材  以太网协议(Ethernet)



![image-20201112205338138](assets/image-20201112205338138.png)



### 请求和响应的报文组成

请求起始行 

```js
GET / HTTP/1.1
```

请求首部

![image-20201112210329789](assets/image-20201112210329789.png)

请求主体

![image-20201112210430838](assets/image-20201112210430838.png)

​	



### URI资源定位 

#### URL

```
http://localhost:8080/data/name?user=123
协议://主机:端口/路径/参数?查询
```

```<scheme>://<user>:<password>@<host>:<port>/<path>;<params>?<query>#<frag>```

![image-20201030195456547](assets/image-20201030195456547.png)

### HTTP方法 method 

> https://www.rfc-editor.org/rfc/pdfrfc/rfc7231.txt.pdf

GET  用来请求访问已被URI识别的资源 获取指定地址资源的方法

POST 方法用来传输实体的主体 设计就是为了提交数据内容主体 给服务端

PUT  主要用来传输文件 HTTP/1.1 PUT没有验证机制 有安全隐患

DELETE 用来删除服务器上的文件资源 安全隐患的

HEAD 主要用来确认URI的时效性和有效性 不会返回报文的主体内容 (通常用来获取服务器时间)

OPTIONS 用来针对请求URI 指定资源你的方法 ( 浏览器预验请求)

误区

1. get不能发送body内容  RFC规范不推荐使用GET提交内容
2. post比get安全  谬论
3. get请求有字节限制  IE url地址栏限定字符长度优先





### 状态码

状态码的职责是客户端向服务端发送请求的时候 描述返回的请求结果. 

客户端借助状态码可以快速的了解这次请求是否的到了服务端的正常处理

#### Status

1xx   接受的请求正在处理  信息性状态码

​	

2xx  请求正常处理完毕  成功状态码

​	200 成功 ok

​	204 No Content 响应报文中没有主体内容

3xx  需要进行附加操作才能完成的请求  重定向

​	301 永久性重定向 

​	302 临时重定向

​	303 同一个资源有多个地址

​	304  强制缓存 请求带有附加条件的时候 if 服务端容许访问请求资源 但是资源没有满足请求条件 所以304重定向直接使用客户端缓存资源

4xx  服务端无法处理请求  客户端错误状态码 404 403

​	400 错误请求 有语法错误 请你改正请求内容重新发送

​	401 需要认证后才能访问 

​	403 服务器拒绝访问 不仅拒绝了你还不想和你说话

​	404 你所请求的资源 不存在

5xx  服务器处理请求出错  服务端错误状态码 500

​	500   服务器运行错误 有bug 宕机了

​	503   服务器正在超负荷运作或者正在维护



### 报文解析



#### 报文头



#### 请求头

```
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
Accept-Encoding: gzip, deflate, br
Accept-Language: zh-CN,zh;q=0.9,zh-TW;q=0.8,en-US;q=0.7,en;q=0.6
Host: localhost:8080
Proxy-Connection: keep-alive
Sec-Fetch-Dest: document
Sec-Fetch-Mode: navigate
Sec-Fetch-Site: none
Sec-Fetch-User: ?1
Upgrade-Insecure-Requests: 1
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.193 Safari/537.36
```



accept: 用户代理可以处理的媒体类型 (告诉服务器 我能处理什么)

Accept-Encoding: 优先的内容编码(压缩编码 普通编码)

Accept-Language: 优先处理的语言(自然语言)

Proxy-Connection:代理服务器连接状态 

Sec 系列 : chrome添加的 请求客户端的一些信息

Expect: 期待服务器的特定行为 

if-Modified-Since:  比较资源的更新信息 (缓存)

User-Agent: 发起请求的客户端的信息



#### 响应首部字段

```
Connection: keep-alive
Content-Length: 9
Date: Thu, 12 Nov 2020 13:53:18 GMT
Keep-Alive: timeout=5
```



ETag : 资源的匹配信息



#### 实体首部字段

Content-Lenght 实体主体大小(字节)

Content-Type 实体主体类型(MIME类型) 

https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types

Content-Location 替代对应资源的URI 重定向

Content-Language 实体主体的自然语言

Content-Endocing 实体主体的编码方式

Allow 资源可以支持的HTTP 方法





### 跨域处理

非同源发起的请求 都是跨域请求

客户端(发起请求的地址)和服务端(接收请求的地址)有以下三个有任何不同都属于跨域

- 协议相同
- 域名相同
- 端口相同

##### 处理方式

​	JSONP处理 

​	利用的资源请求 URL SRC link 对css img js 文件的请求会产生跨域但是可以拿到响应内容

​	CORS

​	服务端设置

```js
//设置允许跨域的域名，*代表允许任意域名跨域
res.setHeader("Access-Control-Allow-Origin", "*");
//我容许跟我不同源的页面像我发起请求
//允许的header类型
res.setHeader('Access-Control-Allow-Headers', 'x-requested-with,Authorization,token, content-type');
//跨域允许的请求方式
res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
//可选，用来指定本次预检请求的有效期，单位为秒。在此期间，不用发出另一条预检请求。
res.setHeader('Access-Control-Max-Age', 1728000);//预请求缓存20天
```

简单请求 || 非简单请求

简单请求 Content-Type：只限于三个值`application/x-www-form-urlencoded`、`multipart/form-data`、`text/plain`

urlencoded :  key=value&key=value

multipart/form-data 表单对象



非简单请求都会发起预验证 OPTIONS 

只有OPTIONS请求通过才会发送客户端实际请求





#### 客户端

##### 提交请求的方式

表单提交请求 

ajax异步请求 axios使用

cookie携带



服务端渲染前端页面返回浏览器 展示



前后端分离

前端静态资源单独部署静态服务器 

css js html img

交互 和 数据获取 都通过ajax异步 去服务端服务器获取



#### 常见的请求内容 content-type

```
'application/x-www-form-urlencoded': 'url', // key=value&key=value
'multipart/form-data': 'form', // form 对象 
'text/plain': 'text', // 字符串
'application/json': 'json' //字符串类型的json
```

#### 常见响应内容 content-type

```
 css: "text/css",
  gif: "image/gif",
  html: "text/html",
  ico: "image/x-icon",
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  js: "text/javascript",
  json: "application/json",
  pdf: "application/pdf",
  png: "image/png",
  svg: "image/svg+xml",
  swf: "application/x-shockwave-flash",
  tiff: "image/tiff",
  txt: "text/plain",
  wav: "audio/x-wav",
  wma: "audio/x-ms-wma",
  wmv: "video/x-ms-wmv",
  xml: "text/xml"
```





#### 问题

##### 服务端部分

1.  请求为 `http://127.0.0.1:8080/user?name=keyogre&pwd=!u894r382`, 请问使用原生node 如何获得请求的 query内容 , 如何将请求字段获取并且整理为 {name:keyogre,pwd:!u894r382}

2.  POST   `http://127.0.0.1:8080/user` 

    content-type : 'multipart/form-data'   

   content: 文件 + 字段表单

   如何获取解析请求内容

3.  POST  `http://127.0.0.1:8080/user` 

    content-type : 'application/json'   

    content: "{name:kyogre}"

   如何获取解析请求内容

##### 客户端部分

	1. 原生XMLHttpRequest 封装 ajax 使用 可设置content-type + 跨域cookie + jsonp  (选做:可封装为promise形式)
 	2. 获取文件表单内容进行ajax提交
 	3. 响应内容主体为 二进制文件流 如何 解析二进制文件流 形成 blob URL地址 并且展示文件(图片,js,css)











