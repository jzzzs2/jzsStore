/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-02-02 16:07:59
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-03-27 17:24:07
 */
let mongoose = require("./mongoose")
function formatDate(date = new Date(), format = "yyyy-MM-dd hh:mm:ss") {

  let regMap = {
    'y': date.getFullYear(),
    'M': toDouble(date.getMonth() + 1),
    'd': toDouble(date.getDate()),
    "h": toDouble(date.getHours()),
    "m": toDouble(date.getMinutes()),
    "s": toDouble(date.getSeconds())
  }

  //逻辑(正则替换 对应位置替换对应值) 数据(日期验证字符 对应值) 分离
  return Object.entries(regMap).reduce((acc, [reg, value]) => {
    return acc.replace(new RegExp(`${reg}+`, 'g'), value);
  }, format);
}
function toDouble(num) {
  return String(num)[1] && String(num) || '0' + num;
}
const pattern = mongoose.Schema({
  "title": {
    type: String,
    required: true,
    // unique: true
  },
  "content": {
    type: String,
    required: true,
    // set (val) {
    // //   console.log('old', val)
    //   val = encodeURIComponent(val)
    // //   val = val.replace(/\"/g,"'")
    //   console.log('new', val)
    //   return val
    // }
  },
  "author": {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User"
  },
  "cover": {
    type: String,
    default: "http://127.0.0.1:3000/img/miku.jpg"
  },
  "createtime": {
    type: mongoose.Schema.Types.Date,
    default: Date.now,
    get(val) {
      return formatDate(new Date(val))
    }
  },
  "hits_num": {
    type: Number,
    default: 0
  },
  "comments_num": {
    type: Number,
    default: 0
  },
  "clicks_num": {
    type: Number,
    default: 0
  },
  "comments": [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Comment"
    }
  ],
  "classify": {
    type: mongoose.SchemaTypes.ObjectId,
    default: "63e0b3ed0094d7bcfe240ebd",
    ref: "Classify",
    
  },
  "like_users": [
    {
      type: mongoose.SchemaTypes.ObjectId
      // type: String
    }
  ]
})
pattern.set("toJSON", { getters: true })
const model = mongoose.model("Article",pattern)
module.exports = model
// model.create({"title":"page1","content": "%3Cinput%20type%3D%22text%22%20placeholder%3D%22%E6%96%87%E7%AB%A0%E6%90%9C%E7%B4%A2%22%3E%3Ci%20class%3D%22glyphicon%20glyphicon-search%22%3E%3C%2Fi%3E"}).then(data=> {
//   console.log("data",data);
// }).catch(err=> {
//   console.log(err);
// })
/*
title 
  String
  required
  unique
content
  String
  required
cover
  type:String
createtime
  mongoose.Scheme.Types.Date
author
  mongoose.Scheme.Types.ObjectId
  ref: User
hits_num
  Number
  default
comment_num
  Number
clicks_num
 Number
comments
  [
    {
      ref
    }
  ]

*/
// const model = mongoose.model("Article",pattern)
// module.exports = model
