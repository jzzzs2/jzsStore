/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-30 18:37:49
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-30 19:05:02
 */
const http = require("http")
const fs = require("fs")
const express = require("express")
let app = express()
app.use("/user",function (req,res,next) {
  req["test"] = [2,4,3]
  console.log(req.params["addr"],"params");
  app.enable("toggle")
  app.disable("lock")
  app.set("age",req.query["age"])
  next()
  console.log(req.params["addr"],"params /user");
})
app.use("/user/:addr",function (req,res,next) {
  app.set("addr",req.params["addr"])
  next()
})
app.use(function (req,res,next) {
  console.log(app.get("addr"),"addr");
  console.log(app.get("toggle"),"toggle");
  console.log(app.get("lock"),"lock");
  console.log(app.get("age"),"age");
  console.log(req["test"],"test");
  next()
})
let server = http.createServer(app)
server.listen(3001)
server.on("listening",function () {
  console.log("listening");
})
server.on("request",function () {
  console.log("request");
})