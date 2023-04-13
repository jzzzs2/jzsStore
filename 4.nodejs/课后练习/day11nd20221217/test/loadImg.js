/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-17 17:22:38
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-17 21:29:15
 */
let fs = require("fs")
let path = require("path")
let url = require("url")
let http = require("http")
let querystring = require("querystring")
let multiparty = require("multiparty")
exports.loadImg = function (req, res) {
  console.log("我是loading中");
  let url = req.url
  console.log(url);
  if (/upload/.test(url)) {
    console.log("upload");
    console.log("load IMG");
    console.log(url,"url");
    fs.readFile(`.${url}`,function (err,data) {
      console.log(data);
      console.log(`${path.basename(url)}`,"ext")
      res.writeHead(200,`Content-Type: image/${path.basename(url)}`)
      res.write(data)
      res.end()
    })
  }
  return false
}