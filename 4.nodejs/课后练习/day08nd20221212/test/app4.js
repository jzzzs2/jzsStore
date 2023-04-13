/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-12 19:33:48
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-12 20:07:50
 */
//模拟event对象
let eventObj = {

}
let eventMethod = {
  $eventBind(name, cb) {
    console.log(eventObj[name]);
    if (eventObj[name]) {
      eventObj[name].push(cb)
      // console.log(eventObj[name].length);
      return true
    }
    console.log("add");
    eventObj[name] = [cb]
    return false
  },
  $eventOff(name, cb) {
    if (eventObj[name]) {
      eventObj[name] = eventObj[name].filter(function (item, idx) {
        return cb.toString() !== item.toString()
      })
      return true
    }
    return false
  },
  $eventEmit(name, ...data) {
    if (!eventObj[name]) {
      return false
    }
    eventObj[name].forEach(function (item) {
      item(...data)
    })
    return true
  }
}
let f1 = function (...params) {
  console.log([...params], "1");
}
let f2 = function (...params) {
  console.log([...params], "2");
}
eventMethod.$eventBind("readed", f1)
eventMethod.$eventBind("readed", f2)
console.log(eventObj);
eventMethod.$eventEmit("readed", 8, 12, 14)
eventMethod.$eventOff("readed",f2)
console.log(eventObj);