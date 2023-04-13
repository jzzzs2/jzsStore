/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-02-07 18:09:38
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-02-07 20:38:42
 */
const Article = require("../model/Article")
let putMap = {
  "Article": {
    field: ["title","content","cover","classify"],
    authName: "author"
  },
  "Comment": {
    field: ["content"],
    authName: "uid"
  },
  "Classify": {
    field: ["name"],
    authName: "uid"
  },
  "User": {
    field: ["password","email","nickname","avatar"],
    authName: "_id"
  }
}
module.exports = putMap