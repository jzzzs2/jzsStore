/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-15 20:14:46
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-15 20:46:17
 */
let http = require("http")
let fs = require("fs")
let url = require("url")
let query = require("querystring")
http.createServer(function (req,res) {
  console.log(req.method,req.url);
  // console.log(url.parse(req.url));
  if (req.method !== "GET") {
    console.log("不是get请求都不可以捏");
    res.end()
    return false
  }
  if (!/\/user/.test(req.url)) {
    console.log("需要路径是user的才能进入呢");
    res.end()
    return false
  }
  // if (!(req.headers["content-type"].includes("application/x-www-form-urlencoded"))) {
  //   console.log("只接收表单数据捏");
  //   res.end()
  //   return false
  // }
  req.on("data",function (chunk) {
    console.log(chunk);
  })
  req.on("end",function () {
    console.log("date receive end");
  })
  console.log(url.parse(req.url));
  let obj = query.parse(url.parse(req.url)["query"])
  console.log(obj);
  res.writeHead(200,{"Content-Type":"text/plain;charset=utf8"})
  res.write(`欢迎回家 主人 ${obj.record}`)
  res.end()
}).listen(3008)