/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-17 17:10:38
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-17 22:19:09
 */
let fs = require("fs")
let path = require("path")
let url = require("url")
let http = require("http")
let querystring = require("querystring")
let multiparty = require("multiparty")
let { newHtml } = require("./newHtml.js")
let { loadImg } = require("./loadImg.js")
http.createServer(function (req, res) {
  // let url = req.url
  // console.log(url);
  newHtml(req,res)
  // let party = new multiparty.Form({
  //   uploadDir: "./upload"
  // })
  // let url = req.url
  // console.log(url);
  loadImg(req, res)
  // if (/data/.test(url)) {
  //   // console.log("data");
  //   res.writeHead(200, { "Content-Type": "text/html;" })
  //   party.parse(req, function (err, fields, files) {
  //     console.log(fields,files);
  //     let { path, fieldName, size } = files['miku'][0]
  //     res.writeHead(200, { 'Content-Type': 'text/html;charset=utf8' })
  //     // party.pipe(w)
  //     // console.log(files);
  //     res.write(`
  //     <!DOCTYPE html>
  //         <html lang="en">
  //         <head>
  //           <meta charset="UTF-8">
  //           <meta http-equiv="X-UA-Compatible" content="IE=edge">
  //           <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //           <title>temp</title>
  //         </head>
  //         <body>
  //           <img src="${path}" alt="">
  //         </body>
  //         </html>
  //     `)
  //     console.log("我是resEnd before");
  //     res.end()
  //   })
  // } else {
  //   // return false
  //   // loadImg(req, res)
  // }

}).listen(3003)