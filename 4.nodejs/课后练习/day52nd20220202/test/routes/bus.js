/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-31 17:53:39
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-01-31 21:09:37
 */
const express = require("express")
const route = express.Router()
//查询所有
route.get("/",async (req,res,next) => {
  console.log(req.model,"model");
  let result = await req.model.find()
  console.log(result,"result");
  res.send(result)
  res.end()
})
//新增资源
route.post("/", async (req,res,next) => {
  let data = req.body
  console.log(data,"data");
  let result = await req.model.create(data)
  res.send(result)
  res.end()
})
route.put("/",(req,res,next) => {
  
})
route.delete("/",(req,res,next) => {
  
})
module.exports = route
