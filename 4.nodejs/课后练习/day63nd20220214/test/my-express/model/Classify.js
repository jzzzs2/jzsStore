/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-02-02 16:07:59
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-02-14 19:06:18
 */
let mongoose = require("./mongoose")
const pattern = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  createtime: {
    type: mongoose.SchemaTypes.Date,
    default: Date.now
  },
  articles: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Article"
  }],
  uid: {
    type: mongoose.SchemaTypes.ObjectId
  }
  
})
const model = mongoose.model("Classify",pattern)
module.exports = model