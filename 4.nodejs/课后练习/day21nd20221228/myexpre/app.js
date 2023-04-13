/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-28 18:06:20
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-28 20:25:00
 */
const http = require("http")
const path = require("path")
const express = require("express")
let app = express()
app.use(express.urlencoded({extended: true}))
// app.use(express.json())
app.use("/", function (req, res, next) {
  console.log("我是默认绝对路径");
  console.log(req.params, req.params["name"], "params");
  console.log(req.baseUrl, "baseUrl");
  console.log(req.query, "query");
  console.log(req.body, "body");
  console.log(req.hostname, "hostname");
  app.locals.method = req.method
  res.send(path.join(__dirname, "/public/html/a.html"))
  // res.jsonp({addr: "jinhua", age: 22})
  // res.json({ "name": "jzs", "age": 22 })
  // res.sendStatus(404)
  // next()
})
app.use("/user", function (req, res, next) {
  // console.log("我是user路径");
  // console.log(req.baseUrl,"/user");
  console.log(app.locals.method,"Method");
  res.append("name","jzs")
  res.json({"name": "jzs"})
  // next()
})
app.use("/user/:name", function (req, res, next) {
  console.log(req.params, req.params["name"], "params");
  console.log(req.baseUrl, "baseUrl /user/xxxx");
  console.log(req.query, "query");
  console.log(req.body, "body");
  console.log(req.hostname, "hostname");
   console.log(req.get('content-type'),"content-type")
  console.log(req.get('Cookie'),"Cookie")
  // console.log(req.get("Cookie"),"get method");
  // console.log(req.get("Content-Type"),"get method");
  // res.send("keainie")
  // res.sendFile(path.join(__dirname, "/public/html/a.html"))
  // res.sendFile(path.join(__dirname,"/public/images/qute.png"))
  res.json({"name": "jzs"})
  // next()
})
app.use(function (req,res,next) {
  console.log("gg");
  // res.send("404 not found")
})
http.createServer(app).listen(3001)
