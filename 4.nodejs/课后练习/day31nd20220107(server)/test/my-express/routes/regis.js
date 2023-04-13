/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-07 19:38:35
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-01-16 22:21:54
 */
const express = require('express');
const router = express.Router();
const {existUser, addUser} = require("../core/userValidate")
/* GET users listing. */
router.post("/",async function(req, res, next) {
  console.log(req.body,"body");
  let {username, pwd} = req.body
  // console.log(name,password,"params",req.body);
  let result = await addUser(username,pwd)
  // console.log(result,"result");
  if (result.status == 2004) {
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
