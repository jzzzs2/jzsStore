/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-19 16:45:11
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-19 18:25:07
 */
let fs = require("fs")
let http = require("http")
let url = require("url")
let multiparty = require("multiparty")
http.createServer(function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
  res.setHeader("Access-Control-Max-Age", "3600");
  res.setHeader("Access-Control-Allow-Headers", "x-requested-with,Authorization,token, content-type"); //这里要加上content-type 
  res.setHeader("Access-Control-Allow-Credentials", "true");
  // setTimeout(() => {

  // }, 5000);
  // req.on("data",function(chunk) {
  //   console.log(chunk,"getData");
  // })
  let reqMethod = req.method;
  let reqUrl = req.url;
  let pathname = url.parse(reqUrl).pathname
  if (pathname !== '/data') {
    res.write('路径不正确 非诚勿扰')
    res.end()
    return false;
  }

  if (reqMethod === 'GET') {
    res.write('不接受get请求, 请回吧')
    res.end()
    return false;
  }
  console.log("到这里了捏");
  let party = new multiparty.Form({
    uploadDir: "./load"
  })
  party.parse(req)
  party.on('field', (name, value) => {
    // name:字段名
    // value:值
    console.log('数据:', name, value);

  })
  //接收文件数据
  party.on('file', (name, file) => {
    console.log('文件:', name, file);
  })
  //表单解析完成
  form.on('close', () => {
    console.log('完成');
  })
  res.writeHead(200)
  res.write("ajax success")
  res.end()
}).listen(3001)