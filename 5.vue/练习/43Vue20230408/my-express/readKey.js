/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-07 20:25:18
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-01-07 21:21:19
 */
const fs = require("fs")
const path = require("path")
module.exports = {
  getPublicKey () {
    return fs.readFileSync(path.join(__dirname,"/auth/public.cer"),"utf8")
  },
  getPrivateKey () {
    return fs.readFileSync(path.join(__dirname,"/auth/private.cer"),"utf8")
  }
}