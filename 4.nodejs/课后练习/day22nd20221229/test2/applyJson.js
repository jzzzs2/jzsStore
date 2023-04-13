/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-29 19:31:47
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-29 20:41:04
 */
const http = require("http")
const fs = require("fs")
const path = require("path")
const url = require("url")
http.createServer(function (req,res) {
  let method = req.method.toUpperCase()
  if (method === "OPTIONS") {
    console.log("opt");
    res.end("ok")
    return false
  }
  if (method === "POST") {
    req.on("data",function (chunk) {
      console.log(chunk.toString(),"content");
      res.write("ok")
      res.end()
      return false
    })
  }
}).listen(8080,function () {
  console.log("8080 start");
})