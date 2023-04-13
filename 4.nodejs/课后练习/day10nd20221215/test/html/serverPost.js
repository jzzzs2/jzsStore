/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-15 19:32:42
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-15 20:09:56
 */
let fs = require("fs")
let http = require("http")
let path = require("path")
let query = require("querystring")
let {formatUrl} = require("./format")
http.createServer(function (req, res) {
  let method = req.method
  let url = req.url
  // console.log(req.headers);
  console.log(method, url);
  res.writeHead(200, { "Content-Type": "text/plain;charset=utf8" })
  req.on("data", function (chunk) {
    console.log(formatUrl(chunk.toString("utf8")));
    let content = formatUrl(chunk.toString("utf8"))["record"]
    res.write(`欢迎回家主人 ${content}` )
    res.end()
  })
  req.on("end", function () {
    console.log("数据传输完毕");
  })
  console.log(req.headers['content-type']);
  console.log(req.headers['content-length']);
  // res.write("success")
  // res.end()
}).listen(3002)