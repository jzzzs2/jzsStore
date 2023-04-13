/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-30 16:38:41
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-01-30 17:56:59
 */
const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/blog_test")
// mongoose.connect("mongodb://127.0.0.1:27017/")
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
    // uppercase: true,
    unique: true
  },
  "level": Number,
  "uid": {
    type: String,
    index: true
  }
})
const Collect = mongoose.model("GAME",pattern)
const doc = new Collect({
  "username": "s23223232s3433",
  "level": 5,
  "uid": 2301202
})
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