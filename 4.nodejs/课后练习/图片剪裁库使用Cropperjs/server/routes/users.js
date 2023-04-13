/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-02-20 18:06:11
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-02-20 18:43:46
 */
/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-07 19:38:35
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-02-14 11:39:39
 */
const express = require('express');
const router = express.Router();
const multer = require("multer")
const path = require("path")
const fs = require("fs")
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let url = path.join(process.cwd(), `/public/images`)
    fs.existsSync(url) || fs.mkdirSync(url)
    cb(null, url)
    //cb第一个参数是this指向
  },
  filename: function (req, file, cb) {
    let pathObj = path.parse(file.originalname)
    let name = pathObj.name + Date.now() + pathObj.ext
    console.log(name, "name");
    cb(null, `${name}.png`)
  }
})
let fileOperate = multer({
  storage
})

router.post("/", fileOperate.single("file"), async function (req, res, next) {
  try {
    res.send(200, {
      message: "图片上传成功",
      "errno": 0,
    })
  } catch (error) {
    next(error)
  }

});

module.exports = router;

