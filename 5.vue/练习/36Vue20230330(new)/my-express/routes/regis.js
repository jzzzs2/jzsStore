/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-07 19:38:35
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-02-03 20:01:55
 */
const express = require('express');
const router = express.Router();
const { existUser, addUser } = require("../core/userValidate")
const { decrypt, encrypt } = require("../createKey")
const User = require("../model/User")
const assert = require("http-assert")
const jwt = require("jsonwebtoken")
const { getPublicKey, getPrivateKey } = require("../readKey")
let priKey = getPrivateKey()
let pulKey = getPublicKey()
const createError = require("http-errors")
/* GET users listing. */
router.post("/", async function (req, res, next) {
  console.log(req.body, "body");
  let { username, pwd, email } = req.body
  let password = pwd
  try {
    if (username.trim().length === 0 || password.trim().length == 0 || !username || !password) {
      assert(false, 422, "账号或者密码不可为空")
    }
    let result = await User.create({ username, password, email })
    password = encrypt(password)
    let id = result["_id"]
    let token = jwt.sign({ username, id, exp: ~~((Date.now() / 1000) + 24 * 3600 * 3) }, priKey, { algorithm: "RS256" })
    console.log(token, "token");
    res.send(200, {
      data: {
        token,
        userId: id
      },
      message: "注册成功"
    })
  } catch (err) {
    console.log(err.keyPattern,"Pattern");
    // console.log(err,"errrrrrrrrrrrr");
    // console.log(err.status,"status222");
    if (err.status == 422) {
      next(err)
    }
    if (err.message.indexOf("duplicate key error") !== -1) {
      //字段值重复
      next(createError(422,"字段值重复"))
      return
    }
    let Str = ""
    for (let key in err.errors) {
      console.log(key, err.errors[key].message, "message2");
      Str += err.errors[key].message + "| "
    }
    console.log(Str,"Str");
    next(createError(422,Str))
  }

  // console.log(name,password,"params",req.body);
  // let result = await addUser(username,pwd)
  // console.log(result,"result");
  // if (result.status == 2004) {
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
