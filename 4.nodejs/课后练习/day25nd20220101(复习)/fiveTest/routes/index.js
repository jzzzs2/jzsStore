/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-01 16:24:31
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-01-01 16:37:59
 */
const express = require("express")
let route = express.Router()
route.get("/1",function (req,res,next){
  res.send("1")
  next()
})
route.get("/2",function (req,res,next){
  res.send("2")
  next()
})
route.get("/3",function (req,res,next){
  res.send("3")
  next()
})
module.exports = route