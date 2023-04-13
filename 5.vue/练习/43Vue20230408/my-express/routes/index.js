/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-07 19:38:35
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-01-08 13:55:29
 */
const express = require('express');
const expressJwt = require("express-jwt")
const { getPublicKey, getPrivateKey } = require("../readKey")
let priKey = getPrivateKey()
let pubKey = getPublicKey()
const router = express.Router();
const { tokenTest } = require("../core/userValidate")
/* GET home page. */
router.get('/', expressJwt({
  secret: pubKey,
  algorithms: ["RS256"],
  isRevoked: function (req, payload, next) {
    // req.tokenId = payload.username
    let { name, pwd } = payload
    console.log(name,pwd,"xxxx");
    let result = tokenTest(name, pwd)
    if (result.status == "2005") {
      next()
    } else {
      res.send(200, {
        msg: "token错误",
        status: 400
      })
      return false
    }
    //payload { username: 'jzs', exp: 1673265621, iat: 1673006421 }
    // next()
  }
}), function (req, res, next) {
  res.send(200, {
    msg: "token正确",
    status: 200
  })
});

module.exports = router;
