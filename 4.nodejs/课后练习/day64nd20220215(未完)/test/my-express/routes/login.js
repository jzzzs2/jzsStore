/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-07 19:38:35
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-02-11 21:10:44
 */
const express = require('express');
const router = express.Router();
const { existUser, addUser } = require("../core/userValidate")
const User = require("../model/User")
const assert = require("http-assert")
const {decrypt} = require("../createKey")
const jwt = require("jsonwebtoken")
const { getPublicKey, getPrivateKey } = require("../readKey")
let priKey = getPrivateKey()
let pulKey = getPublicKey()
/* GET users listing. */
router.use('/', async function (req, res, next) {
  let { username, pwd } = req.body
  let password = pwd
  console.log(password,"password");
  try {
    if (username.trim().length === 0 || password.trim().length == 0 || !username || !password) {
      assert(false, 422, "账号或者密码不可为空")
    }
    let result = await User.findOne({username}).select("password")
    assert(result,422,"用户不存在")
    console.log(decrypt(password),decrypt(result.password));
    assert.equal(password,decrypt(result.password),422,"密码错误")
    let id = result["_id"]
    let token = jwt.sign({ username, id, exp: ~~((Date.now() / 1000) + 24 * 3600 * 3) }, priKey, { algorithm: "RS256" })
    console.log(token,"token");
    res.send(200, {
      data: {
        token,
        userId: id 
      },
      message: "登录成功"
    })
  } catch (err) {
    console.log("error",err.message,err.status);
    next(err)
  }

  /*
  1.验证用户名密码是否为空
  2.验证用户是否存在
  3.验证密码是否正确
  4.正确返回token和id
  */
  // console.log(username,pwd,"XXxxxx");
  // let result = existUser(username,pwd)
  // if (result.status == 2000) {
  //   res.send(200, {
  //     ...result
  //   })
  //   return false
  // }
  // res.send(200, {
  //   ...result
  // })
});

module.exports = router;
