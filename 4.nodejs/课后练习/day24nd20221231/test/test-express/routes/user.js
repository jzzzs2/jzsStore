/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-31 19:34:04
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-31 19:47:02
 */
const express = require("express")
let route = express.Router()
route.get("/login",function (req,res,next) {
  console.log("i am login");
  console.log(req.baseUrl);
  console.log(req.url);
  res.status(200)
  res.send("login success")
})
route.get("/reg",function (req,res,next) {
  console.log("i am reg");
  console.log(req.baseUrl);
  res.status(200)
  res.send("reg success")
})
route.get("/cancel",function (req,res,next) {
  console.log("i am cancel");
  console.log(req.baseUrl);
  res.status(200)
  res.send("cancel success")
})
module.exports = route