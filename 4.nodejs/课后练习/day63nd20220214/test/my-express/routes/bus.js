/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-31 17:53:39
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-02-15 19:55:50
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
  // let result = await User.find().setOptions(req.body)
  let option = selectMap[req.model.modelName];
  let arr
  console.log(option, "opt");
  let query = req.query
  // if (req.model.modelName == "Classify") {
  console.log("获得所有分类");
  let result
  // if (query) {
  console.log(req.query, "|||", req.params);
  query = qs.parse(query)
  console.log(query, "Query~~~~~");
  arr = query["query"]?.split("=")
  query = { [arr?.[0]]: arr?.[1] }
  // console.log(query, "query");
  // }
  // let result = await pagiUtil(req.model, {...req.body,query}, {key: "uid", value: "username nickname" })
  console.log(query, "query2222222", req.model.modelName);
  result = await pagiUtil(req.model, { ...req.body, query }, option)
  // console.log(result,"查询到的捏");
  res.send(200, { data: result, message: "查询成功" })
  return
  // }
  // let result = await pagiUtil(req.model, req.body, option)
  // let result = await pagiUtil(req.model, req.body, { key: "author", value: "username nickname" })
  // console.log(result, "keainie");
  // res.send(200, { data: result, message: "查询成功" })
})
//查询单个
route.get("/:id", async (req, res, next) => {
  let modelName = req.model.modelName
  let id = req.params["id"]
  // let result = await User.find().setOptions(req.body)
  try {
    if (modelName == "Classify") {
      let result = await req.model.find({ uid: id })
      console.log(result, "result2222222");
      res.send(200, {
        data: result,
        message: "查询成功"
      })
      return
    }
    if (getMap[modelName]) {
      await req.model.findByIdAndUpdate(id, getMap[modelName].get(id))
    }
    let querys = req.model.findById(id)
    // console.log(req.model.modelName,"model");
    let option = selectMap[req.model.modelName]
    for (let i = 0; i < option.length; i++) {
      querys = querys.populate(option[i])
    }
    let result = await querys.exec()
    res.send(200, { data: result, message: "查询成功" })
  } catch (error) {
    next(error)
  }
})
//新增资源
route.post("/", async (req, res, next) => {
  console.log(req._id, "req._id", "fuwuqi duan");
  // console.log(req.body.content,"Content");
  // console.log(decodeURIComponent(req.body.content),"解码");

  try {
    let data = req.body
    let addResult
    // let id = req.body["author"]
    // assert(id, 422, "参数有误")
    // console.log(req._id,"idididiididididiidididiididid");

    console.log(req.model, data, "datatatatatatata")
    let result = await req.model.create(data)
    console.log(result, "文章aaaaaaaa");
    if (collRelation[req.model.modelName]) {
      console.log(result.prop, "xxx");
      let { model, get, actionName, idName, prop } = collRelation[req.model.modelName]
      addResult = await model?.[actionName](result[prop], get(result["_id"]))
      console.log(addResult, "addResult");
    }
    if (refMap[req.model.modelName]) {
      data = refMap[req.model.modelName]["together"](req.body, req["_id"])
      console.log(data, "datatatatdatata2222");
    }
    // console.log(result, "result23232323232323232");
    assert(req["_id"], 422, "参数有误")
    // console.log(result, "result");
    // assert(false,422,"数据格式错误")
    res.send(200, { data: result, addResult, message: "添加成功" })
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
      next(createError(401, "没有权限"))
    }
    // console.log(req.params["id"],"uddddd");
    let id = await req.model.findById(req.params["id"])
    // console.log(id,authId,"xxxx");
    assert(id[paramId] == authId, 400, "权限有误")
    let obj = selectValid(req.body, validArr)
    // console.log(obj,"correct");
    // console.log(obj.length,"length");
    // console.log(obj,"obj");
    // console.log(Object.keys(obj).length,"length");
    assert(Object.keys(obj).length, 422, "参数错误")
    // console.log({...obj,createtime: new Date().toISOString()});
    let result = await req.model.findByIdAndUpdate(req.params["id"], { ...obj, createtime: new Date().toISOString() })
    res.send(200, { data: result, message: "修改成功" })
  } catch (error) {
    next(error)
  }

})
route.delete("/:id", (req, res, next) => {

})
module.exports = route
