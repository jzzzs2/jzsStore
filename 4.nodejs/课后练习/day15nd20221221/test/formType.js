/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-20 16:53:23
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-21 21:44:56
 */
let fs = require("fs")
let path = require("path")
let url = require("url")
let http = require("http")
let multiparty = require("multiparty")
http.createServer(function (req, res) {
  let url = req.url
  let method = req.method.toUpperCase()
  let reqType = req.headers["content-type"]
  console.log(reqType);
  res.writeHead(200, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    'Access-Control-Allow-Headers': 'x-requested-with,Authorization,token, content-type',
    "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS,PATCH",
    "access-control-max-age": "1728000",
  })
  if (method === "GET") {
    res.setHeader('content-type', 'text/plain;charset=utf8')
    res.write("ok")
    res.end()
    return false
  }
  if (method === "POST") {
    if (/multipart\/form-data/.test(reqType)) {
      let formParty = new multiparty.Form({
        uploadDir: "./upload"
      })
      console.log(111);
      formParty.parse(req, function (err, fields, files) {
        console.log(fields, "fields");
        console.log(files, "files");
        res.write("ok")
        res.end()
      })
      return false
    }
    req.on("data", function (chunk) {
      console.log("data");
      // console.log(chunk.toString());
      // res.write(chunk.toString())
      res.write("ok")
      res.end()
    })
    req.on("end", function () {
      console.log("传输结束");
    })
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