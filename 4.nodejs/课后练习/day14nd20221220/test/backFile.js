/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-20 16:53:38
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-20 19:13:51
 */
let http = require("http")
let url = require("url")
let fs = require("fs")
let path = require("path")
http.createServer(function (req, res) {
  let url = __dirname
  res.writeHead(200, {
    "Content-Type": "application/octet-stream",
    "Access-Control-Allow-Origin": "*",
    'Access-Control-Allow-Headers': 'x-requested-with,Authorization,token, content-type',
    "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS,PATCH",
    "access-control-max-age": "1728000",
  })
  if (!(/file/.test(req.url))) {
    res.end("你这个请求资源路径不太对哦")
    return false
  }
  if (req.method !== "POST") {
    res.end("你这个请求的方式不太对哦")
    return false
  }
  req.on("data", function (chunk) {
    let fileName = JSON.parse(chunk.toString("utf8"))["fileName"]
    console.log(url);
    url = path.normalize(url + `/upload/${fileName}`)
    fs.readFile(url, function (err, data) {
      res.write(data, "binary")
      res.end()
    })
  })

}).listen(3001, function () {
  console.log("over");
})