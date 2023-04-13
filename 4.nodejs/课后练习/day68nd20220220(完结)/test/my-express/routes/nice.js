/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-07 19:38:35
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-03-27 18:02:54
 */
const express = require('express');
const router = express.Router();
const { existUser, addUser } = require("../core/userValidate")
const { decrypt, encrypt } = require("../createKey")
const User = require("../model/User")
const Article = require("../model/Article")
const assert = require("http-assert")
const jwt = require("jsonwebtoken")
const createError = require("http-errors")
const { getPublicKey } = require("../readKey")
/* GET users listing. */
router.post("/:id", (req, res, next) => {
  let token = req.headers["authorization"]?.replace("Bearer ", "")
  if (token) {
    let key = getPublicKey()
    jwt.verify(token, key, function (err, data) {
      if (err) {
        console.log(err);
        return
      }
      console.log(data,"data test");
      let userId = data.id
      console.log(typeof userId, "userId");
      if (userId) {
        req._id = userId
      }
    })
  }
  next()
}, async function (req, res, next) {
  try {
    console.log(req.params,"params and body",req.body);
    let id = req.params["id"]
    let isAdd = req.body.params["isAdd"]
    console.log(isAdd,"isAdd");
    let query = {
      "$inc": {
        "hits_num": isAdd? 1 : -1
      }
    }
    if (req._id) {
      isAdd ? 
      query["$addToSet"] = {
        like_users: req._id
      }
      :
      query["$pull"] = {
        like_users: req._id
      }
    }
    let result = await Article.findByIdAndUpdate(id, query)
    let num = ++result["hits_num"]
    res.send(200, {
      data: `点赞数为${num}`,
      message: "点赞成功"
    })
  } catch (error) {
    next(error)
  }
});

module.exports = router;
