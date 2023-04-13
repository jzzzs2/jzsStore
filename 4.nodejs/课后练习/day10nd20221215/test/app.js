/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-15 17:54:20
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-15 18:38:44
 */
let fs = require("fs")
let http = require("http")
let path = require("path")
let url = require("url")
let str = require("querystring")
http.createServer(function (req,res) {
  // console.log(req);
  console.log(req.method);
  console.log(req.url);
  console.log(req.httpVersion);
  // console.log(req.headers);
  req.on("data", function (chunk) {
    console.log(chunk,"shuju");
    console.log(chunk.toString("utf8"));
  })
  req.on("end",function () {
    console.log("获取数据结束");
  })
  res.writeHead(200,{"Content-Type": "text/plain;charset='utf8'"})
  res.write("send success")
  res.end()
}).listen("3002")