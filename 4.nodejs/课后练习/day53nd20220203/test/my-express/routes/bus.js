/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-31 17:53:39
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-02-04 13:28:10
 */
const express = require("express")
const createError = require("http-errors")
const assert = require("http-assert")
const route = express.Router()
//查询所有
route.get("/", async (req, res, next) => {
  console.log(req.model, "model");
  let result = await req.model.find()
  console.log(result, "result");
  res.send(200, { message: 'ok', data: { count: result.length, list: result } })
})
//新增资源
route.post("/", async (req, res, next) => {
  let data = req.body
  // console.log(data,"data");
  try {
    let result = await req.model.create(data)
    console.log(result,"result");
    // assert(false,422,"数据格式错误")
    res.send(200, {data:result})
  } catch (error) {
    // console.log(error);
    next(createError(422,"格式错误"))
  }

})
route.put("/:id", (req, res, next) => {

})
route.delete("/:id", (req, res, next) => {

})
module.exports = route
