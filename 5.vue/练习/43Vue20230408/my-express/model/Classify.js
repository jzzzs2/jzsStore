/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-02-02 16:07:59
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-02-17 12:57:35
 */
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
let mongoose = require("./mongoose")
const pattern = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  createtime: {
    type: mongoose.SchemaTypes.Date,
    default: Date.now,
    get(val) {
      return formatDate(new Date(val))
    }
  },
  articles: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Article"
  }],
  uid: {
    type: mongoose.SchemaTypes.ObjectId
  }

})
pattern.set("toJSON", { "getters": true })
const model = mongoose.model("Classify", pattern)
module.exports = model