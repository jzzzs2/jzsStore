## MongoDB 非关系型数据库

> 1. 安装mongoDB

```
D:\mongoDB\mongo\bin > mongod.exe --bind_ip 127.0.0.1 --logpath "D:\mongoDB\mongo\logs\mongodb.log" --logappend --dbpath "D:\mongoDB\mongo\data" --serviceName "MongoDB" --serviceDisplayName "MongoDB" --install
```

> 2.查看服务开启
>
> ```
> win+r  services.msc 查看服务是否开启
> 
> cmd中命令关闭开启服务  net start mongodb / net stop mongodb
> ```
>
> 

> 3.开启mongoDB 已经配置环境变量,以便在所有位置都能打开
>
> ```
> cmd中  mongo 命令打开
> ```
>
> ```
> 环境变量: 用户变量中Path输入D:\mongoDB\mongo\bin(到bin目录)
> ```
>
> 4.一些基础命令
>
> ```
> show dbs 显示所有数据库
> db 显示当前所在数据库
> use DATA_NAME 创建且进入数据库 (创建新数据库时,只有数据库中插入数据时,才会显示)
> db.dropDatabase() 进入数据库,删除当前数据库
> 
> db.createCollection(TABLE_NAME) 创建数据库集合
> show collections 显示当前数据库下的所有集合
> db.TABLE_NAME.drop() 删除数据库集合
> 
> db.TABLE_NAME.insertOne({})
> db.TABLE_NAME.insertMany([{},{}])
> ```
>
> + 数据库名小写
>
> 5.update 相关操作符
>
> ```
> update 修改/新增
> 1 $set 设置某个字段值
>  db.users.update({"username":"test2"},{$set:{"level":999}})   //update修改匹配到的第一条数据
> 2 $unset  删除某个字段
>  db.users.update({"username":"test2"},{$unset:{"age":222}})
> 3 $rename 重命名字段
>  db.users.update({"username":"test2"},{$rename:{"level":"year"}})
> 数组相关 被操作字段需要是array
> 4 $push 数组中加入数据
>  db.users.update({"username":"akua"},{$push:{"son":[1,4,5]}})
> 5 $pop
>  db.users.update({"username":"akua"},{$pop:{"tools": 1}}) //1代表删除数组中最后一个数据 -1代表数组中第一个数据
> 6 $pushAll (3.6版本后不可用..忘记了是不是6)
> 7 $pull 删除数组中指定数据
>  db.users.update({"username":"akua"},{$pull:{"tools": 2333}})
> 8 $pullAll
> 9 $addToSet  数组中加入不重复数据
> db.users.update({"username":"akua"},{$addToSet:{"tools": 2333}})
> 10 $inc 将数字类型字段 值增加 
> db.users.update({"username":"test2"},{$inc:{"level":100}})
> ```
>
> 6. 查询find     比较操作符   逻辑符
>
>    ```
>    db.users.find({"level":{$gt: 12}})
>    db.users.find({"level":{$gte: 12}})
>    db.users.find({"level":{$lt: 12}})
>    db.users.find({"level":{$lte: 12}})
>    db.users.find({"level":{$ne: 12}})
>    ```
>
>    ```
>     db.users.find({"username":"test2","level": 13}) 与
>     db.users.find({$or:[{"username":"test2"},{"level":"77"}]}) 或
>    ```
>
>    > find(条件,返回字段)  
>    >
>    > ```
>    > 设置为1代表返回,为0不返回,默认是1,_id比较特殊(只有主动设置为0才不返回)
>    > db.users.find({},{username: 1})  返回的每条文档只有username和_id字段
>    > db.users.find({},{username: 1,_id: 0})
>    > ```
>
> 7. 函数
>
>    ```
>    1 limit() 取前几条记录
>     db.users.find().limit(3)
>    2 skip() 跳过前几条,返回后面所有
>    db.users.find().skip(3)
>    3 pretty() 格式化数据
>    4 sort()
>     db.users.find().sort({"level": 1}) 升序
>     db.users.find().sort({"level": -1}) 降序
>    ```
>
> 8. 删除文档document
>
>    ```
>     db.users.remove({"username":"noodle"},1)  第二个参数代表删除数量,不传则删除所有
>    ```
>
>    

## 索引和复合索引

> 1.索引是特殊的数据结构，索引存储在一个易于遍历读取的数据集合中，索引是对数据库表中一列或多列的值进行排序的一种结构   提高查询效率

```
1
db.test.getIndexes() 获得索引
2
db.test.createIndex({字段名1:升/降序},options) 单索引
db.test.createIndex({字段名1:升/降序,字段名2:升/降序}) 复合索引
样例:db.games.createIndex({"username":1,"level":1},{background:true,unique:true})
3
db.test.dropIndex(query) 删除某个索引
db.test.dropIndexes() 删除所有索引,除了_id
```

+ 升序用1 | 降序用-1

+ 复合索引 设置了unique时,当多个字段同时重复才不可插入数据,有一个字段值不同仍可插入数据

> createIndex  options参数

| Parameter          | Type          | Description                                                  |
| :----------------- | :------------ | :----------------------------------------------------------- |
| background         | Boolean       | 建索引过程会阻塞其它数据库操作，background可指定以后台方式创建索引，即增加 "background" 可选参数。 "background" 默认值为**false**。 |
| unique             | Boolean       | 建立的索引是否唯一。指定为true创建唯一索引。默认值为**false**. |
| name               | string        | 索引的名称。如果未指定，MongoDB的通过连接索引的字段名和排序顺序生成一个索引名称。 |
| dropDups           | Boolean       | **3.0+版本已废弃。**在建立唯一索引时是否删除重复记录,指定 true 创建唯一索引。默认值为 **false**. |
| sparse             | Boolean       | 对文档中不存在的字段数据不启用索引；这个参数需要特别注意，如果设置为true的话，在索引字段中不会查询出不包含对应字段的文档.。默认值为 **false**. |
| expireAfterSeconds | integer       | 指定一个以秒为单位的数值，完成 TTL设定，设定集合的生存时间。 |
| v                  | index version | 索引的版本号。默认的索引版本取决于mongod创建索引时运行的版本。 |
| weights            | document      | 索引权重值，数值在 1 到 99,999 之间，表示该索引相对于其他索引字段的得分权重。 |
| default_language   | string        | 对于文本索引，该参数决定了停用词及词干和词器的规则的列表。 默认为英语 |
| language_override  | string        | 对于文本索引，该参数指定了包含在文档中的字段名，语言覆盖默认的language，默认值为 language. |

### 索引使用限制

```
db.users.find({"user_id":1})
db.users.find({"user_id":$lt:{:}})


//无法使用索引
$where 
```

##### $where

$where ，其实就是 mongo中执行 js代码，来完成查询

```
 db.getCollection('blogs').find({'$where':"function(){ return this.title.length>5}"})
 
 db.blogs.find({'$where':"function(){ return this.title.length>5}"})
```







### Mongoose 驱动

> 作用:  实现nodejs端 与 mongoDB的交互

1.基本使用

```
npm i mongoose
const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/blog_test")   //记得数据库名称
let coonect = mongoose.connection
coonect.on("error",function (err) {
  console.log(err);
})
coonect.on("open",function () {
  console.log("data opened");
})

const pattern = mongoose.Schema({
  "username": {
    type: String,
    uppercase: true,
    unique: true
  },
  "level": Number,
  "uid": {
    type: String,
    index: true
  }
})
const Collect = mongoose.model("GAME",pattern)   //集合
 const doc = new Collect({
   "username": "s23223232s3433",
   "level": 5,
   "uid": 2301202
 })  //document
 
 
 
 
 //crud
 Collect.updateOne({"username": "jzs"},{$set: {"level":0}},function (err) {
  if (!err) {
    console.log("success");
    return
  }
  console.log(err);
})
doc.save(function (err,data) {
  if (err) {
    console.log(err);
    return
  }
  console.log(data,"data");
})
Collect.deleteOne({"username":"sdfs3433"},function (err) {
  console.log(err);
})
Collect.find({"username": /.+/},function (err,docs) {
  if (err) {
    console.log(err);
  }
  console.log(docs,"docs");
})
```



```
类型SchemaTypes
	String
    Number
    Date
    Buffer
    Boolean
    Mixed
    ObjectId
    Array
    Decimal128
Schema字段对象参数
    type:数据类型
    required: 布尔值或函数 如果值为真，为此属性添加 required 验证器
    default: 任何值或函数 设置此路径默认值。如果是函数，函数返回值为默认值
    select: 布尔值 字段取出数据字段是否存在
    validate: 函数 adds a validator function for this property
    get: 函数 使用 Object.defineProperty() 定义自定义 getter
    set: 函数 使用 Object.defineProperty() 定义自定义 setter
    alias: 字符串 仅mongoose >= 4.10.0。 为该字段路径定义虚拟值 gets/sets
    index: 布尔值 是否对这个属性创建索引
	unique: 布尔值 是否对这个属性创建唯一索引
	sparse: 布尔值 是否对这个属性创建稀疏索引
	lowercase: 布尔值 是否在保存前对此值调用 .toLowerCase()
	uppercase: 布尔值 是否在保存前对此值调用 .toUpperCase()
	trim: 布尔值 是否在保存前对此值调用 .trim()
	match: 正则表达式 创建验证器检查这个值是否匹配给定正则表达式
	enum: 数组 创建验证器检查这个值是否包含于给定数组
```

```
crud
增加
// Collect.create({"username":"jh","level": 999}).then(data => {
//   console.log(data);
// }).catch(err => console.log(err))
删除
// Collect.deleteOne({"username":"sdfs3433"},function (err) {
//   console.log(err);
// })
// Collect.remove({"level":999}).then(data=> {
//   console.log(data,"data");
// })
// Model.findOneAndRemove()
// Model.findByIdAndRemove()
修改
// Collect.updateOne({"username": "jzs"},{$set: {"level":0}},function (err) {
//   if (!err) {
//     console.log("success");
//     return
//   }
//   console.log(err);
// })
// User.updateMany()
Model.findOneAndUpdate()
Model.findByIdAndUpdate()
查询
Model.find()
Model.findById()
Model.findOne()
User.where('age').gte(21).lte(65).exec(callback);
let result = await Article.find({
      $or: [
        {
          "content": {
            "$regex": regExp
          }
        },
        {
          "title": {
            "$regex": regExp
          }
        }
      ]
    })
```

```
db.users.distinct("password")
[ "hhh", "jzs", "zzs" ]
db.users.find().sort({"level":-1})
```



## 聚合 aggregate

> db.users.aggragate([{$group:{_id:分组字段,username:"$username",count:{$sum: 1}}}])
>
> 得到 {_id:xxx,username:xxxx,count:xxxx}

```
例子:
db.users.aggregate([{$group:{_id:"$password",count:{$sum:1},dup:{$addToSet:"$_id"}}},{$match:{"count":{$gt:1}}}]).forEach(function(item,idx){var id= item["dup"][0];db.users.deleteOne({"_id":id})})
```

| 表达式    | 描述                                           | 实例                                                         |
| :-------- | :--------------------------------------------- | :----------------------------------------------------------- |
| $sum      | 计算总和。                                     | db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$sum : "$likes"}}}]) |
| $avg      | 计算平均值                                     | db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$avg : "$likes"}}}]) |
| $min      | 获取集合中所有文档对应值得最小值。             | db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$min : "$likes"}}}]) |
| $max      | 获取集合中所有文档对应值得最大值。             | db.mycol.aggregate([{$group : {_id : "$by_user", num_tutorial : {$max : "$likes"}}}]) |
| $push     | 在结果文档中插入值到一个数组中。               | db.mycol.aggregate([{$group : {_id : "$by_user", url : {$push: "$url"}}}]) |
| $addToSet | 在结果文档中插入值到一个数组中，但不创建副本。 | db.mycol.aggregate([{$group : {_id : "$by_user", url : {$addToSet : "$url"}}}]) |
| $first    | 根据资源文档的排序获取第一个文档数据。         | db.mycol.aggregate([{$group : {_id : "$by_user", first_url : {$first : "$url"}}}]) |
| $last     | 根据资源文档的排序获取最后一个文档数据         | db.mycol.aggregate([{$group : {_id : "$by_user", last_url : {$last : "$url"}}}]) |

- $project：修改输入文档的结构。可以用来重命名、增加或删除域，也可以用于创建计算结果以及嵌套文档。
- $match：用于过滤数据，只输出符合条件的文档。$match使用MongoDB的标准查询操作。
- $limit：用来限制MongoDB聚合管道返回的文档数。
- $skip：在聚合管道中跳过指定数量的文档，并返回余下的文档。
- $unwind：将文档中的某一个数组类型字段拆分成多条，每条包含数组中的一个值。
- $group：将集合中的文档分组，可用于统计结果。
- $sort：将输入文档排序后输出。
- $geoNear：输出接近某一地理位置的有序文档。

### 查询queries

[Model](https://cn.mongoosedoc.top/docs/api.html#model_Model) 的方法中包含查询条件参数的（ [find](https://cn.mongoosedoc.top/docs/api.html#model_Model.find) [findById](https://cn.mongoosedoc.top/docs/api.html#model_Model.findById) [count](https://cn.mongoosedoc.top/docs/api.html#model_Model.count) [update](https://cn.mongoosedoc.top/docs/api.html#model_Model.update) ）都可以按以下两种方式执行：

- 传入 `callback` 参数，操作会被立即执行，查询结果被传给回调函数（ callback ）。

- 不传 `callback` 参数，[Query](https://cn.mongoosedoc.top/docs/api.html#query-js) 的一个实例（一个 query 对象）被返回，这个 query 提供了构建查询器的特殊接口。[Query](https://cn.mongoosedoc.top/docs/api.html#query-js) 实例有一个 `.then()` 函数，用法类似 promise。

  传callback参数的情况：

```
var Person = mongoose.model('Person', yourSchema);

// 查询每个 last name 是 'Ghost' 的 person， select `name` 和 `occupation` 字段
Person.findOne({ 'name.last': 'Ghost' }, 'name occupation', function (err, person) {
  if (err) return handleError(err);
  // Prints "Space Ghost is a talk show host".
  console.log('%s %s is a %s.', person.name.first, person.name.last,
    person.occupation);
});

```

不传callback参数的情况：

```
// 查询每个 last name 是 'Ghost' 的 person
var query = Person.findOne({ 'name.last': 'Ghost' });

// select `name` 和 `occupation` 字段
query.select('name occupation');

// 然后执行查询
query.exec(function (err, person) {
  if (err) return handleError(err);
  // Prints "Space Ghost is a talk show host."
  console.log('%s %s is a %s.', person.name.first, person.name.last,
    person.occupation);
});
```




| name               | effect                                                       |
| ------------------ | ------------------------------------------------------------ |
| select             | 添加需要显示的字段,需要的字段在字段后加上:1,不需要的加上0;<br/>query.select({ a: 1, b: 0 }); //显示a字段, 隐藏b字段<br/>不能和distinct方法一起使用 |
| distinct           | 用来筛选不重复的值或者字段<br/>distinct(field). //筛选指定不重复字段的数据 |
| $lt,$lte,$gt,$gte. | 分别对应: <,<=,>,>=. 该字段是用在condition中的.如果,你想要链式调用,则需要使用<br/>lt,lte,ge,gte.<br/>eg:<br/> model.find({num:{$gt:12}},cb)<br/>model.where(‘num’).gt(12).exec(cb) |
| $in                | 查询包含键值的文档,<br/>model.find({name:{$in:[“jimmy”,“sam”]}}) //相当于匹配 jimmy或者sam |
| $nin               | 返回不匹配查询条件文档,都是指定数组类型<br/>model.find({name:{$nin:[“jimmy”,“sam”]}}) |
| $ne                | 表示不包含指定值<br/>model.find({name:{$ne:“sam”}})          |
| $or                | 表示或查询<br/>model.find({$or:[{ color: ‘red’ }, { status: ‘emergency’ }]}) |
| $exists            | 表示键值是否存在;<br/>model.find({name:{$exists:true}})      |
| $all               | 通常用来匹配数组里面的键值,匹配多个值(同时具有)<br/>$all:[“apple”,“banana”,“peach”]} |
| $size              | 用来查询数组的长度值<br/>model.find({name:{$size:3}}); 匹配name的数组长度为3 |
| $slice             | 用来获取数组字段的内容:<br/>query.slice(‘comments’, 5)       |

```
例子:
Collect.where("__v").exists(false).then(data=> {
  console.log(data);
})
Collect.distinct("password",{"level":{$gt:90,$lt:300}}).then(data => {
   console.log(data);
 })
Collect.find().select("username level").sort({"level":-1}).then(data => {
   console.log(data);
 })
```



- **limit:**用来获取限定长度的内容.

```
query.limit(20); //只返回前20个内容
```

- skip: 返回，跳过指定doc后的值.

```
query.skip(2);
```

- sort: 用来设置根据指定字段排序. 可以设置为1:升序, -1:降序.

```
query.sort({name:1,age:-1});
```

#### 

## 索引

```
const pattern = mongoose.Schema({
  "username": {
    type: String,
     index: true,
     unique: true,
  },
  "level": {
    type: Number,
    validate: {
      validator: function (v) {
        return /^\d+$/.test(v);
      },
      message: '{VALUE} is not Number'
    }
  },
  "password": {
    type: String,

  }
})
```

```
var User = mongoose.model('User', {
  username: {
      type: String
  },
  password: String
});

//schema统一设置索引
User.index({
    username: 1 / -1  (正向和逆向)
})
```



```
关闭索引
mongoose.connect("mongodb://127.0.0.1:27017/blog_test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  config: { autoIndex: false } //模式中设置的索引无效
})
```

## Validation验证器

```
自定义验证
const pattern = mongoose.Schema({
  "username": {
    type: String,
  },
  "level": {
    type: Number,
    validate: {
      validator: function (v) {
        return /^\d+$/.test(v);
      },
      message: '{VALUE} is not Number'
    }
  },
  "password": {
    type: String,

  }
})
```

```
验证
- required: 表示必填字段.

​```
new Schema({
 name: {
    type:String,
    required:[true,"name 是必须的"] //第二个参数是错误提示信息
 }
})
​```

- min,max: 用来给Number类型的数据设置限制.

​```
 var breakfastSchema = new Schema({
      eggs: {
        type: Number,
        min: [6, 'Too few eggs'],
        max: 12
      }
});
​```

- enum,match,maxlength,minlength: 这些验证是给string类型的. enum 就是枚举,表示该属性值,只能出席那那些. match是用来匹配正则表达式的. maxlength&minlength 显示字符串的长度.

​```
new Schema({
    drink: {
        type: String,
        enum: ['Coffee', 'Tea']
      },
     food:{
        type: String,
        match:/^a/,
        maxlength:12,
        minlength:6
    }
})



```

```
获取验证错误信息
Collect.create(arr).then(data=> {
   console.log(data);
 }).catch(err => {
    console.log("errors", err.errors["level"].message);
    console.log(err.errors["level"]);
   for (let key in err.errors) {
     console.log(`${key} 出现错误 ${err.errors[key].message}`);
   }
 })
```

## populate 使用  外链

```
const pattern = mongoose.Schema({
  "title": {
    type: String
  },
  "uid": {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User"
    //这里的值要和外链的另一个collection的创建model时参数中设置的值相等
    //mongoose.model("User", pattern)
  },
  "intro": {
    type: String
  }
})
const model = mongoose.model("Article",pattern)
===========================================
 Article.find({"intro":"haoye"}).populate("uid","username password").then(data=>{
   console.log(data);
 })
 
 获得:
 {
    _id: new ObjectId("63dbaf9059135087a36ab4b0"),
    title: '标题1',
    uid: {
      _id: new ObjectId("63dbaf6062c1ecef84c1d85c"),
      username: 'jzs232',
      password: 'abc123'
    },
    intro: 'haoye',
    __v: 0
 }
```

## ObjectId类型获得和转换

```
设置ObjectId类型  mongoose.SchemaTypes.ObjectId
转换字符为ObjectId类型 mongoose.Types.ObjectId("63dbaf6062c1ecef84c1d85c")
ObjectId类型转化为字符串 objId.toString()
```

## 当插入重复字段数据报错 (字段设置了unique)

```
Collect.create({xx:xx}).then(data=>{}).catch(err => {
 if (err.message.indexOf("duplicate key error") !== -1) {
  //字段值重复
  return
 }
 for (let key in  err.errors) {
     console.log(key,err.errors[key].message,"message2");
   }
})

err.keyPattern    { username(重复字段): 1 }  
```

## populate 嵌套使用

```
model.find({xx:xx}).populate({
 path: "ref外链字段",
 select: "选择字段"
})
```

```
例子:
	path: "comments",
    select: "content uid", //uid也是一个ref外链字段
    populate: {
      path: "uid",
      select: "nickname avator"
    }
```

+ 对Query对象进行操作时,需要先用toJSON方法进行转换,因为取出的是Bjson数据 ,无法直接进行操作.