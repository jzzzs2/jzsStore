/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-07 19:38:35
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-02-20 19:22:57
 */
const express = require('express');
const router = express.Router();
const User = require("../model/User")
const createError = require("http-errors");
const assert = require('http-assert');
const multer = require("multer")
const path = require("path")
const fs = require("fs")
const { preUrl, fileSize } = require("../util/util")
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let url = path.join(process.cwd(), `/upload/avatar`)
    fs.existsSync(url) || fs.mkdirSync(url)
    cb(null, url)
    //cb第一个参数是this指向
  },
  filename: function (req, file, cb) {
    let pathObj = path.parse(file.originalname)
    let name = pathObj.name + Date.now() + pathObj.ext
    console.log(name, "name");
    cb(null, `avatar${~~(Math.random() * 200)}.png`)
  }
})
let fileOperate = multer({
  storage
})
/* GET users listing. */

router.post("/", fileOperate.single("file"), async function (req, res, next) {
  try {
    console.log("file",req.file);
    let url = "http://127.0.0.1:3000/avatar/" + req.file.filename
    console.log(url,"URL");
    let result = await User.findByIdAndUpdate(req._id,{
      avatar: url
    })
    console.log(result, "result");
    res.send(200, {
      message: "图片上传成功",
      data: result
    })
  } catch (error) {
    next(error)
  }

});

module.exports = router;
