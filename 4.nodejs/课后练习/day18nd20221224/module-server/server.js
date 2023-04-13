/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-23 19:02:24
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-24 21:17:05
 */
let {path, fs, url, http, querystr} = require("./module")
let {port , host, proPath} = require("./info")
let {mapReq} = require("./mapReq")
http.createServer(function (req, res) {
  // res.setHeader("Access-Control-Allow-Origin", "http://40.122.76.83:3001");
  res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  res.setHeader('Access-Control-Allow-Headers', 'x-requested-with,Authorization,token, content-type,sa-time,sa-token');
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
  res.setHeader('Access-Control-Max-Age', 1728000);
  if (req.method.toUpperCase()==="OPTIONS") {
    console.log("32423423");
    res.end("ok")
    return false
  }
  mapReq(req,res)

}).listen(port)