//引入mongoose
const mongoose = require('mongoose')
//连接数据库 协议://host:port/db_name
mongoose.connect('mongodb://127.0.0.1:27017/db_blog')
//获取连接控制
let db = mongoose.connection;
//监听连接时发生的事件
db.on("error", (err) => {
  console.log(err)
})
//监听数据库连接打开
db.on("open", () => {
  console.log("数据库已连接")
})
/*
  创建schema 
  schema 
  
  支持类型 
      String
      Number
      Date
      Buffer
      Boolean
      Mixed
      ObjectId
      Array
      Decimal128

*/
//集合模式 options schema
let userSchema = mongoose.Schema({
  "user_id": { String },
  "user_name": String
})

/*


  schema 字段值
    type: 字段类型 String Number Date Buffer Boolean Mixed ObjectId Array Decimal128
    required: 布尔值或函数 如果值为真，为此属性添加 required 验证器
    default: 任何值或函数 设置此路径默认值。如果是函数，函数返回值为默认值
    select: 布尔值 指定 query 的默认 projections
    validate: 函数 adds a validator function for this property
    get: 函数 使用 Object.defineProperty() 定义自定义 getter
    set: 函数 使用 Object.defineProperty() 定义自定义 setter
    alias: 字符串 仅mongoose >= 4.10.0。 为该字段路径定义虚拟值 gets/sets
    lowercase: 所有值都转换小写 只能用于type是String的字段
*/

//实例化 集合 collection model
let User = mongoose.model('User', userSchema)

// 集合实例化创建文档 document Document
let user = new User({ "user_id": "209991", "user_name": "李四" })

//存储数据 操作数据库进行 insert
// user.save(function (err, user) {
//   if (err) {
//     console.log(err)
//   }
//   console.log(user)
// })

// 集合.删除文档
// User.deleteOne({ "user_id": "209991" }, function (err) {
//   if (err) {
//     console.log(err)
//   }
// })

//集合.查询文档
User.find({ "user_id": /\d+/ }, function (err, data) {
  if (err) {
    console.log(err)
    return
  }
  console.log(data)
})




