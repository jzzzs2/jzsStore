/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-23 19:29:42
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-24 20:26:23
 */
let url = require("url")
let {handleRes, toMain, getMovie } = require("./handle")
let mapList = {
  "/static" : handleRes,
  "/index": toMain,
  "/movie": getMovie
}
function mapReq (req,res) {
  let resPath  = url.parse(req.url).pathname
  // console.log(resPath,"url")
  if (resPath === "/favicon.ico") {
    res.end("ok")
    return false
  }
  // console.log(Object.entries(mapList).filter(([key,value]) => {
  //   let reg = new RegExp(`^${key}`)
  //   return reg.test(resPath)
  // }),"filter");
  let methodName = Object.entries(mapList).filter(([key,value]) => {
    let reg = new RegExp(`^${key}`)
    return reg.test(resPath)
  })[0][0]
  // console.log(methodName,"name");
  // console.log(mapList[methodName]);
  mapList[methodName](req,res)
  // let pathName = url.parse(req.url)
}
module.exports = {
  mapReq
}