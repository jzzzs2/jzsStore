/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-31 17:53:39
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-02-20 14:06:10
 */
const express = require("express")
const createError = require("http-errors")
const assert = require("http-assert")
const pagination = require("mongoose-sex-page")
const { pagiUtil, selectValid } = require("../util/util")
const route = express.Router()
const User = require("../model/User")
const Article = require("../model/Article")
const Classify = require("../model/Classify")
const Comment = require("../model/Comment")
const getMap = require("../util/getMap")
const putMap = require("../util/putMap")
const refMap = require("../util/refMap")
const { selectMap, collRelation } = require("../util/resOperatorMap")
let qs = require("qs")
//查询所有
route.get("/", async (req, res, next) => {
  let routerType = "info"
  let id = req._id
  let result = await User.findById(id)
  console.log(id,"id");
  let articleCount = await Article.find({"author": id}).count()
  let classifyCount = await Classify.find({uid: id}).count()
  result = result.toJSON()
  result.articleCount = articleCount
  result.classifyCount = classifyCount
  console.log(result,"resultXXXX");
  // console.log(result,"查询到的捏");
  res.send(200, { data: result, message: "查询成功" })
  return
})
//查询单个
//新增资源
route.put("/", async (req, res, next) => {
  // console.log(req._id,req.isPass,"====");
  let id = req._id
  let data = req.body
  try {
    let result = await User.findByIdAndUpdate(id,data)
    res.send(200, { data: result, message: "修改成功" })
  } catch (error) {
    next(error)
  }

})
module.exports = route
