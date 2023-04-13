/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-07 19:38:35
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-02-09 15:16:38
 */
const express = require('express');
const expressJwt = require("express-jwt")
const { getPublicKey, getPrivateKey } = require("../readKey")
let pubKey = getPublicKey()
const router = express.Router();
const { tokenTest } = require("../core/userValidate")
const Key = require("../model/Key")
/* GET home page. */
router.get('/', async function (req, res, next) {
  try {
    let key = await Key.findOne({})
    res.send(200, {
      message: "ok",
      data: {
        pubKey: key.content
      }
    })
  } catch (error) {
    next(error)
  }
  // res.send(200,pubKey)
});
module.exports = router;
