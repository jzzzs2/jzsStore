/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-12 18:08:22
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-12 19:21:06
 */
let fs = require("fs")
let eventsModule = require("events")
let eventsObj = new eventsModule()
let cb = function (data) {
  console.log("输出内容1" + data);
}
let cb2 = function (data) {
  console.log("输出内容2" + data);
}
// eventsObj.on("readed",cb)
eventsObj.on("readed",cb)
eventsObj.on("readed",cb2)
fs.readFile("./file/a.txt","utf-8",function (err,data) {
  console.log("读取1成功")
  eventsObj.emit("readed",data)
  // eventsObj.off("readed",cb)
})
fs.readFile("./file/b.txt","utf-8",function (err,data) {
  console.log("读取2成功")
  eventsObj.emit("readed",data);
  // eventsObj.off("readed",cb)
})
// eventsObj.off("readed",cb)