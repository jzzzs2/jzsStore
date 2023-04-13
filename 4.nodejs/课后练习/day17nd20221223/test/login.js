/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-20 16:53:23
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-23 17:05:14
 */
let fs = require("fs")
let path = require("path")
let url = require("url")
let http = require("http")
let multiparty = require("multiparty")
let querystr = require("querystring")
http.createServer(function (req, res) {
  console.log(req.headers["cookie"],"cookie");
  let urlName = req.url
  let method = req.method.toUpperCase()
  let reqType = req.headers["content-type"]
  console.log(reqType);
  res.setHeader('content-type', 'text/html;charset=utf8')
  res.setHeader("Set-Cookie","token=" + Date.now())
  res.writeHead(200, {
    "Content-Type": "text/html;utf8",
    "Access-Control-Allow-Origin": "*",
    'Access-Control-Allow-Headers': 'x-requested-with,Authorization,token, content-type',
    "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS,PATCH",
    "access-control-max-age": "1728000",
  })
  if (method === "GET") {
    // console.log(url.parse(urlName)?.query?.split("="));
    arr = url.parse(urlName).query.split("=")
    let funName = arr[arr.length - 1]
    // res.write(`${funName}('{"name":"jzs"}')`)
    // res.write(`${funName}('{"name":"jzs"}')`)
    fs.readFile("./main.html","utf8",function (err,data) {
      res.write(data)
      res.end()
    })
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
    // res.setHeader("content-type","text/html")
    req.on("data", function (chunk) { 
      console.log(chunk.toString("utf8"),"普通表单的数据");
      console.log(chunk.toString(), "data");
      // res.write(chunk.toString())
      let { user, pwd } = querystr.parse(chunk.toString())
      console.log(user, pwd, "params");
      if (!user || !pwd) {
        console.log("shibai");
        res.end("fail")
        return false
      } else {
        console.log("写入");
        fs.readFile('./main.html', "utf8", function (err, data) {
          console.log(data);
          res.write(data)
          res.end()
        })
      }
      // res.setHeader("content-type","text/html")

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