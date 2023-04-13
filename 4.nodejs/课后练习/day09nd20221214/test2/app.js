/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-14 18:01:32
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-14 18:02:29
 */
let fs = require("fs").promises
fs.readFile("./a.js",{encoding: 'utf8'}).then(function (data) {
  console.log(data);
})