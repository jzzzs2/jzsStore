/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-17 17:46:01
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-17 21:52:50
 */
let fs = require("fs")
let path = require("path")
let url = require("url")
let http = require("http")
let querystring = require("querystring")
let multiparty = require("multiparty")
module.exports.newHtml = function (req,res) {
  // let pathname = url.parse(req.url).pathname
  // if (!(/data/g.test(pathname))) {
  //   return false;
  // }
  // res.writeHead(200, { 'Content-Type': 'text/palin;charset=utf8' })
  // let form = new multiparty.Form({
  //   uploadDir: './upload',//指定上传的文件路径
  // });
  // form.parse(req, function (err, field, files) {
  //   if (files) {
  //     // console.log(files) //表单内的file文件字段对象
  //     let { path, fieldName, size } = files['miku'][0]
  //     console.log(files['miku'][0]);
  //     console.log(fieldName);
  //     res.writeHead(200, { 'Content-Type': 'text/html;charset=utf8' })
  //     res.write(`
  //     <!DOCTYPE html>
  //       <html lang="zh-cn">

  //       <head>
  //       <meta charset="UTF-8">
  //       <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //       <title>Document</title>
  //       </head>

  //       <body>
  //       这是返回的页面 ${fieldName}
  //       <img src="${path}" alt="">

  //       </body>

  //       </html>
  //     `)
  //     res.end()
  //   }
  // })
  let party = new multiparty.Form({
    uploadDir: "./upload"
  })
  let url = req.url
  console.log(url);
  if (/data/.test(url)) {
    // console.log("data");
    res.writeHead(200,{"Content-Type": "text/html;"})
    party.parse(req, function (err,fields,files) {
      console.log(fields,files);
      let { path, fieldName, size } = files['miku'][0]
      res.writeHead(200, { 'Content-Type': 'text/html;charset=utf8' })
      // party.pipe(w)
      // console.log(files);
      res.write(`
      <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>temp</title>
          </head>
          <body>
            <img src="${path}" alt="">
          </body>
          </html>
      `)
      console.log("我是end 前");
      res.end()
    })
  }else{
    return false
  }
}
  // party.parse(req, function (err,fields,files) {
  //   if (fields) {

  //   }
  //   if (files) {
  //     let fileObj = files["miku"][0]
  //     console.log(fileObj);
  //     res.write(`
  //     <!DOCTYPE html>
  //       <html lang="en">
  //       <head>
  //         <meta charset="UTF-8">
  //         <meta http-equiv="X-UA-Compatible" content="IE=edge">
  //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //         <title>temp</title>
  //       </head>
  //       <body>
  //         <img src="${fileObj.path}" alt="">
  //       </body>
  //       </html>
  //     `)
      
  //     res.end()
  //   }
  // })