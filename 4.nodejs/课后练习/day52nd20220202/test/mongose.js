/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-30 16:38:41
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-02-02 19:06:30
 */
const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/blog_test")
// mongoose.connect("mongodb://127.0.0.1:27017/")
let coonect = mongoose.connection
coonect.on("error", function (err) {
  console.log(err);
})
coonect.on("open", function () {
  console.log("data opened");
})
// const pattern = mongoose.Schema({
//   "username": {
//     type: String,
//     // uppercase: true,
//     unique: true,
//     // select: false
//   },
//   "level": Number,
//   "uid": {
//     type: String,
//     index: true
//   }
// })
// const Collect = mongoose.model("GAME", pattern)
// Collect.findOne({"username":"jzs232"}).then(async data => {
//   if (data) {
//     // let result = await Collect.findByIdAndDelete(data["_id"])
//     let result = await Collect.findById(data["_id"],"username level")
//     // let result = await Collect.findById(data["_id"])
//     console.log(result,"result");
//   }
// })
// Collect.where("level").lt(900).exec().then(data => {
//   console.log(data);
// })
// Collect.count({"level":{$gt: 200}}).then(data => {
//   console.log(data,"data");
// })
// findAndRemove(Collect, { "username": "zjc" }).then(data => {
//   console.log(data, "data");
// }).catch(err => {
//   console.log(err);
// })
// async function findAndRemove(model, query) {
//   try {
//     let result = await model.find(query)
//     if (result) {
//       // console.log(result[0],"result");
//       console.log(query);
//       await model.remove(query)
//       return "删除成功"
//     }
//     return "not found"
//   } catch (error) {

//   }

//   // console.log("not found");

// }
// Collect.find({"level":999}).then(data=>{
//   console.log(data,"data");
// })
// Collect.remove({"level":999}).then(data=> {
//   console.log(data,"data");
// })
// Collect.deleteOne({"level":999}).then(data => {
//   console.log(data,"data");
// })
// Collect.create({"username":"jh","level": 999}).then(data => {
//   console.log(data);
// }).catch(err => console.log(err))
// const doc = new Collect({
//   "username": "s23223232s3433",
//   "level": 5,
//   "uid": 2301202
// })
// Collect.updateOne({"username": "jzs"},{$set: {"level":0}},function (err) {
//   if (!err) {
//     console.log("success");
//     return
//   }
//   console.log(err);
// })
// doc.save(function (err,data) {
//   if (err) {
//     console.log(err);
//     return
//   }
//   console.log(data,"data");
// })
// Collect.deleteOne({"username":"sdfs3433"},function (err) {
//   console.log(err);
// })
// Collect.find({"username": /.+/},function (err,docs) {
//   if (err) {
//     console.log(err);
//   }
//   console.log(docs,"docs");
// })

// User.updateMany()
// User.updateOne()

// User.findOneAndUpdate()
// User.findByIdAndUpdate()
// Collect.updateMany({"level":999},{"level":700}).then(data => {
//   console.log(data,"data");
// })
Collect.findOneAndUpdate({"username":"jzs232"},{"level":0}).then(async data => {
  // console.log(data,"data");
  let result = await Collect.findByIdAndUpdate(data["_id"],{"username": "keainie"})
  console.log(result,"result");
})