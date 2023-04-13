/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-09 20:34:57
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-01-09 20:54:40
 */
var express = require('express');
var router = express.Router();
const multiparty = require("multiparty")
/* GET users listing. */
router.use(function (req, res, next) {
  // res.send('respond with a resource');
  let formParty = new multiparty.Form({
    uploadDir: "./upload"
  })
  formParty.parse(req, function (err, fields, files) {
    console.log(fields,"fields");
    console.log(files,"files");
  })
  res.send(200)
});

module.exports = router;
