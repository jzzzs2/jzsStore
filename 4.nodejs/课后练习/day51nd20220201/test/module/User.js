/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-31 18:02:19
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-01-31 18:06:00
 */
let mongoose = require("../mongoose/mongoose")
const pattern = mongoose.Schema({
  "username": {
    type: String
  },
  "password": {
    type: String
  },
  "level": {
    type: Number
  }
})
const model = mongoose.model("User",pattern)
module.exports = model