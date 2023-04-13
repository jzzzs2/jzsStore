/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-31 19:00:51
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-31 19:13:55
 */
const fs = require("fs")
const http = require("http")
const path = require("path")
const express = require("express")

let app = express()
let server = http.createServer(app)
server.listen(3001,function () {
  app.set("test","abc123")
  app.locals["food"] = "noodle"
  console.log(app.locals,"全局属性");
  console.log(app.settings,"全局属性settings");
  // console.log("XXX",app);
  console.log("xx",app.get("env"),app.get("test"),"xxx",app.get("views"));
  console.log("3001 port start");
})
server.on("listening",function () {
})
server.on("request",function () {
  
})