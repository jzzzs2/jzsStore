/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-23 19:02:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-25 17:28:46
 */
let {path, fs, url, http, querystr} = require("./module")
let {port , host, proPath} = require("./info")
let {mapReq} = require("./mapReq")
http.createServer(function (req, res) {
  // res.setHeader("Access-Control-Allow-Origin", "http://40.122.76.83:3001");
  // res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  res.setHeader('Access-Control-Allow-Headers', 'x-requested-with,Authorization,token, content-type,sa-time,sa-token,name,age');
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
  res.setHeader('Access-Control-Max-Age', 1728000);
  res.setHeader("Set-Cookie","token=3434343; Expires=xxxx; HttpOnly")
  if (req.method.toUpperCase()==="OPTIONS") {
    console.log("32423423");
    res.end("ok")
    return false
  }
  req.on("data", function (chunk) {
    console.log("post params");
    console.log(chunk.toString("utf8"));
  })
  mapReq(req,res)

}).listen(port)