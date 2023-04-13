/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-31 19:00:51
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-31 19:29:22
 */
const fs = require("fs")
const http = require("http")
const path = require("path")
const express = require("express")

let app = express()
//应用中间件 对任何请求提供服务
app.use(function (req,res,next) {
  console.log("all path");
  next()
})
//路由中间件 对特定请求提供服务
app.use("/user/:path",function (req,res,next) {
  console.log("user");
  // if (req.params["path"] !== "eat") {
  //   let err = new Error("path is not eat")
  //   next(err)
  // }
  fs.readFile("./a.txt",function (err,data) {
    if (err) {
      next(err)
    }
    next()
  })
})
app.use(function (req,res,next) {
  console.log("test");

  next()
})
//错误处理中间件
app.use(function (err,req,res,next) {
  console.log(err.message,"msg");
  console.log(err.stack,"stack");
  // res.send(404,"fail")
  res.json({
    msg: err.message,
    code: 404
  })
})

let server = http.createServer(app)
server.listen(3001,function () {
})
// server.on("listening",function () {
// })
// server.on("request",function () {
  
// })