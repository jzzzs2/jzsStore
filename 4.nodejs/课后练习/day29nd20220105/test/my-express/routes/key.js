/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-05 18:19:43
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-01-05 18:30:03
 */
var express = require('express');
var router = express.Router();
var path = require("path")
var fs = require("fs")

/* GET home page. */
router.use('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  let result = fs.readFileSync(path.join(process.cwd(),"/auth/public.cer"),"utf8")
  console.log(result);
  res.send({
    msg: "ok",
    data: result
  })
});

module.exports = router;
