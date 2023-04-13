/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-12 19:24:15
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-12 19:31:06
 */
let events = require("events")
let eventsObj = new events()
let cb = function () {
  console.log("1");
}
let cb2 = function () {
  console.log("2");
}
let cb3 = function () {
  console.log("3");
}
eventsObj.on("test",cb)
eventsObj.on("test",cb2)
eventsObj.on("test",cb3)
eventsObj.on("readed",function () {
  console.log("readed");
})
eventsObj.on("eating",function () {
  console.log("eating");
})
// eventsObj.removeAllListeners("test")
// eventsObj.off("test",cb)
eventsObj.emit("test")
console.log(eventsObj.eventNames());