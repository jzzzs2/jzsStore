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