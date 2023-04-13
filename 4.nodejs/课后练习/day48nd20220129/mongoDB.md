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