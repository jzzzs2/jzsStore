/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-07 19:38:35
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-03-17 20:07:42
 */
const express = require('express');
const router = express.Router();
const { existUser, addUser } = require("../core/userValidate")
const User = require("../model/User")
const assert = require("http-assert")
const { decrypt,encrypt } = require("../createKey")
const jwt = require("jsonwebtoken")
const { getPublicKey, getPrivateKey } = require("../readKey")
const createError = require("http-errors")
let priKey = getPrivateKey()
let pulKey = getPublicKey()
/* GET users listing. */
router.post('/:type', async function (req, res, next) {
  let { username,email,password } = req.body
  let type = req.params["type"]
  let id;
  try {
    if (username.trim().length === 0 || password.trim().length == 0 || !username || !password) {
      assert(false, 422, "账号或者密码不可为空")
    }
    if (type === "login") {
      let result = await User.findOne({ username }).select("password")
      assert(result, 422, "用户不存在")
      console.log(decrypt(password),decrypt(result.password),"++++++++++++");
      assert.equal(decrypt(password), decrypt(decrypt(result.password)), 422, "密码错误")
      id = result["_id"]
    }
    if (type === "regis") {
      password = encrypt(password)
      let result = await User.create({ username, password, email })
      id = result["_id"]
    }

    let token = jwt.sign({ username, id, exp: ~~((Date.now() / 1000) + 24 * 3600 * 3) }, priKey, { algorithm: "RS256" })
    console.log(token, "token");
    res.send(200, {
      data: {
        token,
        userId: id
      },
      message: "登录成功"
    })
  } catch (err) {
    console.log("error", err.message, err.status);
    next(err)
  }
});
module.exports = router;


