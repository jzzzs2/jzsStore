/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-02-02 16:07:59
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-02-02 20:00:10
 */
let mongoose = require("../mongoose/mongoose")
const pattern = mongoose.Schema({
  "title": {
    type: String
  },
  "uid": {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User"
  },
  "intro": {
    type: String
  }
})
const model = mongoose.model("Article",pattern)
module.exports = model