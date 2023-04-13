/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-20 16:52:55
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-20 17:43:45
 */
let http = require("http")
let url = require("url")
let path = require("http")
http.createServer(function (req, res) {
  let url = req.url
  let method = req.method.toUpperCase()
  res.writeHead(200, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    'Access-Control-Allow-Headers': 'x-requested-with,Authorization,token, content-type',
    "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS,PATCH",
    "access-control-max-age": "1728000",
  })
  if (!(/data/.test(url))) {
    res.end("你这个请求资源路径不太对哦")
    return false
  }
  if (method !== "POST") {
    res.end("你这个请求的方式不太对哦")
    return false
  }
  if (url === "OPTION") {
    console.log("跨域 预请求接收到了 ");
    res.end("ok")
  }
  let type = req.headers["content-type"]
  console.log(type);
  if (mapContentType(type) !== "json") {
    res.end("你发送的这个数据不是json哦")
    return false
  }

  req.on("data", function (chunk) {
    console.log(chunk.toString());
    let str = chunk.toString()
    if (!(isJson(str))) {
      return false
    }
    res.write(chunk.toString())
    res.end()
    return false
  })
  req.on("end", function () {
    console.log("数据接收完毕");
  })
}).listen(3001)
function isJson(data) {
  try {
    JSON.parse(data)
    return true
  } catch (error) {
    console.log("fail");
    return false
  }
}
function mapContentType (type) {
  let map = {
    "application/json":"json",
    "multipart/form-data":"file",
    "application/x-www-form-urlencoded":"form",
    "text/plain;charset=utf8": "text"
  }
  return map[cut(type)]
}
function cut (str) {
  return str.split(";")[0]
}