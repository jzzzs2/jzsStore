/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-31 18:02:19
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-02-12 11:34:29
 */
let mongoose = require("./mongoose")
let {encrypt,decrypt} = require("../createKey")
const pattern = mongoose.Schema({
  "username": {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(val) {
        return /^(?!\d+$)(?![a-zA-Z]+$)[a-zA-Z0-9]{6,8}$/.test(val)
      },
      message: "用户名是 6-8位 数字+字母"
    }
  },
  "password": {
    type: String,
    select: false,
    required: true,
    set (val) {
      let normalVal = decrypt(decrypt(val))
      if (/^(?!\d+$)(?![a-zA-Z]+$)[a-zA-Z0-9]{8,12}$/.test(normalVal)) {
        return val
      }
      return "密码格式不对"
    },
    validate: {
      validator(val) {
        return val !== "密码格式不对"
      },
      message: "密码是 8-12位 数字+字母(大小写)"
    }
  },
  "email": {
    type: String,
    required: true,
    validate: {
      validator(val) {
        return /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(val)
      },
      message: "邮箱格式错误"
    }
  },
  "nickname": {
    type: String,
    default: "user1",
    validate: {
      validator(val) {
        return /^[\w\W]{1,8}$/.test(val)
      },
      message: "昵称需要 1-8位"
    }
  },
  "avatar": {
    type: String,
    default: "http://127.0.0.1:3000/public/img/miku.jpg"
  }
})
const model = mongoose.model("User", pattern)
module.exports = model
// model.create({"username":"bl123444","password":"343fds","email": "2sds23232@qq.com"}).then(data=> {
//   console.log(data,"data");
// }).catch(err => {
//   if (err.message.indexOf("duplicate key error") !== -1) {
//     console.log("重复的字段值","message");
//     return
//   }
//   for (let key in  err.errors) {
//     console.log(key,err.errors[key].message,"message2");
//   }
// })
// module.exports = model
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