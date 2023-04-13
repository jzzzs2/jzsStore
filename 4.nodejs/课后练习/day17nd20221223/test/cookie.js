/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-20 16:53:23
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-23 18:55:07
 */
let fs = require("fs")
let path = require("path")
let url = require("url")
let http = require("http")
let multiparty = require("multiparty")
let querystr = require("querystring")
http.createServer(function (req, res) {
  let urlName = req.url
  let method = req.method.toUpperCase()
  let reqType = req.headers["content-type"]
  console.log(reqType);
  res.setHeader('content-type', 'text/plain;charset=utf8')
  // res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  //允许的header类型
  res.setHeader('Access-Control-Allow-Headers', 'x-requested-with,Authorization,token, content-type,name ,age,addr');
  //跨域允许的请求方式
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
  //可选，用来指定本次预检请求的有效期，单位为秒。在此期间，不用发出另一条预检请求。
  res.setHeader('Access-Control-Max-Age', 1728000);//预请求缓存20天
  // res.setHeader('Access-Control-Allow-Credentials',true)
  //在非简单请求且跨域的情况下，浏览器会发起options预检请求。
  res.setHeader("Access-Control-Allow-Credentials", true)
  // res.setHeader('content-type', 'text/html;charset=utf8')
  if (method === 'OPTIONS') {
    console.log('options')
    res.write('pass')
    res.end();
    return false
  }
  if (method === "POST") {
    let reqCookie = req.headers["cookie"]
    console.log(reqCookie, "cookie");
    // if (/token=\d{5,}/.test(reqCookie)) {
    console.log("写入主页");
    // req.on("data",function (chunk) {
    //   console.log(chunk.toString(),"get");
    //   res.write("ok")
    //   res.end()
    // })
    res.write("ok")
    res.end()
    return false
  }
}).listen(3001, function () {
  console.log("over");
})
function isJson(data) {
  try {
    JSON.parse(data)
    return true
  } catch (error) {
    console.log("fail");
    return false
  }
}
function formatQuery(dataObj) {
  return Object.entries(dataObj).map(([key, value]) => {
    return `${key}=${value}`
  }).join("&")
}
function mapContentType(type) {
  let map = {
    "application/json": "json",
    "multipart/form-data": "file",
    "application/x-www-form-urlencoded": "form",
    "text/plain;charset=utf8": "text"
  }
  return map[cut(type)]
}
function cut(str) {
  return str.split(";")[0]
}