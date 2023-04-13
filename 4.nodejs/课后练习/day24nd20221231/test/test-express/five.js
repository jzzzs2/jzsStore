/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-31 19:00:51
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-31 20:26:51
 */
const fs = require("fs")
const http = require("http")
const path = require("path")
const express = require("express")
const user = require("./routes/user")
let app = express()

// app.use(express.json({
//   // limit: 1000,
//   // strict: false
// }))
app.use(express.json({
  limit: 100
}))
// app.use(express.urlencoded({extended: false}))
app.post("/user/:food",function (req,res,next) {
  console.log(req.query,"query");
  console.log(req.body,"body");
  res.send("success")
})
let server = http.createServer(app)
server.listen(3001,function () {
})
// server.on("listening",function () {
// })
// server.on("request",function () {
  
// })