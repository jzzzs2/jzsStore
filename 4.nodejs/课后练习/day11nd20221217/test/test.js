/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-17 15:51:31
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-17 19:27:46
 */
let fs = require("fs")
let http = require("http")
let url = require("url")
let queryStr = require("querystring")
let path = require("path")
let multiparty = require("multiparty")
http.createServer(function (req, res) {
  console.log(req.method);
  console.log(req.url);
  console.log(url.parse(req.url));
  let party = new multiparty.Form({
    uploadDir: "./upload"
  })
  if (/upload/.test(req.url)) {
    console.log(true);
    fs.readFile(`./upload/${path.basename(req.url.pathname)}`,function (err,data) {
      console.log("load");
      res.write(data)
      res.end()
    })
    return false
  }
  party.parse(req, function (err, field, files) {
    console.log(field);
    console.log(files);
    if (files) {
      let { fieldName, path } = files["miku"][0]
      fs.readFile(path, function (err, data) {
        console.log(data);
        // res.writeHead(200,{"Content-Type": "text/plain;charset=utf8"})
        // res.writeHead(200,{"Content-Type": "image/png"})
        // res.writeHead(200,{"Content-Type": "image/png"})
        // res.writeHead(200, { "Content-Type": "audio/mpeg" })
        res.writeHead(200, { "Content-Type": "text/html" })
        // res.write("keainie")
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
            <img src="${files["miku"][0].path}" alt="">
          </body>
          </html>
        `)
        res.end()
        return false
      })
    }
  })
}).listen(3003)