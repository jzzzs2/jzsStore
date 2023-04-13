/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-07 19:38:35
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-01-16 22:30:39
 */
const express = require('express');
const router = express.Router();
const {existUser, addUser} = require("../core/userValidate")
/* GET users listing. */
router.use('/', function(req, res, next) {
  let {username, pwd} = req.body
  console.log(username,pwd,"XXxxxx");
  let result = existUser(username,pwd)
  if (result.status == 2000) {
    res.send(200, {
      ...result
    })
    return false
  }
  res.send(200, {
    ...result
  })
});

module.exports = router;
