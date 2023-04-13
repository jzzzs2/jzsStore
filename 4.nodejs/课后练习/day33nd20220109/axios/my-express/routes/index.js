/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-09 18:54:39
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-01-09 21:56:23
 */
var express = require('express');
var router = express.Router();
const fs = require("fs")
/* GET home page. */
router.use(function(req, res, next) {
  let data = fs.readFileSync("./upload/222.png")
  console.log(data);
  res.send(200,data)
});

module.exports = router;
