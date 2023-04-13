## nodeJs

> node是js的一个运行平台 或者运行环境,是对chrome v8引擎的一个封装（chrome浏览器运行js就是v8引擎）
>
> 由于NodeJS的最底层是Chrome的V8引擎，然后libuv封装了一些**I/O的线程池管理 以及 网络的I/O操作**，这部分是C/C++写的。简单来说NodeJS可以控制系统文件的读写，网络的输入输出。所以NodeJS又可以被单纯的认为是一个可以运行 JavaScript 的服务器。

## cmd

>```
>1. cd e:
>2. cd test.txt | cd test/a.txt
>3. cd \
>4. cd..
>5. cd c:\test (当前路径盘是c盘,同盘符切换)
>6.cd /d d:\test (不同盘符切换)
>7.dir
>8.md 文件夹名 新建文件夹
>9.move 文件名 文件夹名 (剪切)
>10.notepad 文件名 更改文件内容
>11.del 文件名
>12.copy 文件名 文件夹名
>```
>
>
>
>

## NPM

> npm,全称【node package management】，是nodejs内置的软件包管理器。毫无疑问，npm是用来管理软件包的。

### 命令

```
1. 查看安装信息和下载路径
npm config ls
2.查看全局默认下载目录
npm root -g
3.下载包命令
npm install -g xxx
4.运行js文件
node xx.js
5.创建node项目环境
npm init
```





## JS模块化

```
解决变量冲突,依赖引入顺序问题
```

## Js模块化的几种方式(底层是动态加载script标签,通过函数和路径参数,回调函数参数)

## 1.amd (require.js)

```
1.引入require.js文件
2.定义模块
define("模块名"?,[引入模块]?,function (引入模块值1,...) {
	return 返回值
})
3.引入模块
require(["模块名",..],function(模块返回值1,...) {
//回调操作
})
配置
require.config({
	baseUrl: "路径"
	paths: {
		
	},
	shim: {
        "jq": {
          exports: "$"
        },
        "under": {
          exports: "_"
        }
      }
})
//shim属性为那些不符合amd使用条件的模块使用
```

### 2.cmd (sea.js)

```
1.引入sea.js
2.在js文件中定义模块
define(function(require,exports,module) {
 require("模块名") //引入依赖模块
 module.exports = 返回值 || module.exports.属性 = 值
 默认exports是一个对象
})
3.引入模块
 seajs.use(["模块名",..],function (模块返回值1,...) {
 //回调操作
 })
4.配置
seajs.config({
base: "路径",
alias: {
	"jquery": "./jquery-1.12.1",
    "test": "./test"
}
})
```

### 3.commonJs(同步)

```
nodejs中使用
1.引入
require("模块名")
2.一个js文件就是一个模块
exports.x = xx || module.exports = xx
```

### 4.es6模块化

```
1.引入
import {key1,..} from "模块路径"
2.一个js文件一个模块
export {

}
export default xxx
```

+ 使用import,需要在script标签上加type=module,而该属性需要服务器环境支持

## 浏览器EventLoop

```
须知:
1.异步任务队列分为宏队列和微队列: 定时器回调等为宏队列,promise回调为微队列,微队列被主线程(执行队列)调用优先级高于宏队列.
2.同步语句最先在主线程被执行.
```

### 执行过程

```
1.执行所有js代码,然后执行同时将异步语句的任务放入对应的任务队列,异步语句再出栈.同步语句执行完就出栈.
2.执行完js代码后,调用栈清空.
3.到微队列寻找任务,进入调用栈.如果内部还有异步语句,则将任务放入对应队列.执行完该任务,进行全局查询,如果微队列还有任务则继续,没有则到宏队列中寻找任务,进入调用栈.
4.直到任务全执行完停止.
```

 <img src="file:///D:\qqFile\2803290705\Image\C2C\2K6NBBVKDCHBXZ62]R[_~4C.png" alt="img" style="zoom:50%;" /> 

  <img src="file:///D:\qqFile\2803290705\Image\C2C\IJ79JBV1J~W1VF7Q5Y03GP5.png" alt="img" style="zoom:50%;" /> 

## nodeJs  模块(commonJs规范)中语句使用的一些规则

```
1.require.main 代表主模块对象,指当前用node语句运行的node模块(Js文件),使用:require.main === module
```

+ 当 Node.js 直接运行一个文件时， `require.main` 会被设为它的 `module`。 这意味着可以通过 `require.main === module` 来判断一个文件是否被直接运行,通过require("xx")运行的模块会返回false.

```
2.加载顺序
当用require(xx),加载的不是核心模块,并且路径中没有./ , ../ , /等路径符号,会从当前父目录下的node_modules文件夹下开始查找,没有则返回更上一级,在其下的node_modules文件夹下查找,直到根目录.
```

```
3.加载路径中是文件夹名,而不是模块名
如果查找到该文件夹,如果文件夹下有package.json文件,并且main属性的值是真实存在路径,则加载该路径的模块.
如果没有package.json文件,则查找是否有index.js文件,有则加载该模块.
```

+ ____dirname 输出当前模块的路径  ____filename 输出当前模块的绝对路径

```
4.exports 使用
不使用exports = {} 的原理: 内部 exports 变量 = module.exports
正确使用两种:
1 module.exports = {}
2 exports.xx = xx
```

```
5.module对象
{
    id:'模块的标识符。 通常是完全解析后的文件名',
    filename:'模块的完全解析后的文件名',
    loaded:'模块是否已经加载完成，或正在加载中',
    path:'模块的目录名称',
    paths:'模块的搜索路径',
    exports:'导出的模块内容',
    children: [] 引入的模块对象
}
```

```
6.require补充
require.cache 返回一个对象,key是绝对路径,value是模块对象,记录了所有被加载的模块缓存信息.
require(id) 加载模块方式
require.resolve(路径) === 绝对路径
require.resolve.paths(模块路径) 返回查找模块的路径数组
```

## events核心模块

```
1.获取events类 生成事件实例对象
const EventEmitter = require("events")
const eventEmitter = new EventEmitter()
```

```
2.方法
on events实例对象.on("自定义事件名",回调函数)
once events实例对象.once("自定义事件名",回调函数) 只会响应一次事件触发,然后解绑
off events实例对象.off("自定义事件名",回调函数)
emit events实例对象.emit("自定义事件名",实参1,实参2..)
removeAllListener() events实例对象.removeAllListener("自定义事件") 移除该自定义事件的所有回调函数
eventNames() events.eventNames() 获取绑定的所有自定义事件数组
```



## path核心模块

```
1. 引入
let path = require("path")
2.方法
path.basename("路径") //获取文件全名 如: a.js
path.dirname("路径") //获取绝对路径的路径部分
path.extname("路径") //获取文件名后缀
path.parse("路径") //返回一个分解的路径对象
path.format(路径obj) //返回一个路径对象合成的字符串
path.isAbsolute(路径) //判断是否是绝对路径
path.join("路径1","路径2"..) //使用特定路径连接符,连接多个路径
path.normalize("路径") //返回规范路径
path.delimiter 在windows中是; posix中搜索:
path.sep 在windows中是\\, 在posix中是/
path.relative(路径1,路径2) 返回路径1相对路径2的相对路径
path.resolve(路径1,路径2) 从右往左解析,拼接绝对路径返回,获得绝对路径时直接返回,停止拼接,如果拼接完还不是绝对路径,则加上当前的工作路径
```

+ 作用:处理不同系统下的路径字符串格式差异

+ windows下路径使用 \\\\, posix下路径使用 /, 分隔符 windows使用; posix使用 :

+ 在windows中../表示当前路径下

+ resolve方法

  ```
  以就用程序为根目录，做为起点，根据参数解析出一个绝对路径
   *  1.以应用程序为根起点
   *  2... .
   *  3. 普通 字符串代表子目录
   *  4. /代表绝地路径根目录
  ```

  ## Buffer 模块
  
  ```
  1.Buffer实例对象用于存放二进制数据
  ```
  
  ```
  2.方法
  Buffer.from(str) 创建buffer实例对象
  Buffer.alloc(byteNum，fill) 参数1是可存放的字节数，参数2是用来填充的初始值。默认填0
  buffer.write(替代内容,被替代start索引，替换长度，编码)
  buffer.toString（编码方式，startIndex,endIndex） 读取buffer中数据
  buffer.toJSON() 返回一个对象，type为“buffer”，data为多个字节组成的数组
  Buffer.concat([b1,b2],finalLength) 合并buffer，finalLength表示最终的字节长度
  buffer.compare(b2) 返回0表示两个buffer中数据相同。
  buffer.copy(b2,b2startIndex,bufferstartIndex,bufferendIndex) 用buffer内容覆盖b2的内容 包括start，不包括end
  buffer.slice(startIndex,endIndex) 包括起始，不包括结束
  ```
  
  + 一个汉字占3个字节

## file System模块

```
1.引入
let fs = require("fs")
2.方法
fs.stat(路径，function（err，data) {data//是一个stat对象包含了文件或者文件目录信息}） //检测路径是文件还是目录,data有两个方法，判断是文件还是路径，data.isFile() data.isDirectory()
fs.writeFile(路径，字符串内容，{flag：‘w’|| ‘a’}，function （err） {})
fs.writeFileSync(路径,字符串内容，{flag：‘w’ || ‘a’})
fs.readFile(路径,{encoding："utf8",flag: 'r'},function （err，data） {data//读取内容})
fs.readFileSync(路径,{encoding："utf8"}) 返回读取内容
fs.appendFile(路径，字符串内容，function（）{}) 
fs.mkdir(文件夹路径，err =>{}) 创建文件夹
fs.rmdir(文件夹路径，err =>{}) 删除文件夹
fs.unlink(路径,err =>{}) 删除文件
fs.rename(路径1,路径2) 用于文件剪切,换位置
fs.open("路径"，操作标识，权限，function (err,fd){})
fs.read(fd，buffer,bufferStart,fileLength，fileStart,function(err，byteLength,buffer){})
fs.write(fd,buffer,bufferStart，BufferLength，fileStart,function(err,written,buffer){})
fs.fsync(fd,cb)
fs.close(fd,cb)
```

+ fs中的异步方法都需要回调函数，有sync的同步方法不写回调，直接返回值。
+ require("fs").promises   fs.readFile(url,option).then(..).catch(..)

## Http模块

```

```

+ 前置知识：

  + 请求报文：请求行(对目的简单说明)  请求首部(对目的的描述)
  + 响应报文：响应行(对响应的简单说明) 响应首部(对响应的描述)  响应体(返回内容)
  + MiMe数据格式标签: https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Complete_list_of_MIME_types

  ```
  • HTML 格式的文本文档由 text/html 类型来标记。
  • 普通的 ASCII 文本文档由 text/plain 类型来标记。
  • JPEG 格式的图片为 image/jpeg 类型。
  • GIF 格式的图片为 image/gif 类型。
  • Apple 的 QuickTime 电影为 video/quicktime 类型。
  • 微软的 PowerPoint 演示文件为 application/vnd.ms-powerpoint 类型。
  ```

  ## 搭建http服务小案例
  
  ```
  1.引入
  require("http")
  require("url")  处理url字符串
  require("querystring") 处理get请求的参数字符串
  2.创建服务
  http.createServer((req,res) => {
  	req.url //请求的资源路径,如果是get请求包括请求参数
  	req.method //返回请求类型 如GET,POST
  	url.parse(路径字符串) 转为一个细分的路径对象
  	req.headers['content-type'] 请求数据的类型,如表单数据(application/x-www-form-		  urlencoded)
  	req.headers['content-length'] 请求发送数据的长度(Post请求有,get请求没有)
  }).listen(3305)
  	req.on("data",function (chunk) {}) //chunk为buffer数据,POST请求有,GET没有
  	req.on("end",function () {}) //数据传输结束的回调
      res.writeHead(200,{'Content-Type': "text/plain;charset=utf8"})
  	res.write(str) //写入数据
  	res.end()  //结束写入,返回数据
  ```
  
  ```
  url.parse(路径字符串) 转为一个细分的路径对象
  Url {
    protocol: 'http:',
    slashes: true,
    auth: null,
    host: '127.0.0.1:3002',
    port: '3002',
    hostname: '127.0.0.1',
    hash: null,
    search: '?user=asdf123&pwd=21312312',
    query: 'user=asdf123&pwd=21312312',  
    pathname: '/user',
    path: '/user?user=asdf123&pwd=21312312',
    href: 'http://127.0.0.1:3002/user?user=asdf123&pwd=21312312'
  }
  ```
  
  ```
  querystring.parse("?name=jzs&age=22")  // {name: 'jzs', age: 22}
  ```
  
  ## 图片上传
  
  ```
  1.表单设置
  enctype='multipart/form-data' 表示表单请求上传数据中有文件数据,默认是application/x-www-form-urlencoded,表单内容解析为key=value&key=value形式
  2.引入multiparty
  let party = new multiparty.Form({
   uploadDir : 上传文件的存储路径
  })
  party.parse(req,function (err,fields,files) {
  fields和files都是对象,fields是普通表单数据,files是文件数据,结构为{表单name:[]}
  //
  res.headWrite(200,"text/html;")
  res.write(html页面字符串)  //异步任务 并且设置图片的路径为项目相对路径/load/文件名
  res.end()
  })
  3.加载图片
  fs.readFile(上传图片的路径,function (err,data) {
  	res.writeHead(200,'Content-Type':'image/图片格式')
  	res.write(data)
  	res.end()
  })
  ```

      ```
fields和files参数结构
{ content: [ '222222' ] } {
  miku: [
    {
      fieldName: 'miku',
      originalFilename: 'gblj2.png',
      path: 'upload\\ZQs_-MvPR2x38ddP0Hn9RdwV.png',
      headers: [Object],
      size: 565776
    }
  ]
}
      ```

```
http.createServer(function (req, res) {
  newHtml(req,res)
  loadImg(req, res)
}).listen(3003)
```

```
module.exports.newHtml = function (req,res) {
  let party = new multiparty.Form({
    uploadDir: "./upload"
  })
  let url = req.url
  if (/data/.test(url)) {
    res.writeHead(200,{"Content-Type": "text/html;"})
    party.parse(req, function (err,fields,files) {
      let { path, fieldName, size } = files['miku'][0]
      res.writeHead(200, { 'Content-Type': 'text/html;charset=utf8' })
      res.write(`
      <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>temp</title>
          </head>
          <body>
            <img src="${path}" alt="">
          </body>
          </html>
      `)
      console.log("我是end 前");
      res.end()
    })
  }else{
    return false
  }
}

exports.loadImg = function (req, res) {
  console.log("我是loading中");
  let url = req.url
  console.log(url);
  if (/upload/.test(url)) {
    console.log("upload");
    console.log("load IMG");
    console.log(url,"url");
    fs.readFile(`.${url}`,function (err,data) {
      console.log(data);
      console.log(`${path.basename(url)}`,"ext")
      res.writeHead(200,`Content-Type: image/${path.basename(url)}`)
      res.write(data)
      res.end()
    })
  }
  return false
}

```

+ 一个res只能end一次.之后不可write和end

## Ajax初见

```
1. 创建
let xhr = new XMLHttpRequest()
2.初始化
xhr.open(请求方法,路径,是否异步)
3.发送数据
xhr.send(data) //data需要是字符串,只有字符串才能传输.
encodeURIComponent(汉字) 转化为 URI字符
4.监听xhr状态
xhr.onreadystatechange = function () {
 xhr.status
 xhr.readyState 有0 , 1, 2 ,3 ,4  4是数据接收完毕,0是xhr刚生成时状态
 xhr.responseText | xhr.response
}
5.xhr也可以设置请求头
xhr.setRequestHeader("Content-Type", 'multipart/form-data;')
```

传输文本和文件

```
1.传输文本
xhr.send(json字符串)
2.传输文件
let form = new FormDate()
form.append(file表单的name,file表单files属性中的文件数组中的obj文件对象,传给服务器的文件名)
xhr.send(form)
```

+  JSON官方明确规定，JSON数据的key与value必须使用双引号""包裹，否则在转换过程中会导致错误。 

## Ajax传输json数据,form表单数据,请求服务器文件数据.

#### json数据

```
1.xhr.setRequestHead("Content-Type": "application/json")
2.xhr.send(json字符串)
3.req.on("data",function(chunk) {
 res.write(chunk.toString())
})
4.xhr.reponseText
4.跨域cors 服务端设置
res.writeHead(200, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    'Access-Control-Allow-Headers': 'x-requested-with,Authorization,token, content-type',
    "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS,PATCH",
    "access-control-max-age": "1728000",
  })
```

### form表单数据

```
1.xhr不设置请求头,浏览器自动识别
2.let form = new FormData()
form.append(虚拟表单name,数据) //普通表单数据
form.append(虚拟表单name,file对象) //文件表单数据 file对象指的是 fileInput的files属性中的文件对象
xhr.send(form)
3.
let formParty = new multiparty.Form({
    uploadDir: "./upload"
})
formParty.parse(req,function(err,fields,files) {
	
})
4.跨域cors 服务端设置
res.writeHead(200, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    'Access-Control-Allow-Headers': 'x-requested-with,Authorization,token, content-type',
    "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS,PATCH",
    "access-control-max-age": "1728000",
  })
```

### 文件数据 发送json字符串,返回服务器中的图片流 {fileName: 文件名}

```
1.xhr.setRequestHead("Content-Type","application/json;charset=utf8")
2.req.on("data", function (chunk) {
//根据chunk 获得到文件名
url = path.normarize(__dirname + 文件名)//获得系统环境下的文件绝对路径
fs.readFile(url,functionj (err,data) {
 res.write(data,"binary") //二进制流
 res.end()
})
})
3.xhr
xhr.responseType = 'blob'  //将服务器返回的二进制流保存在blob对象中返回
url = URL.createObjectURL(xhr.reponse) //生成一个临时资源地址
img.src = url //图片生成
4.跨域
res.writeHead(200, {
    "Content-Type": "application/octet-stream", //所有二进制数据都可使用该类型传输
    "Access-Control-Allow-Origin": "*",
    'Access-Control-Allow-Headers': 'x-requested-with,Authorization,token, content-type',
    "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS,PATCH",
    "access-control-max-age": "1728000",
  })
```



 ![img](file:///D:\qqFile\2803290705\Image\C2C\`TZQRIM[4KUYSEUJV`}AGWC.png) 





##  简单登录注册和cookie

```
1.ajax实现简单登录注册
fs.readFile("./a.html","utf8",function (err,data) {
 res.write(data)
 res.end()
})
xhr.reponseType = "html"
document.innerHtml = xhr.response 返回新页面
```

```
2.表单提交中的cookie
表单提交,请求头中会自己加上cookie字段,提交给服务器.服务器通过  req.headers["cookie"]获取
```

```
3.通过在服务器端设置 给浏览器返回cookie数据
res.setHeader("Set-Cookie","token=3434343; Expires=xxxx; HttpOnly")
Expires 代表cookie存放时间, HttpOnly使得js脚本无法操作该条cookie
```

## ajax实现带cookie传输

```
1.客户端设置
xhr.withCredentials = true
2.服务器端设置
res.setHeader("Access-Control-Allow-Credentials", true)
3.同时
需要注意设置res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500"),设置为*会报错.只需要设置给你前端访问的服务器
如果请求要发送自定义请求头,注意设置res.setHeader('Access-Control-Allow-Headers', 'x-requested-with,Authorization,token, content-type,name ,age,addr');进行开放
```

## jquery和axios实现ajax

```
1.jquery
$.ajax({
url: "http://127.0.0.1:3001/main",
type: "GET",
data: "name=jzs&age=22",
success: function (data) {},
xhrFields: {
withCredentials: true
}
})
```

```
2.axios (promise方式)
axios.post(url,data,{
headers: {
"name": "jzs",
"addr": "jinhua"
},
timeout: 3000
withCredentials: true
}).then(function (data) {}).catch(function(data) {})
自测:axios的get请求无法直接通过headers设置.
```

## npm命令

```
# 更新npm最新版本
npm install npm@latest -g
 
# 查看npm命令列表
npm help
 
#查看各个命令的简单用法
npm -l
 
#查看npm版本
npm -v
 
#查看npm的配置
npm config list- l
 
 
#初始化生成package.json文件,可以自定义设置，
#也可以使用默认值安装,-ye后缀直接跳过提问环节，默认安装
npm init
npm init -y
 
 
#设置环境变量，为npm init 设置默认值
npm set init-author-name 'you name'
npm set init-author-email 'your email'
npm set init-author-url 'your url'
npm set init-license 'MIT'
 
 
#搜索npm仓库，可以跟字符串，也可以跟正则表达式
npm search <搜索词>
 
 
#列出安装的依赖包列表
npm list
 
 
#安装命令，比较常用,node_modules目录如果已经存在（老版本也是如此），那么就不在安装
npm install <package_name> 
npm isntall <git url>
 
#安装最新版本
npm install <package_name>@latest
 
#安装指定版本
npm install <package_name>@0.1.1
 
#安装写到dependencies,-s是简写
npm install <package_name> --save
npm install <package_name> --s
 
 
#安装写到devDependencies,-D是简写,
npm install <package_name> --save-dev
npm install <package_name> --D
 
#安装beta版本
npm install <module-name>@beta
 
 
#npm更新
npm update <package_name>
 
 
#npm 卸载
npm uninstall <package_name>
 
 
 
#npm执行脚本，package.json文件有个scripts字段，可以定义脚本命令(lint,build)，npm直接执行
npm run lint
npm run build
 
 
#npm run 执行script下面所有的命令
npm run
 
 
#dev 脚本，开发阶段要做的处理.dev是自定义命令
npm run dev 
 
#serve,脚本用于启动服务,serve是自定义命令
npm run serve

#npx 实现未在全局环境配置的cmd命令,在本地modules/bin下寻找cmd命令
npx styl --version

npm i xxx -S 本地生产环境下载
npm i xxx -D 本地开发环境下载
npm i xxx -g 全局环境下载


想要在另一个环境导入你的modules,复制package.json到另一个环境下,npm install 下载.


npm run 脚本名  

npm config set init.author.name "xx"


npm install XX -f 强制重新安装
```

+ 全局命令和本地命令的使用区别:    单独加载一个js模块可以用本地命令下载   / 加载一个类似sass,styl,自身带有cmd命令的需要全局命令加载,不然无法使用一些命令.

## Express框架 对nodejs的封装

```
一.express官方案例生成
npm install -g express-generator
npx express-generator
```

```
二.本地创建express项目
1. npm i express -D
2. 创建项目结构 app.js route文件夹 public文件夹 view文件夹
可以设置模板引擎的类型 express --view=hbs 项目名?
3.主程序编写
let app = express() app可以理解是一个回调函数
//app.use中的回调函数是中间件 对req,res做处理.
app.use("路径",function (req,res,next) {
 next() //next() 代表执行下一个符合条件的回调函数(从上往下寻找)
})
http.createServer(app).listen(port,function(){})
```

```
三.res的几个方法
res.json(obj)
res.jsonp(data) //对get请求 路径?callback=函数名 进行响应
res.send(data)
res.sendFile(文件绝对路径)
res.sendStatus(404) === res.status(404) res.send("not found")
res.append("响应头名",响应头值)
```

```
四.req的属性和方法
req.baseUrl //请求资源路径
req.query //?xx=yy请求参数的对象形式
req.hostname //主机名
req.body //请求体参数的对象形式 请求体内容为form-urlencoded类型,需要express.urlencoded({extended: true})
req.get("Cookie")  //得到请求中的cookie
req.get("content-type") //得到请求的content-type
```



+ app.locals.xx = xx     全局挂载值

+ /user/:key 代表一个二级请求路径不定的路径,可以通过req.params[key] 获取到该二级路径

```
五.app.use()中路径多种写法
app.use("/user/\*abc",xx)   表示   任意值abc
app.use("abc?d",xx)  表示 abcd 或者 acd
app.use("/user/*",xx)  表示 /user/任意值
app.use(/\/user|\/format/,xx) 表示 /user或者/format
app.use(['/abcd', '/xyza', /\/lmn|\/pqr/],xxx) 表示是其中之一
```

## express API

```
一. app.set(xx,xx) app.get(xx)  req['xx'] = xxx
设置app全局属性
二. app.enable(属性名) app.disable(属性名)  app上设置全局属性为true和false
三. app.VERB 筛选请求类型
app.all() 所有请求类型都可以
app.get()
app.post()
app.delete()
app.put()
四. 根据请求中参数 上传form-data数据文件
npm i multer
let storage = multer.diskStorage({
	destination: function (req,file,cb) {
		let one = req.params["ID"]
		let two = req.params["path"]
		let url = path.join(__dirname,`/upload/${one}`)
		fs.existsSync(url) || fs.mkdirSync(url)
		url = path.join(url,`/${two}`)
		fs.existsSync(url) || fs.mkdirSync(url)
		cb(null,url)
		//cb第一个参数是this指向
	},
	filename: function (req,file,cb) {
		let pathObj = path.parse(file.originalname)
		let name = pathObj.name + Date.now() + pathObj.ext
		cb(null,name)
	}
})
let fileOperate = multer({storage})
//fileOperate.single("file") 也是一个中间件
app.use("/user/:ID/upload/:path",fileOperate.single("file"),function(req,res,next) {
 res.send("ok")
})
```

+ server.on("listening", function () {})   server.on("request", function () {})

+ arr.findIndex(ele => { return })

## express Api

```
1.app的属性
app.get("xx") 是在app.locals.settings对象上查找值
app.locals.xx
app.get("views") 获取该项目模板存放位置的绝对路径
app.get("env") 获取环境是开发还是生产

```

```
2.中间件分类
应用中间件
路由中间件
错误处理中间件   当next(err),会把请求处理转向错误处理中间件
function (err,req,res,next) {

}
```

```
3.req.body 获取到请求体中数据
app.use(express.json({
limit: 100
}))
app.use(express.urlencoded({
extended: true
}))
```

```
4.静态资源 通过默认路径和请求资源路径结合
3001/路径2
express.static(路径1)
路径1和请求路径2拼接后是静态文件的绝对路径
res.redirect("路径2")
```

```
5.路由中间件
let route = express.Router()
route.get("二级路径1",cb)
route.get("二级路径2",cb)
route.get("二级路径3",cb)
app.use("一级路径",route)
```

