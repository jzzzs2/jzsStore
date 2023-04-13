/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-30 18:37:49
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-30 20:49:33
 */
const http = require("http")
const fs = require("fs")
const express = require("express")
const multer = require("multer")
const path = require("path")
let app = express()
let storage = multer.diskStorage({
  destination: function (req,file,cb) {
    console.log(file,"destination");
    let url = path.join(__dirname,`/upload/${req.params["ID"]}`)
    fs.existsSync(url) || fs.mkdirSync(url)
    console.log(url,"url");
    url = path.join(url,`${req.params["path"]}`)
    fs.existsSync(url) || fs.mkdirSync(url)
    cb(null,url)
  },
  filename: function (req,file,cb) {
    let nameObj = path.parse(file.originalname)
    console.log(nameObj,"nameObj");
    let name = nameObj["name"] + Date.now() + nameObj["ext"]
    console.log(name,"destination");
    cb(null, name)
  }
})
let fileOper = multer({storage})
app.use("/user/:ID/upload/:path",fileOper.single("file"),function (req,res,next) {
  res.send("ok")
})
let server = http.createServer(app)
server.listen(3001)
server.on("listening",function () {
  console.log("listening");
})
server.on("request",function () {
  console.log("request");
})