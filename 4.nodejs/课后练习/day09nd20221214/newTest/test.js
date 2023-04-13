/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-14 16:40:59
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-14 17:36:51
 */
let fs = require("fs")
let path = require("path")
// fs.appendFile("./guess.md","keainie",function (err) {

// })
//读取图片base64格式 需要在图片头使用 data:image/jpg;base64,
// fs.readFile("./1.jpg","base64",function (err,data) {
//   console.log(data)
// })


//文件操作 细化
fs.open("./guess.md",'r+',0600, function (err,fd) {
  console.log("文件标示符",fd)
  let buf = Buffer.alloc(60)
  fs.read(fd,buf,4,50,2, function (err, bytesRead, buffer) {
    console.log(bytesRead)
    console.log(buffer);
    console.log(buffer.toString('utf8'))
    let buf = Buffer.from("可爱捏zjc")
    fs.write(fd,buf,0,buf.length,0,function (err,written,buffer) {
      if (err) {
        throw err
      }
      console.log(written,"write");
      console.log(buffer.toString(),"str");
    })
    fs.fsync(fd, err => {
      if (err) {
        throw err
      }
      console.log("同步完成");
      fs.close(fd, err => {
        if (err) {
          throw err
        }
        console.log("文件关闭");
      })
    })
  })
})