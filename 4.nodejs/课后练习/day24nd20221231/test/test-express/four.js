/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-31 19:00:51
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-31 19:56:28
 */
const fs = require("fs")
const http = require("http")
const path = require("path")
const express = require("express")
const user = require("./routes/user")
let app = express()

app.use(express.static(path.join(__dirname,"/public")))

app.use("/images/*",function (req,res,next) {
  console.log(req.baseUrl);
  if (req.baseUrl !== "/images/1.jpg") {
    res.redirect("/images/1.jpg")
  }
})
let server = http.createServer(app)
server.listen(3001,function () {
})
// server.on("listening",function () {
// })
// server.on("request",function () {
  
// })