/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-14 17:37:56
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-14 17:40:57
 */
let http = require("http")
const server = http.createServer((request,response) => {
  console.log("有人访问了服务",request);
  response.statusCode = 200
  response.setHeader("Content-type", "text/plain;charset=utf-8")
  response.end("你好 欢迎来到server 服务")
})
server.listen(8888, ()=> {
  console.log("服务器运行中")
})