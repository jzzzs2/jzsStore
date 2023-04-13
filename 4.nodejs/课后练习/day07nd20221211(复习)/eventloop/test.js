/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-11 13:12:06
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-11 13:14:55
 */
console.log("sync1");
setTimeout(function () {
  console.log("time1");
  Promise.resolve().then(function () {
    console.log("p1");
  })
},1000)
console.log("sync2");
setTimeout(function () {
  console.log("time2");
  Promise.resolve().then(function () {
    console.log("p2");
  })
},1000)
//sync1 sync2 time1 p1 time2 p2