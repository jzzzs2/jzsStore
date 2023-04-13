/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-18 17:58:40
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-18 18:07:54
 */
let event = require("events")
let eventCreator = new event()
let load = function (data) {
  console.log("loaded",data);
}
eventCreator.on("loaded",load)
eventCreator.on("end", function (data) {
  console.log("ended1",data);
})
eventCreator.on("end", function (data) {
  console.log("ended2",data);
})
eventCreator.once("test", function (data) {
  console.log(data,"0");
})
// eventCreator.emit("loaded",{name: "jzs", age: 22})
// eventCreator.emit("test", 22)
// eventCreator.emit("test", 33)
// eventCreator.emit("loaded",22)
// eventCreator.off("loaded",load)
// eventCreator.emit("loaded",33)
// eventCreator.emit("end",2)
// eventCreator.removeAllListeners("end")
// eventCreator.emit("end",2)
console.log(eventCreator.eventNames());
// eventCreator.eventNames()