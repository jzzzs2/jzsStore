/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-12 19:31:22
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-12 19:32:33
 */
let events = require("events")
let eventsObj = new events()
eventsObj.on("test", function (...params) {
  console.log(params);
  console.log([...params]);
})
eventsObj.emit("test","p1","p2","p3")