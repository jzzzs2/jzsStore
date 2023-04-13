/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-07 19:38:35
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-01-16 20:06:08
 */
const express = require('express');
const expressJwt = require("express-jwt")
const { getPublicKey, getPrivateKey } = require("../readKey")
let pubKey = getPublicKey()
const router = express.Router();
const { tokenTest } = require("../core/userValidate")
/* GET home page. */
router.get('/',function (req, res, next) {
  res.send(200,pubKey)
});

module.exports = router;
