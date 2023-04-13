/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-03-28 16:22:48
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-06 17:06:47
 */
let { formatDate, toDouble } = require("./dateFormat")
let app = require("./app")
let http = require("http")
let server = http.createServer(app)
server.listen(8888)
// let io = require("socket.io")(server,{ transports: ["websocket"] })
let io = require("socket.io")(server, { transports: ["websocket"] })
let socketObjMap = {}
let socketUser = {}
io.on("connection", socket => {
  // console.log(socket.id, "id",socket.client);
  console.log(socketObjMap,"聊天室成员");
  console.log(socket.id, "id");
  // socket.testName = "test"
  socket.on("getSockets",() => {
    return socketUser
  })
  socket.on("loginUser",({nickname,uid}) => {
    console.log(nickname,"nickname");
    if (socketUser[nickname]) {
      console.log("已存在该用户");
      socketUser[nickname].socket.disconnect()
      delete socketUser[nickname]
    }
    socketUser[nickname] = {
      socket,
      uid,
      nickname
    }
  })
  socket.on("login", ({ nickname }) => {
    console.log("nickname",nickname);
    if (socketObjMap[nickname]) {
      //nickname重复
      socket.emit("enter", { nickname: "用户名重复", error: true })
      return false
    }
    socket["nickname"] = nickname
    socketObjMap[nickname] = {
      nickname, socket, time: formatDate()
    }
    socket.emit("enter", { type: "action", user: "me", nickname, msg: `${nickname}进入了聊天室~` })
    socket.broadcast.emit("enter", { type: "action", msg: `${nickname}进入了聊天室~ ${formatDate()}` })
  })
  socket.on("disconnect", () => {
    console.log("quittttttttttttttttt");
    delete socketObjMap[socket.nickname]
    console.log("登出");
    io.sockets.emit("leave", { type: "action", msg: `${socket.nickname}离开了聊天室~ ${formatDate()}` })
  })
  socket.on("chat", ({ nickname, msg }) => {
    socket.emit("receive", { nickname, msg, time: formatDate(), type: "right" })
    socket.broadcast.emit("receive", { nickname, msg, time: formatDate(), type: "left" })
  })
})
module.exports = server
// let WebSocket = require("ws").Server
// let server = new WebSocket( {port: 8888})
// server.on("connection",function (req) {
//   console.log("服务器连接");
//   req.on("message",function (msg) {
//     console.log("msg",msg);
//     req.send(msg + "123")
//   })
// })
// console.log("服务端 连接",socket.id,io.sockets.length,socket.broadcast.length);
  // console.log("服务端 连接",socket.id);
  // console.log("服务端 连接",socket.id,socket.broadcast,io.sockets);
  // socket.on("message",data => {
  //   console.log("服务端接收到数据",data,"message");
  // })
// 客户端
// enter nickname action
// leave nickname action
// receive nickname,time,msg,type
// 服务器端
// login nickname action
// logout nickname action
// chat nickname,msg