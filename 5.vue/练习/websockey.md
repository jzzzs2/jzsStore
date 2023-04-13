## WEbSocket 有状态持续通信协议

```
1.客户端与服务器端双向通信
客户端（vue）
this.ws = new WebSocket("ws://127.0.0.1:8888")
    this.ws.addEventListener("message",(event) =>{
      console.log(event.data,"event")
      this.serverMessage = event.data
    })
    this.ws.addEventListener("open",(e) => {
      console.log("客户端连接",this.ws.readyState,e);
      this.ws.send("hello server")
    })
    this.ws.addEventListener("close",function (ws) {
     console.log(e,"客户端关闭连接");
    })
服务器端
let WebSocket = require("ws").Server
let server = new WebSocket( {port: 8888})
server.on("connection",function (req) {
  console.log("服务器连接");
  req.on("message",function (msg) {
    console.log("msg",msg);
    req.send(msg + "123")
  })
})
```

##  聊天室

```
1.客户端
npm i socket.io-client@3
import { io } from "socket.io-client";
let socket = io("ws://127.0.0.1:8888", { transports: ["websocket"] });
socket.on("connect", () => {
      socket.on("enter", (obj) => {
        
      });
      socket.on("leave", (obj) => {
        
      });
      socket.on("receive", (obj) => {
        
      });
    });
```

```
socket.close() 关闭客户端socket
```



```
2.服务端
npm i socket.io@4
let app = require("./app")
let http = require("http")
let server = http.createServer(app)
server.listen(8888)
let io = require("socket.io")(server, { transports: ["websocket"] })
io.on("connection", socket => {
  //socket会话对象
  //socket.id 客户端会话id
  //socket.client 对基础Client对象的引用
  socket.broadcast 除了当次socket以外的io的所有sockets
  io.sockets 服务端监听的所有sockets
  socket.on("disconnect", () => {
   //默认事件,当客户端socket关闭时触发
  })
 
})
```

```
socket会话对象
  socket.id 客户端会话id
  socket.client 对基础Client对象的引用
  socket.emit('message',data)
  socket.on('message',(data)=>{
  })
  socket.broadcast 除了当次socket以外的io的所有sockets
  //触发事件
  socket.emit('事件名称',信息)
io
	io.on 监听事件
    	connection client客户端建立ws连接
    	disconnect client客户端断开ws连接
    	disconnecting 断开中
    io socket服务对象
	io.sockets 服务端监听的所有sockets
	io.close()
	io.emit 触发事件 自定义事件
```



