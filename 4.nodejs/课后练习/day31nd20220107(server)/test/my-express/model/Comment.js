/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-02-02 16:07:59
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-02-02 20:33:34
 */
let mongoose = require("./mongoose")
const pattern = mongoose.Schema({
  content: {
    type: String
  },
  uid: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User"
  },
  articleId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Article"
  },
  createtime: {
    type: mongoose.SchemaTypes.Date,
    default: Date.now
  }
})
const model = mongoose.model("Comment",pattern)
module.exports = model