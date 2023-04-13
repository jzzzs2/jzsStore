/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-05 17:33:17
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-01-05 18:13:30
 */
var express = require('express');
var router = express.Router();
let { encrypt,
  decrypt } = require("../utils/util")
let {isExistStorage} = require("../utils/storage")
/* GET users listing. */
router.use('/', async function (req, res, next) {
  // res.send('respond with a resource');
  // console.log(req.body.username);
  // console.log(req.body.pwd);
  let username = req.body.username
  let pwd = req.body.pwd
  if (!username || !pwd || username.length === 0 || pwd.length === 0) {
    res.json({
      msg: "参数有误",
      status: 200
    })
    return false
  }
  //处理参数
  // console.log(await decrypt(pwd),"data");
  // let pbkey = isExistStorage(pwd)
  // console.log(pbkey,"pbKey");
  res.json({
    msg: "ok",
    status: 200,
    data: await decrypt(pwd)
  })
});

module.exports = router;
