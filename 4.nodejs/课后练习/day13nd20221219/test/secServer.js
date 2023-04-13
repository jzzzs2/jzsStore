/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-19 18:32:17
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-19 18:54:24
 */
let http = require("http")
http.createServer(function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
  res.setHeader("Access-Control-Max-Age", "3600");
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with,Authorization,token, content-type"); //这里要加上content-type 
  res.setHeader("Access-Control-Allow-Credentials", "true");
  req.on("data", function (chunk) {
    console.log(chunk.toString());
    // console.log(JSON.parse(chunk.toString()));
    // let arr = Object.entries(JSON.parse(chunk.toString()))
    res.writeHead(200)
    // res.write(`${arr[0][0]}=${arr[0][1]}999`)
    res.write(chunk.toString())
    res.end()
  })
  // res.writeHead(200)
  // res.write("success")
  // res.end()
}).listen(3001)