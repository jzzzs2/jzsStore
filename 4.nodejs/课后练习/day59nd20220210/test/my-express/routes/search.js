/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-07 19:38:35
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-02-07 18:08:27
 */
const express = require('express');
const router = express.Router();
const { existUser, addUser } = require("../core/userValidate")
const User = require("../model/User")
const Article = require("../model/Article")
const assert = require("http-assert")
/* GET users listing. */
router.get('/', async function (req, res, next) {

  try {
    let { search = "" } = req.query
    console.log(search, "search");
    let regExp = new RegExp(search, "i")
    // let result = await Article.find({}).regex("content", regExp)
    let result = await Article.find({
      $or: [
        {
          "content": {
            "$regex": regExp
          }
        },
        {
          "title": {
            "$regex": regExp
          }
        }
      ]
    })
    res.send(200, {
      data: result,
      message: "查找成功"
    })
  } catch (err) {
    next(err)
  }
});

module.exports = router;
