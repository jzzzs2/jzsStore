/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-30 16:45:50
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-01-30 16:50:41
 */
const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/blog_test")
let coonect = mongoose.connection
coonect.on("error",function (err) {
  console.log(err);
})
coonect.on("open",function () {
  console.log("data opened");
})