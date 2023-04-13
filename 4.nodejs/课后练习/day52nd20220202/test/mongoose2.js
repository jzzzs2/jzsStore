/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-30 16:38:41
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-02-01 20:44:23
 */
const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/blog_test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  config: { autoIndex: false }
})
// mongoose.connect("mongodb://127.0.0.1:27017/")
let coonect = mongoose.connection
coonect.on("open", function () {
  console.log("data opened");
})
const pattern = mongoose.Schema({
  "username": {
    type: String,
    enum: ["ak","gb"]
    // uppercase: true,
    // index: true,
    // unique: true,
    // required: true
    // required: [true,"username 必须填写捏"]
    // select: false
  },
  "level": {
    type: Number,
    // validate: {
    //   validator: function (v) {
    //     return /^\d+$/.test(v);
    //   },
    //   message: '{VALUE} is not Number'
    // },
    // min: [20,"没20级还想出新手村"]
    // max: [20,"没20级还想出新手村"]
  },
  "password": {
    type: String,

  }
})
const Collect = mongoose.model("user", pattern)
Collect.create({"username": "ak"}).then(data=> {
  console.log(data);
})
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