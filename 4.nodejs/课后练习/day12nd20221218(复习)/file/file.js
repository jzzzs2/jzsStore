/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-18 18:18:44
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-18 18:50:09
 */
let fs = require("fs")
fs.readFile("./a.txt",{"encoding": "utf8",flag: "r"},function (err,data) {
  console.log(data);
})
// fs.writeFile("./a.txt","你好可爱捏",function(){})
// fs.appendFile("./a.txt","死一死",function(){})
// fs.writeFile("./a.txt","mikusama",{"flag": "w"},function(err){})
fs.writeFileSync("./a.txt","你好可爱捏")
fs.appendFileSync("./a.txt","死一死")
fs.writeFileSync("./a.txt","mikusama",{"flag": "w"})
fs.mkdir("../jzs",function (err){})
fs.unlink("./test.txt",function (err){})
fs.rmdir("../test3",function (err) {})
fs.rmdir("../test2",function (err){})
fs.rename("./fblj.png","./fblj.jpg",function (err) {})
fs.rename("./fblj.jpg","../fblj.png",function (err) {})
fs.mkdir("./test.js",function (err){})
//判断路径信息
fs.stat("../review", function (err, obj) {
  console.log(obj);
  console.log(obj.isFile(),obj.isDirectory());
})
fs.stat("../fblj.png",function (err,obj) {
  console.log(obj,obj.isFile(),obj.isDirectory());
})