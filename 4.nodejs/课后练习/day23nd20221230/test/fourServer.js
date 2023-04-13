/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-30 18:37:49
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-30 19:22:43
 */
const http = require("http")
const fs = require("fs")
const express = require("express")
let app = express()
app.use("/user/:ID/name",function (req,res,next) {
  let id = req.params["ID"]
  let name = req.query["name"]
  let arr
  fs.readFile("./userData/data.json",function (err,data) {
    arr = JSON.parse(data.toString("utf8"))
    console.log(arr,"Arr");
    let idx = arr.findIndex(ele => {
      console.log(id,ele["ID"],"test");
      return Number(ele["ID"]) === Number(id) 
    })
    if (idx !== -1) {
      arr[idx]["name"] = name 
    }
    console.log(JSON.stringify(arr),"返回值");
    fs.writeFile("./userData/data.json",JSON.stringify(arr),function (err){})
    res.send("ok")
  })
})
let server = http.createServer(app)
server.listen(3001)
server.on("listening",function () {
  console.log("listening");
})
server.on("request",function () {
  console.log("request");
})