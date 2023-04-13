/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-31 18:02:19
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-02-02 19:08:09
 */
let mongoose = require("../mongoose/mongoose")
const pattern = mongoose.Schema({
  "username": {
    type: String,
    required: true,
    validate: {
      validator(val) {
        return /^(?!\d+$)(?![a-zA-Z]+$)[a-zA-Z0-9]{6,8}$/.test(val)
      },
      message: "需要是6-8位 字母+数字"
    }
  },
  "password": {
    type: String,
    required: true,
    validate: {
      validator(val) {
        return /^(?!\d+$)(?![a-zA-Z]+$)[a-zA-Z0-9]{6,8}$/.test(val)
      },
      message: "需要是6-8位 字母+数字"
    }
  },
  "articles": [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Article"
    }
  ]
})
const model = mongoose.model("User", pattern)
module.exports = model
/*
User
 username
  type String
  /^(?!\d+$)(?![a-zA-Z]+$)[a-zA-Z0-9]{6,8}$/
  required
  unique
 password
  type String
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!.#*?&]{8,12}$/
  required
 email
  type  String
  /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
 nickname
  type String
 avatar
  type String
  



    username: /^(?!\d+$)(?![a-zA-Z]+$)[a-zA-Z0-9]{6,8}$/,
    pwd: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!.#*?&]{8,12}$/
    email: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
*/