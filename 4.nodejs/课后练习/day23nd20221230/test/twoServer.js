/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-30 18:37:49
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-30 18:53:30
 */
const http = require("http")
const fs = require("fs")
const express = require("express")
let app = express()
app.use(function (req,res,next) {
  console.log("middle case one f");
  next()
  console.log("middle case one l");
})
app.use(function (req,res,next) {
  console.log("middle case two f");
  next()
  console.log("middle case two l");
})
app.use(function (req,res,next) {
  console.log("middle case three f");
  next()
  console.log("middle case three l");
})
let server = http.createServer(app)
server.listen(3001)
server.on("listening",function () {
  console.log("listening");
})
server.on("request",function () {
  console.log("request");
})