/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-28 18:06:20
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-28 19:57:03
 */
const http = require("http")
const path = require("path")
const express = require("express")
let app = express()
// app.use(express.json())
app.use("/", function (req, res, next) {
  console.log("wo si /");
  next()
})
app.use("/user", function (req, res, next) {
  console.log("wo si user");
  next()
})
app.use("/user/:name", function (req, res, next) {
  console.log("wo si /user/xxx");
  next()
})
app.use("/user/abc?d",function (req,res,next) {
  console.log("wo si abd or abcd");
  next()
})
app.use("/user/a+",function (req,res,next) {
  console.log("wo si /user/aaaaa");
  next()
})
app.use(/\/user\/food/,function (req,res,next) {
  console.log("/user/food");
  next()
})
app.use("/user/*",function (req,res,next) {
  console.log("/user/*");
  next()
})
app.use("/user/\*ood",function (req,res,next) {
  console.log("* random");
  next()
})
app.use(["/user/*",/\/user\/food/,/\/user|\/format/],function (req,res,next) {
  console.log("array");
  next()
})
app.use(function (req,res,next) {
  console.log("gg");
  res.send("404 not found")
})
http.createServer(app).listen(3001,function () {
  console.log("3001 port start !");
})
