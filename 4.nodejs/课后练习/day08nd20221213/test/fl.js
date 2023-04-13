/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-13 18:23:36
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-13 20:05:42
 */
let path = require("path")
let fs = require("fs")
//file system  文件系统
//stat 检测路径是目录还是文件
// fs.stat(__filename,function (err,stats) {
//   //返回一些stats文件信息
//   console.log(stats)
//   console.log(stats.isFile());
//   console.log(stats.isDirectory());
// })
// fs.stat(__dirname,function (err,stats) {
//   console.log(stats);
//   console.log(stats.isFile());
//   console.log(stats.isDirectory());
// })
//mkdir 创建目录 参数: 目录名称/路径 mode 读写权限（0777） callback回调 回调参数err
// fs.mkdir("img", err=> {
//   console.log(err);
// })
// fs.mkdir("../test3",err => (console.log(err),console.log("目录创建成功")))
// fs.rmdir("../test3",err => console.log(err))
// fs.rmdir("../test2",err => console.log(err))
// fs.rmdir("./img", err => console.log(err))
//writeFile(文件名,内容字符串，参数对象，回调函数)
let str = "let a = 66; let y = 99;"
// fs.writeFile("./test.js",str, {flag: 'a'},function (error) {
//   if (error) {
//     console.log("fail to access !")
//     return false
//   }
//   console.log("写入成功");
// })
// fs.writeFile("./test2.js","var food = 'noodle'",{flag: 'w'},function (error) {
//   if (error) {
//     console.log("fail to access")
//     return false
//   }
//   console.log("写入成功")
// })
// fs.writeFile("./test3.js","i am jzs",{flag: 'w'},function (error) {
//   if (error) {
//     console.log("fail to access");
//     return false
//   }
//   console.log("写入成功");
// })
// console.log("test")
// fs.appendFile("./test3.js","append content",function (error) {
//   if (error) {
//     console.log("fail to access");
//   }
//   console.log("append success");
// })
// fs.unlink("test3",function (error) {
//   if (error) {
//     console.log("fail to access");
//   }
//   console.log("delete success");
// })
//readdir 读取目录  返回回调函数 一个文件名数组
fs.readdir("../test",(err,data) => {
  if (err) {
    console.log("fail to access")
    return false
  }
  // console.log(data)
  // console.log(data.length)
  for (let i = 0; i < data.length; i++) {
    let url = path.resolve(`${__dirname + "\\" +data[i]}`)
    // console.log(url);
    fs.writeFile(url,"/*i am append*/",{flag: 'a'},function (error) {
      if (error) {
        console.log("fail to access");
        return false
      }
      console.log("game successed");
    })
  }
})/*i am append*/

//readFile(name,'utf-8',(err,data) => console.log(data))
let result = fs.readFileSync("./test3.js",'utf8')
// let twoResult = fs.readFile("./test3.js",'utf8',function (error,data) {
//   console.log(data);
// })
console.log(result);/*i am append*//*i am append*/