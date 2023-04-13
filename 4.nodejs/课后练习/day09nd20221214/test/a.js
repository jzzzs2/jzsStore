/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-14 10:04:55
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-14 10:06:41
 */
let fs = require("fs")
fs.readFile("./b.js",function (err,data) {
  console.log(data);
})
fs.readFile("./b.js",{encoding: "utf8"},function (err,data) {
  console.log(data);
})