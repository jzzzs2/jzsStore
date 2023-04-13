/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-07 19:38:35
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-02-09 15:28:18
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
/* GET users listing. */
router.post("/:id", async function (req, res, next) {
  try {
    let id = req.params["id"]
    let result = await Article.findByIdAndUpdate(id, {
      "$inc": {
        "hits_num": 1
      }
    })
    let num = ++result["hits_num"]
    res.send(200,{
      data: `点赞数为${num}`,
      message: "点赞成功"
    })
  } catch (error) {
    next(error)
  }
});

module.exports = router;
