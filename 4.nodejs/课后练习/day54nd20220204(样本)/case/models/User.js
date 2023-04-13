const mongoose = require('mongoose')
const { encrypt } = require('../core/util/util')

/*
  username: 用户名 
  type: String
  validate:/数字+字母 6-8位/:/^(?!\d+$)(?![a-zA-Z]+$)[a-zA-Z0-9]{6,8}$/ 
  required true 必填
  unique true 唯一
  

  passowrd 密码
  type: String
  select false 不可查
  set: encrypt(value) RSA加密
  validate: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!.#*?&]{8,12}$/ 
  required true


  email 邮箱
  type: String
  validate /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/ "请输入合法邮箱地址"
  unique true 

  avatar 头像
  type: String (URL)
  default: "http://127.0.0.1:3000/public/images/avatar.jpg"
  

  nikname 昵称
  type: String
  validate: /^([\w\W]){1,8}$/ 昵称长度 1-8位
  default: "用户"
  
  



*/




const schema = new mongoose.Schema({
  username: {
    required: [true, '用户名必填'],
    index: true,
    type: String,
    validate: {
      validator (val) {
        return /^(?!\d+$)(?![a-zA-Z]+$)[a-zA-Z0-9]{6,8}$/.test(val)
      },
      message: "用户名必须为 数字+字母 6-8位"
    },
    //唯一
    unique: true
  },
  password: {
    type: String,
    //不指定select查询不会返回
    select: false,
    required: [true, '密码必填'],
    set (val) {
      //触发器 setter 写入password时触发 写入数据 => encrypt(源数据)
      return encrypt(val)
    }
  },
  email: {
    type: String,
    required: [true, '邮箱必填'],
    validate: {
      validator: function (val) {
        return /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/.test(val)
      },
      message: "请输入合法邮箱地址"
    },
    unique: true
  },
  avatar: {
    type: String, //URL,
    default: "http://127.0.0.1:3000/public/images/avatar.jpg"
  },

  nikname: {
    type: String,
    validate: {
      validator: function (val) {
        return /^[0-9a-zA-Z\u0391-\uFFE5]{1,8}$/.test(val)
      },
      message: "昵称可包含 数字/英文/汉字 1-8位"
    }
  }
})

let User = mongoose.model('User', schema)
User.find().setOptions
module.exports = User


/*
  User
    ref: Null

  Article
    ref:{
      comments:Comment,
      column:Column,
      author:Author
    }

  Comment
    ref:{
      uid:User,
      aid:Article
    }

  Column
    ref:{
      aids:Article
    }

*/