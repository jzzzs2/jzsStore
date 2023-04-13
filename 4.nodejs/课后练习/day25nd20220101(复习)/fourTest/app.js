/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-01 15:39:22
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-01-01 16:35:52
 */
const http = require("http")
const fs = require("fs")
const path = require("path")
const express = require("express")
const multer = require("multer")
let app = express()
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))
// app.set("food","fish")
// app.set("addr","jinhua")
// app.enable("prop","chi")
// app.disable("sleep","sj")
let storage = multer.diskStorage({
  destination: function (req,file,cb) {
    cb(null,path.join(__dirname,"/public"))
  },
  filename: function (req, file, cb) {
    console.log(file,"File")
    // let nameObj = path.parse()
    cb(null,file.originalname)
  }
})
let fileOper = multer({storage})

// app.use("/user/:name",fileOper.single("file"),function (req,res,next) {
//   // res.json({"name": "jzs"})
//   // res.jsonp([2,4,6])
//   // res.send("baidu")
//   // console.log(app.locals.settings);
//   // console.log(req.baseUrl,"URL");
//   // console.log(req.query,"QUERY");
//   // console.log(req.body,"body");
//   // console.log(req.get("Cookie"),"Cookie");
//   // console.log(req.get("content-type"),"content-type");
//   // res.append("kygree","toedsf")
//   // res.sendFile(path.join(__dirname,"/public/1.png"))
//   res.send("keainie")
// })
app.use("/user",route)
http.createServer(app).listen(3001)