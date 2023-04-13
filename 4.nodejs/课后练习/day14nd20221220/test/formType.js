/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-20 16:53:23
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-20 18:02:11
 */
let fs = require("fs")
let path = require("path")
let url = require("url")
let http = require("http")
let multiparty = require("multiparty")
http.createServer(function (req, res) {
  let url = req.url
  let method = req.method.toUpperCase()
  res.writeHead(200,{
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    'Access-Control-Allow-Headers': 'x-requested-with,Authorization,token, content-type',
    "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS,PATCH",
    "access-control-max-age": "1728000",
  })
  if (!(/file/.test(url))) {
    res.end("你这个请求资源路径不太对哦")
    return false
  }
  if (method !== "POST") {
    res.end("你这个请求的方式不太对哦")
    return false
  }
  let formParty = new multiparty.Form({
    uploadDir: "./upload"
  })
  formParty.parse(req,function (err,fields,files) {
    console.log(fields);
    console.log(files);
    let obj = {
      "status": 200,
      "msg": "ok"
    }
    obj = JSON.stringify(obj)
    if (!(isJson(obj))) {
      res.end("返回信息不是json类型")
      return false
    }
    res.end(obj)
  })
}).listen(3001,function () {
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