/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-31 19:00:51
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-31 19:41:00
 */
const fs = require("fs")
const http = require("http")
const path = require("path")
const express = require("express")
const user = require("./routes/user")
let app = express()

app.use("/user",user)


let server = http.createServer(app)
server.listen(3001,function () {
})
// server.on("listening",function () {
// })
// server.on("request",function () {
  
// })