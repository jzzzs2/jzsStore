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

/*
      字段属性,模式配置
  new Schema({..}, options);
*/
let testSchema = mongoose.Schema({
  "test_id": {
    type: String,
    index: true, //创建索引
    unique: true //唯一索引
  },
  "test_des": String
}, { versionKey: false, autoIndex: true, toObject: { getters: true }, timestamps: true })

/*
  schema options配置项
    autoIndex 自动对所有字段创建索引
    bufferCommands
    capped
    collection 设置默认集合名称
    id 默认生成一个虚拟值 id，指向文档的 _id 字段 false
    _id 默认给你的 Schema 赋值一个 _id true
    minimize Mongoose 默认不保存空对象
    read
    shardKey
    strict 
    strictQuery
    toJSON 查询值转换为JSON
    toObject  查询值转换为js 对象 { getters: true }
    typeKey
    validateBeforeSave
    versionKey
    collation
    skipVersioning
    timestamps 如果设置了 timestamps 选项, mongoose 会在你的 schema 自动添加 createdAt 和 updatedAt 字段， 其类型为 Date。
    useNestedStrict

  schema 常规参数
    type: 字段类型 String Number Date Buffer Boolean Mixed ObjectId Array Decimal128
    required: 布尔值或函数 如果值为真，为此属性添加 required 验证器
    default: 任何值或函数 设置此路径默认值。如果是函数，函数返回值为默认值
    select: 布尔值 指定 query 的默认 projections
    validate: 函数 adds a validator function for this property
    get: 函数 使用 Object.defineProperty() 定义自定义 getter
    set: 函数 使用 Object.defineProperty() 定义自定义 setter
    alias: 字符串 仅mongoose >= 4.10.0。 为该字段路径定义虚拟值 gets/sets
    lowercase: 所有值都转换小写 只能用于type是String的字段

  索引参数
    index: 布尔值 是否对这个属性创建索引
    unique: 布尔值 是否对这个属性创建唯一索引
    sparse: 布尔值 是否对这个属性创建稀疏索引

  string
    lowercase: 布尔值 是否在保存前对此值调用 .toLowerCase()
    uppercase: 布尔值 是否在保存前对此值调用 .toUpperCase()
    trim: 布尔值 是否在保存前对此值调用 .trim()
    match: 正则表达式 创建验证器检查这个值是否匹配给定正则表达式
    enum: 数组 创建验证器检查这个值是否包含于给定数组
  Number
    min: 数值 创建验证器检查属性是否大于或等于该值
    max: 数值 创建验证器检查属性是否小于或等于该值
  Date
    min: Date
    max: Date
*/

//实例化 集合 collection model (集合名,集合模式配置) 集合命( .toLowerCase()+'s')
let Test = mongoose.model('Test', testSchema)

// 集合实例化创建文档 document Document
let test = new Test({ "test_id": "209991", "test_des": "mongoose创建的集合文档" })


test.save((err, test) => {
  if (err) {
    console.log(err)
    return
  }
  console.log(test)
})
