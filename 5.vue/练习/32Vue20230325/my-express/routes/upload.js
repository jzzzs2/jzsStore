/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-07 19:38:35
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-03-24 21:33:18
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
const typeMap = {
  "user": "user",
  "article": "article"
}
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let one = req.params["classify"]
    let url = path.join(process.cwd(), `/upload/${one}`)
    fs.existsSync(url) || fs.mkdirSync(url)
    cb(null, url)
    //cb第一个参数是this指向
  },
  filename: function (req, file, cb) {
    let pathObj = path.parse(file.originalname)
    let name = pathObj.name + Date.now() + pathObj.ext
    console.log(name, "name");
    cb(null, name)
  }
})
let fileOperate = multer({
  storage, limits: {
    fileSize: fileSize
  }
})
/* GET users listing. */

router.post("/:classify", fileOperate.any(), async function (req, res, next) {

  // console.log(req.file,"FILE");
  // let {destination,filename} = req.file
  // const dirName = path.parse(destination).name
  // // console.log(fileInfo,"Info");
  // let Url = path.join(preUrl,dirName,filename)

  // Url = Url.replace(/\\/,"//").replace(/\\/g,"/")
  // console.log(Url,"Url");
  try {
    let type = req.params["classify"]
    if (!(type in typeMap)) {
      // console.log("没有该分类捏");
      assert(false, 422, "没有该分类")
    }
    let Url
    console.log(req, "Reqqqq");
    let urlArr = req.files.map(({ destination, filename }) => {
      // let { destination, filename } = req.file
      const dirName = path.parse(destination).name
      // console.log(fileInfo,"Info");
      Url = path.join(preUrl, dirName, filename)
      Url = Url.replace(/\\/, "//").replace(/\\/g, "/")
      return Url
    })


    if (typeMap[type] === "user") {
      // let id = req.body["uid"]
      let id = req._id
      console.log(id, "xxxxxxxxx");
      assert(id, 42, "没有userId信息")
      let result = await User.findByIdAndUpdate(id, { avatar: Url })
      console.log(result, "result");
      res.send(200, {
        message: "头像上传成功",
        data: urlArr[0]
      })
    }
    res.send(200, {
      message: "图片上传成功",
      "errno": 0,
      data: urlArr
    })
  } catch (error) {
    next(error)
  }

});

module.exports = router;
