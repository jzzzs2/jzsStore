/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-30 16:38:41
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-02-02 20:50:07
 */
const mongoose = require("mongoose")
const User = require("./module/User")
const Article = require("./module/Article")
// mongoose.connect("mongodb://127.0.0.1:27017/blog_test", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   // config: { autoIndex: false }
// })
// let coonect = mongoose.connection
// coonect.on("open", function () {
//   console.log("data opened");
// })
console.log(mongoose.Types.ObjectId("63dbaf6062c1ecef84c1d85c").toString());
// const obId = mongoose.Types.ObjectId("63dbaf6062c1ecef84c1d85c")
// User.findOne({"username":"jzs"}).populate("article","title intro").then(data => {
//   console.log(data);
// })
// console.log(obId instanceof mongoose.Types.ObjectId);
// // console.log(obId instanceof mongoose.Schema.Types.ObjectId);
// console.log(typeof obId.toString());
// console.log(new String(obId.toString()) instanceof String);
// console.log(obId.toString());
// Article.find({"intro":"haoye"}).populate("uid","username password").then(data=>{
//   console.log(data);
// })
// Article.find({"intro":"haoye"}).then(data => {
//   let id = data[0]["_id"]
//   User.findByIdAndUpdate(obId,{$push:{"article": id}}).then(data=>{
//     console.log(data);
//   })
// })
// Article.find({"intro":"haoye"}).then(data=>{
//   console.log(data);
// })
// Article.create({"title":"标题1","uid":obId,"intro": "haoye"}).then(data=>{
//   console.log(data);
// })
// User.create({"username": "jzs232","password": "abc123"}).then(data => {
//   console.log(data);
// })
// const Collect = mongoose.model("user", pattern)
// Collect.create({"username": "ak"}).then(data=> {
//   console.log(data);
// })
// Collect.where("level").gt(50).lt(600).then(data=> {
//   console.log(data);
// })
// Collect.where("__v").exists(false).then(data=> {
//   console.log(data);
// })
// Collect.create({ "username": "zzs", "password": "sfsd34234", "level": 3232938 })
// const arr = [
//   {
//     // username: "fdssafas",
//     password: "97668",
//     level: 999
//   },
//   {
//     username: "wang444",
//     password: "23232",
//     level: 999
//   }
// ]
// Collect.create(arr).then(data=> {
//   console.log(data);
// }).catch(err => {
//   // console.log("errors", err.errors["level"].message);
//   // console.log(err.errors["level"]);
//   for (let key in err.errors) {
//     console.log(`${key} 出现错误 ${err.errors[key].message}`);
//   }
// })
// Collect.distinct("password",{"level":{$gt:90,$lt:300}}).then(data => {
//   console.log(data);
// })
// Collect.find().select("username level").sort({"level":1}).then(data => {
//   console.log(data);
// })
// Collect.find().select("username level").sort({"level":-1}).then(data => {
//   console.log(data);
// })