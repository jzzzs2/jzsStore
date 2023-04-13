
/**
 *  from headfile.js
 *  reated by jzs on Tue Dec 13 2022 20:23:04 GMT+0800 (中国标准时间)
*//*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-13 20:06:20
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-13 20:22:32
 */
let path = require("path")
let fs = require("fs")

fs.readdir("../home", function (err, data) {
  console.log(data);
  for (let i = 0; i < data.length; i++) {
    if (path.extname(data[i]) !== ".js") {
      continue;
    }

    let fileName = data[i]
    let author = "jzs"
    let DateTime = new Date()
    let str = `
/**
 *  from ${fileName}
 *  reated by ${author} on ${DateTime}
*/`
    let url = __dirname + "\\" + data[i]
    let result = fs.readFileSync(url, "utf8")
    result = str + result
    fs.writeFile(url, result, { flag: "w" }, function (error) {
      if (error) {
        console.log("fail to access");
        return false
      }
      console.log("success");
    })
  }
})