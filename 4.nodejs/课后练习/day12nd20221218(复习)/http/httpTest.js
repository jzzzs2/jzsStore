/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-18 18:52:34
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-18 21:08:33
 */
let http = require("http")
let url = require("url")
http.createServer(function (req, res) {
  console.log(req.method);
  console.log(req.url);
  console.log(req.headers["content-type"]);
  console.log(req.headers["content-length"]);
  req.on("data",function (chunk) {
    console.log(chunk.toString(),"reqData");
  })
  req.on("end",function (err) {
    console.log("数据传输结束");
  })
  res.writeHead(200,{"Content-Type": "text/plain;charset=utf8"})
  res.write("可爱捏")
  res.end()
}).listen(3001)
let urlObj = url.parse("http://127.0.0.1:3001/user/test?name=jzs&age=22")
console.log(urlObj.port);
console.log(urlObj.search);
console.log(urlObj.query);
console.log(urlObj.pathname); //包括search的资源路径
console.log(urlObj.path); //不search的资源路径
console.log(urlObj.href);
console.log(urlObj.host);
console.log(urlObj.protocol);