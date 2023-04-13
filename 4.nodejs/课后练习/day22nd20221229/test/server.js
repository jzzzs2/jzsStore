/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-29 19:31:47
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-29 20:57:03
 */
const http = require("http")
const fs = require("fs")
const path = require("path")
const url = require("url")
const multiparty = require("multiparty")
http.createServer(function (req, res) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.setHeader("Access-Control-Allow-Origin", "*");
  //我容许跟我不同源的页面像我发起请求
  //允许的header类型
  res.setHeader('Access-Control-Allow-Headers', 'x-requested-with,Authorization,token, content-type');
  //跨域允许的请求方式
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
  //可选，用来指定本次预检请求的有效期，单位为秒。在此期间，不用发出另一条预检请求。
  res.setHeader('Access-Control-Max-Age', 1728000);//预请求缓存20天
  let method = req.method.toUpperCase()
  if (method === "OPTIONS") {
    console.log("opt");
    res.end("ok")
    return false
  }
  if (method === "POST") {
    let party = new multiparty.Form({
      uploadDir: "./upload"
    })
    party.parse(req, function (err, fields, files) {
      console.log(fields, files, "xxxxxxxx");
      res.write("ok")
      res.end()
    })
  }
}).listen(8080, function () {
  console.log("8080 start");
})