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
四. 根据请求中路径参数和文件 上传form-data数据文件 到服务器指定文件
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
//fileOperate.single("file") 也是一个中间件 这里的file对应formData中的文件name
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

## express 第三方中间件

```
1.morgan  pm2打印的日志格式
npm i morgan
app.use(morgan("short"))
2.http-errors  生成一个指定类型的Error实例
next(httpErrors(404))
app.use((err,req,res,next) {})
3. cookie-parser  获取请求传输的cookie
npm i cookie-parser
app.use(cookieParser())
req.cookies获取cookie对象
res.header("Set-Cookie","name=jzs")
4. cors 跨域
app.use(cors({
  "origin": true, //true 设置为 req.origin.url
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE", //容许跨域的请求方式
  "allowedHeaders": "x-requested-with,Authorization,token, content-type", //跨域请求头
  "preflightContinue": false, // 是否通过next() 传递options请求 给后续中间件 
  "maxAge": 1728000, //options预验结果缓存时间 20天
  "credentials": true, //携带cookie跨域
  "optionsSuccessStatus": 200 //options 请求返回状态码
}))
```

## express 使用handlebars模板引擎

```
1. 自己从头安装server环境需要自己下载 npm i hbs
2. 寻找模板前准备
app.set("views", path.join(__dirname, "/public"))
app.set("view engine", "hbs")
3. 返回渲染页面
res.render("模板文件名",数据对象)
4.将页面作为数据传入
let hbs = require("hbs")
let template = hbs.handlebars.compile("<p>{{name}}</p>")
let str = template({name: "jzs"})
```

+ 如果模板文件存在layout,则会优先返回ta,可以在他内部嵌套其他模板, 嵌套方法 {{{body}}}

## handlebars 语法

```
1. {{}} {{{}}} 获取值的方式, {{}}会对特殊符号进行解析,比如>,< 会被自动解析为gt; lt; {{{}}}会返回原本的值,所以当你的值是html标签时,我们需要使用{{{}}},不对标签符号进行解析.
```

```
2. 循环 if
{{#each 变量}}
{{this}}
{{/each}}

{{#if 条件}}
xxxxx
{{/if}}
```

+ @key @value 在each循环内部使用,代表每次遍历的数据的key,index
+ @last,@first 在each循环内部使用,代表一个具体值true or false,可以用它进行条件判断.

```
3. 到上级作用域寻找值
一级 {{../变量}}
二级 {{../../变量}}
```

## rsa加密

```
1.服务器端生成私钥和公钥
npm i node-rsa
const NodeRSA = require("node-rsa")
const newKey = new NodeRSA({b: 512})  //512位
newKey.setOptions({ encryptionScheme: "pkcs1" })
let public_key = newKey.exportKey("pkcs8-public") //公钥
let private_key = newKey.exportKey("pkcs8-private") //私钥

2.前端对内容进行明文加密
npm i jsencrypt
<script src="jsencrypt.min.js">
let data = 公钥
axios.post("http://127.0.0.1:3001/login", {
        username: "jzs",
        pwd: encrypt(data, "abc123")
      })
function encrypt(publicKey, value) {
      let jsEncrypt = new JSEncrypt()
      jsEncrypt.setPublicKey(publicKey)
      return jsEncrypt.encrypt(value)
}

3.服务器对密文进行解密

async function decrypt(code) {
  let privateKey = fs.readFileSync(path.join(pathName, 'private.cer'), 'utf8')
  //读取密钥
  let nodersa = new NodeRSA(privateKey)
  nodersa.setOptions({
    encryptionScheme: "pkcs1"
  })
  let result = nodersa.decrypt(code,"utf8")
  return result
}

4.服务器对明文加密

async function encrypt(cont) {
  // console.log(path.join(pathName,"public.cer"),"path");
    let publicKey = fs.readFileSync(path.join(pathName, 'public.cer'), 'utf8');
    // let privateKey = await fs.readFile(path.join(pathName, "private.cer"))
    let nodersa = new NodeRSA(publicKey)
    nodersa.setOptions({
      encryptionScheme: "pkcs1"
    })
    const result = nodersa.encrypt(cont, "base64")
    return result

}
```

+ rsa加密: 前端通过共钥 对明文进行加密,后端通过 私钥 对密文进行解密.

+ 从localstorage读取空内容,有可能会读取到"undefined",注意比较

+ 当从文件中读取公秘钥,存入localStorage,注意把换行符替换后再存入

  ```
  keyData = keyData.replace(/\. +/g, '')
  keyData = keyData.replace(/[\r\n]/g, '')
  ```

  ## JWT和Seesion  令牌和登录状态保存
  
  ```
  1.jwt 
  ```
  
  rts加密: 公钥加密私钥解密,反之
  
  ```
  npm i jsonwebtoken
  npm i express-jwt
  ```
  
  ```
  let privateKey 从文件读取的rsa私钥
  let publicKey 从文件读取的rsa公钥
  ```
  
  
  
  ```
  jsonwebtoken 模块用于生成 token
  let jwt = require("jsonwebtoken")
  let {username} = req.body
  let token = jwt.sign({ username,exp: ~~((Date.now() / 1000) + 24 * 3600 * 3) }, privateKey, { algorithm: "RS256" })  //将用户名和保存时间编入token
  ```
  
  ```
  带token发送请求
  let res = 本地保存的token
  axios.post("http://127.0.0.1:3000/getAvatar",{},{
          headers: {
            "Authorization": `Bearer ${res}`
          }
        }
  ```
  
  ```
  服务器端验证token: 中间件express-jwt
  app.use("/getAvatar",expressJwt({
  	secret: publicKey,
      algorithms: ["RS256"],
      isRevoked: function (req,payload,next) {
      	req.tokenId = payload.username
      	//payload { username: 'jzs', exp: 1673265621, iat: 1673006421 }
      	next()
      }
  }),function (req,res,next) {
  	if (!req.tokenId) {
  	res.send(200,{
        msg: "没有权限",
        code: 403
      })
      return false
  	}
  	res.send(200,{
      msg: "获得图片",
      code: 200
    })
  })
  ```
  
  
  
  + 注意版本: jsonwebtoken是"^8.5.1",最新9版本会报错
  
  ```
  2.session
  npm i express-session
  ```
  
  ```
  app.use(session({
    secret: 'keyboard cat', //签名 字符串
    resave: false, // 强制保存 session 就算没有变化
    saveUninitialized: true, //强制将未初始化的 session 存储 默认值 true
    name: 'sid', // 设置cookie上的 key
    cookie: {
      maxAge: 172000 /*签名过期时间 有效期*/
    },
    // rolling: true //每次请求都强制设置cookie 重置过期时间
  }))
  ```
  
  ```
  app.use('/login', (req, res, next) => {
    let { username, pwd } = req.body
    console.log(username, pwd)
    //登录验证账号密码正确之后 设置session信息 sessid
    //sessid 对usernane加签名加密后 服务端设置cookie到客户端,key为sid
    req.session.sessid = username
    res.send(200, {
      statusCode: 200,
      errMsg: "welcome"
    })
  })
  ```
  
  ```
  app.use("/getAvatar", function (req, res, next) {
    // console.log(req.sessionID,"id");
    // console.log(req.session.cookie,"id2");
    console.log(req.session.sessid);
    if (!req.session.sessid) {
      res.send(200, {
        msg: "权限不够",
        status: 403
      })
      return false
    }
    res.send(200,{
      msg: "欢迎登录",
      status: 200
    })
  })
  ```
  
  ```
  app.use("/logout", function (req, res, next) {
    req.session.destroy(function (err) {
      console.log("session 已 清除");
      // req.cookies.sessid = ""
      // console.log(req.cookies,"cookies");
    })
  })
  ```
  
  ```
  加密方式:  对称\非对称
  
  
  对称:    pwd      A(明文字符串+pwd)==>混淆的字符串,    B(混淆的字符串+pwd) = 明文字符串
  非对称:   公钥\私钥    A1(明文字符串+公钥)==>混淆的字符串,     B1(混淆的字符串+私钥) = 明文字符串   A2(明文字符串+私钥)==>混淆的字符串,     B2(混淆的字符串+公钥) = 明文字符串
  ```
  
  + 一般 客户端用公钥加密,服务端用私钥加密

##  栅格化grid和bootstrap和响应媒体查询

```
1.自响应媒体查询 2种使用方式
<style>
 @media screen and (min-width: 768px) {
 	.box {
 	  xxxx
 	}
 }
</style>
<link rel="stylesheet" href="./css/t2.css" media="screen and (min-width: 968px)">
2. 哪些条件
min-width max-width 视口的宽高
min-device-width max-device-width 设备宽高 用于移动端
```

```
2.grid栅格化
父元素 容器
display: grid 
grid-template-columns: 列1宽度 列2宽度 ...
grid-template-rows: 行1高度 行2高度...
grid-column-gap: 列间距
grid-row-gap: 行间距
grid-gap: 行间距 列间距
```



```
宽高单位:
% 
fr 表示剩余宽度的几份
auto-fill 作为repeat的num,根据宽度自适应填充
repeat(num, 长度...) 例子: repeat(1,10px 20px 30px)  repeat(3,50px)
auto 当同时使用了fr时,根据元素内容设置宽度
minmax(minWidth,maxWidth) 设置长度范围
```

```
3. 格式 设置 列行
grid-template-areas: "t1 t2 t3",
                    "t4 t5 t6"
```

```
4. 设置起始行列 末尾行列 (初始是1行1列)
grid-column-start: 1
grid-column-end: 2
grid-row-start: 1
grid-row-end: 2
复合设置
grid-column: 起始 / 末尾
grid-row: 起始 / 末尾
复合设置
grid-area: 行起始/列起始/行末尾/列末尾
```

```
5. 设置一个栅格中 元素内容位置 (给具体item设置)
justify-self: start center end stretch
align-self: start center end stretch
复合
place-self: 列排列 行排列
```

```
6.  默认排列顺序
grid-auto-flow: column / row
```

```
7. 设置栅格排列
justify-content
align-content
```

```

```

## bootstrap使用 优先 移动端响应布局

```
1.容器
div.container  版心 根据视口宽度改变宽度
div.container-fluid 通栏 100%
2.单行 12列,对应四种情况视口宽度情况,xs(<768) sm md(992>) lg(1200>)
<div class="row">
	div.col-xs-num 代表在视口小于768时,占总宽度 num / 12 的宽度
</div>
3.push和pull(本质上定位) 以及 offset(本质是margin-left)
col-lg-push-num 向右定位 num/12 总宽度 (不影响其他元素)
col-lg-pull-num 向左定位 num/12 总宽度 (不影响其他元素)
col-lg-offset-num 内容向右移动 num/12 总宽度 (影响其他元素)
4.在特定视口显示隐藏 并设置display
visible-type(xs,sm,md,lg)-display(block,inline,inline-block)
hidden-type(xs,sm,md,lg)
```

## 博客项目第一天

```
1.搭建项目已经前置准备工作
将hbs文件编译成js文件,用于生成html模板
npm i handlebars -g
npm i stylus -g
js文件中执行cmd: exec(`handlebars hbs路径 -f js文件路径`) 
例子:handlebars ./view/${name}.hbs -f ./viewJs/${name}.template.js
2.如何生成html
html页面中引入handelars和根据hbs生成的js文件
<script src="./node_modules/handlebars/dist/handlebars.runtime.js"></script>
<script src="./viewJs/index.template.js"></script>
let template = Handlebars.templates["index.hbs"]
console.log(template({title: "jzs"}));
3.stylus分部分书写
stylus -w ./styl/index.styl -o ./css/index.css
4.ES6模块引入语法
import test from "./test2.js"  export default obj/....
import {name,age} from "./test2.js"  export {name,age}
import {age} from "./test2.js"  export let age = 22
export default和普通export 同时出现时,优先输出export default
export写法本质: 在接口名与模块内部变量之间，建立了一一对应的关系。
```

+ process.cwd() 返回的是执行cmd命令时的工作目录

+ Node环境中 html中引入js模块,需要设置标签type=module

## 博客项目第二天

```
1.完成登录注册的蒙版页面编写
复习jq和bootstrap的组件使用
<div data-test='222'>
$("div").data("test")   //222
蒙版 fixed top bottom left right均为0
```

## 博客项目第三天

```
2.验证类的编写 npm i validator.tool (源码自己修改过)
样例使用:
<form action="javascript:;" id="test">
    <input type="text" name="email">
    <input type="text" name="pwd">
    <input type="button" value="submit">
  </form>
  <script>
    let validate = new Validator("test",[
      {
        name: "email",
        display: "email格式错误",
        rules: "required|is_email|max_length(30)"
      },
      {
        name: "pwd",
        display: "pwd格式错误",
        rules: "required|is_pwd|max_length(12)"
      }
    ],function (obj, evt) {
      console.log(obj.errors);
      console.log(evt);
    })
    
    document.querySelector("[type=button]").onclick = function (e) {
      validate.validate() //触发验证操作
    }
  </script>
```

+ 正则表达式 预检: 先匹配有效正则项,匹配成功后,如果匹配项是原字符的一部分,前后有剩余项,则进行前后的预检,没有剩余项,则直接成功,不用预检

  ```
  console.log("45asDS343".match(/(?<!\d+)[a-z|A-Z]+/));   // "sDs"
  ```

  ## 博客项目第四天
  
  ```
  1.完成前端请求和后端接口对接
  ```
  
  ```
  axios拦截器使用:
  const instance = axios.create({
          timeout: 2000
        });
        instance.interceptors.request.use(function (config) {
          // 在发送请求之前做些什么
          console.log(config, "config");
          config.headers.Authorization = "haonnie"
          return config;
        }, function (error) {
          // 对请求错误做些什么
          return Promise.reject(error);
        });
  
        // 添加响应拦截器
        instance.interceptors.response.use(function (response) {
          // 对响应数据做点什么
          console.log(response, "response");
          // response = response.data
          // let resObj = {
          //   data: response.data,
          //   status: response.status
          // }
          // response = response.data
          return response.data;
        }, function (error) {
          // 对响应错误做点什么
          return Promise.reject(error);
        });
  ```
  
  ```
  1.设置默认host port
  axios.defaults.baseURL = 'http://127.0.0.1:3000'
  2.添加请求头
  instance.defaults.headers.common['Authorization'] = "Bearer " + getToken()
  ```
  
  + 在发送请求和返回响应之前 进行一些操作
  
  ```
  2.npm i store
  封装了localStorage,快捷使用.
  ```
  
  ## 博客项目第五天
  
  ```
  1.完成业务部分重构,根据是否有登录,实现展示头像和登录注册,使用富文本插件添加博客
  ```
  
  ```
  npm i wangeditor 富文本编辑器
  let editor =  new wangEditor(".blog-edit")
  editor.create()
  ```
  
  

## 博客项目第6天 前端路由

```
1.npm i sme-router
<script src="../myBlog/node_modules/sme-router/index.js"></script>
const Router = window["sme-router"].default
    const bodyRouter = new Router("test") //容器id
    bodyRouter["_mount"] = document.querySelector(".test")
    
    bodyRouter.route("*",function (req,res,next) {
      console.log("*");
    })
    bodyRouter.route("/test",function (req,res,next) {
      res.render("<p>你好捏</p>")
    })
    bodyRouter.route("/haha/erere/:id",function (req,res,next) {
      
    })
    bodyRouter.route("/haha/erere/:id",function (req,res,next) {
      console.log(req,"req");
      console.log(res,"res");
    })
```

```
2. hash和history
```

```
hash:
location.hash可读可写
window.addEventListener("hashchange",function (e) {
      console.log(location.hash);
})
```

```
history
(function () {
      var examplebox = document.getElementById('example')
      var mainbox = document.getElementById('main')

      examplebox.addEventListener('click', function (e) {
        e.preventDefault() //阻止默认行为
        var elm = e.target
        var uri = elm.href
        var tlt = elm.title
        //history 对象 H5 管理浏览状态 浏览历史
        history.pushState({ path: uri, title: tlt }, tlt, uri)
        mainbox.innerHTML = 'current page is ' + tlt
      })
      //监听history的state变化
      window.addEventListener('popstate', function (e) {
        var state = e.state
        console.log(state)
        mainbox.innerHTML = 'current page is ' + state.title
      })
    })()
```

+ 使用sme-router  路由参数中的req的body值是通过go方法传递的,在地址上直接输入路由地址无法传值

## webpack 第一天

```
1.环境记录..之后配置仅用于该旧版本
"devDependencies": {
    "clean-webpack-plugin": "^3.0.0",
    "css-loader": "^5.0.1",
    "file-loader": "^6.2.0",
    "handlebars": "^4.7.6",
    "handlebars-loader": "^1.7.1",
    "html-webpack-plugin": "^4.5.0",
    "style-loader": "^2.0.0",
    "stylus": "^0.54.8",
    "stylus-loader": "^4.3.1",
    "webpack": "^5.9.0",
    "webpack-cli": "^4.2.0",
    "webpack-dev-server": "^3.11.0",
    "webpack-merge": "^5.8.0"
}
```

```
webpack结构: 
根目录下  dist用于存放打包好的js文件和引入了该js文件的页面(如果插件自动生成的话)
		src存放你的源码
```

![123](C:\Users\A\Desktop\fast\123.png)

```
2.基本概念 出入口 加载器 插件
出入口:
单路口
entry: 路径字符串
多路口
entry: {
key: 路径1,
key: 路径2
}
单出口
output: {
filename: "xx.js",
path: 绝对路径
}
多出口
output: {
filename: "[name].build.js",
path:绝对路径
}
```

```
3. 加载器  webpack默认只能打包js内容,所以需要各种加载器 打包不同文件
```

```
1.先把对应loader下载到项目中
```

```
2.配置
module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader"
        ]
      },
      {
        test: /\.styl$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader"
          },
          {
            loader: "stylus-loader"
          }
        ]
      },
      {
        test: /\.hbs$/i,
        use: [
          "handlebars-loader"
        ]
      },
      {
        test: /\.png|jpg|gif$/i,
        use: [
          "file-loader"
        ]
      },
      {
        //字体资源 编译loader
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: [
          "file-loader",
        ]
      }
    ]
  }
```

```
4. 插件 
```

```
const {CleanWebpackPlugin} = require("clean-webpack-plugin")
const  HtmlWebPack = require("html-webpack-plugin")

// plugins: [
  //   new CleanWebpackPlugin(),
  //   new htmlWebPack({
  //     title: "mikusama",
  //     // template: "./config/test.html",
      
  //   })
  // ]
```

+ Clean 用于每次重新编译,先清空dist下的文件

+ Htmlwebpack用于 根据一个指定路径初始html文件,引入打包后的js文件,生成新的html文件,存放于dist目录中.

```
5. 分环境 设置配置文件
npm i webpack-merge -D


const {merge} = require("webpack-merge")
const common = require("./webpack.common.js")
//merge可以理解为对象合并assign
module.exports = merge(common, {
  
})
```

```
6.其他属性
devtool: "inline-source-map",//运行时 保留源码 可debug

devServer: {
    contentBase: path.join(__dirname, '/dist/'),       //虚拟资源服务器所处的位置,默认是根目录
    host: 'localhost',
    port: 8080,
    open: true
}
devServer用于快速打开 编译完后的最终html文件
```

```
7.cmd命令
npx webpack --config webpack.config.js --watch 监听入口模块和html模板,有改动会实时更新
webpack serve --config webpack.config.js   快速打开 编译完后的最终html文件 进行预览
```

## webpack进阶

```
1.在devserver预览时,打开一个依赖关系图,显示了依赖的大小数量等信息
npm i webpack-bundle-analyzer -D
const  {BundleAnalyzerPlugin} = require("webpack-bundle-analyzer")
plugins: [
    new BundleAnalyzerPlugin()
  ]
```

```
2. 根据条件分出一个共同依赖文件,避免重复引入
const webpack = require("webpack")
plugins: [
	new webpack.optimize.splitChunksPlugin()
]
optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all", //同步异步等
        }
      }
    }
  }
```

```
3. 禁止打包某些模块 使用cdn加载他们
externals: {
    jquery: 'jQuery',
    axios: "axios",
    bootstrap: "bootstrap"
 }
参数的key是模块的name,比如 import jq from "jquery",value 是key的驼峰命名写法.
```

## 非工程化项目 修改为webpack工程化项目



```
非工程化项目 进行 webpack工程化改建

1. 梳理js 模块
  1. 梳理第三方模块 
    node_modules
    validator.tool wangeditor sme-router store jsencrypt axios
    体量小 功能单一 在部分 原生模块中引入使用

  2. 梳理CDN 非本地 第三方模块
    jquery bootstrap
    体量大 功能复杂 全局产生作用 

  3. 整理原生模块中的导入情况

    之前通过js直接引入到html文件 
      第三方模块 的导出前言判断 都可以挂载到 window对象上

    import 导入第三方模块
      webpack 会从 node_modules内寻找模块 文件 进行模块化兼容封装处理 帮我们 把处理好的 第三方模块 导入原生模块中
      语法: import 模块自定义别名 from '第三方模块名'

      $ 就是 jquery的 别名 也是 jquery 的标识符

2. 梳理 预处理/模板 资源
  1. webpack 引入对应 loader处理编译对应文件

  2. hbs模板 

    before
      hbs模板文件 xxx.hbs 需要手动 使用 handlebars 工具编译 生成 对应模板的 compile函数 Handlebars.templates[文件原名]

    调用的时候 从全局获取Handlebars属性去拿 对应的模板编译函数来处理数据 生成 html

    after
      webpack + handlebars + handlebars-loader
      
      在第一方模块中引入 hbs文件

      打包 或者 dev 模式开发 webpack会自动的识别 .hbs后缀的导入内容 结合loader 编译好 compile函数 赋值给 import 别名
      
  3. style样式文件 不变 
     直接使用 stylus 监听编译 生成css文件 直接引入到 HTML内

3. 整理webpack工程化项目目录结构 和 配置文件

  1. dist 输出目录
  2. src 待编译资源
  3. public/assets 静态资源 css / img
  4. app 原生模块存放
  5. html页面模板文件
```

+ webpack会将所有的es6模块转成commonjs规范，然后再提供给nodejs进行解析。

```
4.webpack 属性补充
output: {
    //输出文件名称
    filename: '[name].build.js',
    //输出文件路径
    path: path.resolve(__dirname, '../dist'),
    publicPath: "/assets/"    设置打包后的js文件的基础目录
  },
  
resolve: {
    alias: {
      Utilities: path.resolve(__dirname, '../src/util/'),  设置路径别名,在引入模块时使用.
    },
    //第三方模块解析来源
    modules: ['node_modules'],
    //解析 模块后缀默认 ext
    extensions: ['.js', '.json'],     //webpack可以编译 import 不带后缀js文件的原因
    mainFields: ['loader', 'main']
  }
```

+ 字符格式处理类库 inflection

## 登录注册重构

> 1.npm i http-assert 用于抛出错误,被catch捕获

```
assert(false,code,message) 当一个参数为false,触发抛错
```

> 2.npm i http-errors 用于生成错误对象

```
let createError = require("http-errors")
中间件传递错误对象 next(createError(code,message))
```



```
错误处理中间件 用于返回错误信息
app.use(function (err, req, res, next) {
  res.status(err.status || 500).send({
    code: err.status,
    message: err.message
  });
  // res.render('error');
});
```

```
npm i mongoose-sex-page
用于对数据进行分页操作
```

+ *let* result = await User.find().setOptions(req.body)  req.body={sort:"username" ,limit:3} 前端传参快捷筛选数据

## 博客 多表联系 接口

```
req.model.modelName //获取model开始设置时的name
```

## express-jwt 鉴权 

```
app.use(expressJwt({
  secret: publicKey,
  algorithms: ["RS256"],
  isRevoked: function (req, payload, next) {
    if (payload.id) {
      req._id = payload.id
      req.isPass = true
    }
    next()
  }
}).unless({
  path: [
    {url: "/key",methods: "GET"},
    {url: "/admin/login",methods: ["GET","POST"]},
    {url: "/admin/regis",methods: ["GET","POST"]},
    {url: "/search",methods: "GET"},
    {url: "/api/rest/articles",methods: "GET"},
    {url: "/api/rest/comments",methods: "GET"},
    {url: "/api/rest/classify",methods: "GET"},
    {url: "/nice",methods: ["GET","POST"]},
  ]
}))
```

+ axios进行get请求时,第二个参数是配置对象,可以使用{params:{key:value}} key和value将拼接在url上

## mongoose 取值时设置

```
存入monngose将json转为bjson
取出monngoose值是bjson,需要配置,将bjson转化为json,才能在get方法中对数值进行计算.
pattern.set("toJSON", { "getters": true })

```

