/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-18 10:51:02
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-18 11:32:42
 */
let http = require("http")
let url = require("url")
let fs = require("fs")
let path = require("path")
let multiparty = require("multiparty")
http.createServer(function (req, res) {
    console.log(req.url, "req.url");
    // let pathStr = path.dirname(url.parse(req.url).pathname)
    let pathStr = req.url
    let party = new multiparty.Form({
      uploadDir: "./upload"
    })
    console.log(pathStr,"pathStr");
    if (/data/.test(pathStr)) {
      console.log("/data/");
      party.parse(req, function (err, fields, files) {
        console.log(fields, files, "data form");
        res.writeHead(200, { "Content-Type": "text/html" })
        console.log(files["cases"][0].path,files["cases"][0],"file path");
        res.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
        </head>
        <body>
          <img src=${files["cases"][0].path} alt=>
        </body>
        </html>
        `)
        res.end()
      })
    }
    if (/upload/.test(pathStr)) {
      console.log("file name",path.basename(req.url));
      let fileName = path.basename(req.url)
      fs.readFile(`./upload/${fileName}`,function (err,data) {
        console.log("fileName",fileName);
        res.writeHead(200,{"Content-Type": `image/${path.extname(fileName).slice(1)}`})
        res.write(data)
        res.end()
      })
    }
  console.log("before return");
  return false
}).listen(3005)