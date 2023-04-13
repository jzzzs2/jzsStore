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
  "user_id": { type: String },
  "user_name": String,
  "user_age": Number
})


let articleSchema = mongoose.Schema({
  "user_id": mongoose.Schema.Types.ObjectId,
  "user_name": String,
  "user_age": Number
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
// let user = new User({ "user_id": "209991", "user_name": "李四" })

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


//C 新增

//创建一条 文档document 实例化 model
let user = new User({ "user_id": "120001", "user_name": "1李四1", "user_age": 66 })


// //存储数据 user为model的实例 继承原型上的 save方法
// user.save().then(data => {
//   console.log(data)
// }).catch(err => { console.log(err) })

// 增量 increment 版本自增 __v:0 => __v:1 取 => 版本增加 => 存
// User.findOne({ "user_age": 1 }).then(data => {
//   data.increment()
//   console.log(data)
//   data.save()
// }).catch(err => console.log(err))





//R 读取
//model.find()



// User.find() //默认查询

// User.findById() //根据_id查询

// User.findOne() //查询1个

// User.count() 返回查询到的条目的数量

// where $where
// let query = {
//   lte: 67,
//   gte: 3,
//   d: 10
// }

// query = Object.fromEntries(Object.entries(query).map(([key, value]) => {
//   return [`$${key}`, value]
// }))
// console.log(query)

// User.find({ "user_age": query }).then(data => { console.log(data) }).catch(err => {
//   console.log(err)
// });

// User.find({ age: { $gte: 21, $lte: 65 } }, callback);

// where(字段名称).条件1(条件值).条件2(条件值).条件3(条件值)...条件n(条件值).执行(回调函数)
// GET /api/user/:query?lte=65&&gte=21 
// 
// User.where('age').gte(21).lte(65).exec(callback)

//

// user.save().then(data => {
//   console.log(data._id)
//   let id = data._id
//   //documentID 返回筛选参数 参数1 参数2
//   User.findById(id, "user_name user_age").then(data => {
//     console.log(data)
//     //"_id" 是默认索引
//     console.log(`id为 ${JSON.stringify(id)} 的数据查询`)
//   }
//   ).catch()
// }).catch(err => {
//   console.log(err)
// })



// async function findAndRemove (model, query) {
//   try {
//     let result = await model.find(query)
//     if (result) {
//       await model.remove(query)
//       return '查询删除成功'
//     }
//   } catch (err) {
//     console.log(err)
//   }

// }


//D 删除
// User.remove({ "user_age": 1 }).then(data => {
//   console.log(data)
// }).catch(err => console.log(err))


// //删除第一个复合条件的数据 后续可以追加query操作
// User.deleteOne({ "user_age": 1 }).then(data => {
//   console.log(data)
// }).catch(err => console.log(err))
// //删除所有复合条件的数据 后续可以追加query操作
// User.deleteMany({ "user_age": 1 }).then(data => {
//   console.log(data)
// }).catch(err => console.log(err))

// Model.findOneAndRemove()
// Model.findByIdAndRemove()



// findAndRemove(User, { "user_id": "000000d3" }).then(data => {
//   console.log(data)
// })

// //集合.查询文档
// User.find({ "user_id": /\d+/ }, function (err, data) {
//   if (err) {
//     console.log(err)
//     return
//   }
//   if (data) {
//     console.log(data)
//     User.remove({ "user_id": "0000003" }, (err, data) => {
//       if (err) {
//         console.log(err)
//         return
//       }
//     })
//   }

// })


//U 修改 更新
User.update({ "user_age": 10 }, { "user_name": "koo" }).then(data => {
  console.log(data)
}).catch(error => {
  console.log(error)
})
// User.updateMany()
// User.updateOne()

// User.findOneAndUpdate()
// User.findByIdAndUpdate()








