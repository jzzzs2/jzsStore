/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-30 18:37:49
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-30 18:49:32
 */
const http = require("http")
const fs = require("fs")
const express = require("express")
let app = express()
app.all("/",function (req,res,next) {
  console.log("all");
  next()
})
app.get("/",function (req,res,next) {
  console.log("get one");
  next()
},function (req,res,next) {
  console.log("get two");
  next()
})
app.post("/",function (req,res,next) {
  console.log("post");
  next()
})
app.put("/",function (req,res,next) {
  console.log("put");
  next()
})
app.delete("/",function (req,res,next) {
  console.log("delete");
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