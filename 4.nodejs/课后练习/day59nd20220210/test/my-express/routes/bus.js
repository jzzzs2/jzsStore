/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-31 17:53:39
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-02-13 17:02:14
 */
const express = require("express")
const createError = require("http-errors")
const assert = require("http-assert")
const pagination = require("mongoose-sex-page")
const { pagiUtil,selectValid } = require("../util/util")
const route = express.Router()
const User = require("../model/User")
const Article = require("../model/Article")
const Classify = require("../model/Classify")
const Comment = require("../model/Comment")
const getMap = require("../util/getMap")
const putMap = require("../util/putMap")
const refMap = require("../util/refMap")
const { selectMap, collRelation } = require("../util/resOperatorMap")
//查询所有
route.get("/", async (req, res, next) => {
  // let result = await User.find().setOptions(req.body)
  let result = await pagiUtil(req.model, req.body,{key: "author",value: "username nickname"})
  // console.log(result,"keainie");
  res.send(200, {data:result,message: "查询成功"})
})
//查询单个
route.get("/:id", async (req, res, next) => {
  let modelName = req.model.modelName
  let id = req.params["id"]
  // let result = await User.find().setOptions(req.body)
  try {
    if (getMap[modelName]) {
      await req.model.findByIdAndUpdate(id,getMap[modelName].get(id))
    }
    let querys = req.model.findById(id)
    // console.log(req.model.modelName,"model");
    let option = selectMap[req.model.modelName]
    for (let i = 0; i < option.length; i++) {
      querys = querys.populate(option[i])
    }
    let result = await querys.exec()
    res.send(200, {data:result,message: "查询成功"})
  } catch (error) {
    next(error)
  }
})
//新增资源
route.post("/", async (req, res, next) => {
  console.log(req._id,"req._id","fuwuqi duan");
  // console.log(req.body.content,"Content");
  // console.log(decodeURIComponent(req.body.content),"解码");
  let { model, get, actionName, idName } = collRelation[req.model.modelName]
  try {
    // let id = req.body["author"]
    // assert(id, 422, "参数有误")
    // console.log(req._id,"idididiididididiidididiididid");
    let data = refMap[req.model.modelName]["together"](req.body,req["_id"])
    console.log(req.model,data)
    let result = await req.model.create(data)
    // console.log(result, "result23232323232323232");
    assert(req["_id"],422,"参数有误")
    let addResult = await model[actionName](req["_id"], get(result["_id"]))
    // console.log(result, "result");
    // assert(false,422,"数据格式错误")
    res.send(200, { data: result, addResult,message: "添加成功" })
  } catch (error) {
    // console.log(error);
    next(error)
  }

})
route.put("/:id", async (req, res, next) => {
  // console.log(req._id,req.isPass,"====");
  try {
    let modelName = req.model.modelName
    let validArr = putMap[modelName]["field"]
    let paramId = putMap[modelName]["authName"]
    let authId = req._id
    if (!authId) {
      next(createError(401,"没有权限"))
    }
    // console.log(req.params["id"],"uddddd");
    let id = await req.model.findById(req.params["id"])
    // console.log(id,authId,"xxxx");
    assert(id[paramId]==authId,400,"权限有误")
    let obj = selectValid(req.body,validArr)
    // console.log(obj,"correct");
    // console.log(obj.length,"length");
    // console.log(obj,"obj");
    // console.log(Object.keys(obj).length,"length");
    assert(Object.keys(obj).length,422,"参数错误")
    // console.log({...obj,createtime: new Date().toISOString()});
    let result = await req.model.findByIdAndUpdate(req.params["id"], {...obj,createtime: new Date().toISOString()})
    res.send(200, { data: result,message: "修改成功"})
  } catch (error) {
    next(error)
  }

})
route.delete("/:id", (req, res, next) => {

})
module.exports = route
