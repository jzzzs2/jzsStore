const mongoose = require('mongoose')
const schema = new mongoose.Schema({
  username: String,
  password: {
    type: String,
    //默认设置 查询 user的document文档的时候 不返回 password字段
    select: false
  }
})

module.exports = mongoose.model('User', schema)