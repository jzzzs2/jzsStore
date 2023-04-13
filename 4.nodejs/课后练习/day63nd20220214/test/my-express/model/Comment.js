/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-02-02 16:07:59
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-02-07 17:34:38
 */
let mongoose = require("./mongoose")
const pattern = mongoose.Schema({
  content: {
    type: String,
    required: true,
    set(val) {
      return decodeURIComponent(val)
    }
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