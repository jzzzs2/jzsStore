/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-08 14:36:16
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-08 14:46:02
 */
let fs = require("fs");

new Promise(function (resolve,reject) {
  fs.readFile("./1.txt","utf-8",function (err,data) {
    console.log(data);
    resolve(data);
  })
}).then(function (data) {
  console.log(data,"file1");
  return new Promise(function (resolve,reject) {
    fs.readFile("./2.txt","utf-8",function (err,data) {
      console.log(data);
      resolve(data);
    })
  }) 
}).then(function (data) {
  console.log(data,"file2");
})