/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-13 20:28:12
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-13 20:58:57
 */
let bf = Buffer.from("name2222")
let bf2 = Buffer.from("keainie")
// console.log(bf.toString());
// bf.write("iamjzs",2,1)
// console.log(bf.toString());
// console.log(bf.toJSON());
// bf.copy(bf2,4,2,5)
// console.log(bf.toString());
// console.log(bf2.toString());
// console.log(bf.slice(0,4));
// console.log(bf.toString());
let fs = require("fs")
// console.log(fs.stat("../test",function (err,data) {
//   console.log(data);
//   console.log(data.isFile());
//   console.log(data.isDirectory());
// }));
fs.readFile("./test2.js",{encoding: 'utf8',flag: 'r'},function (err,data) {
  console.log(data);
})
fs.unlink("../case",function (err) {
  console.log(err);
})