/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-02-07 18:09:38
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-02-07 18:23:30
 */
const Article = require("../model/Article")
let getMap = {
  "Article": {
    "model":Article,
     get(id) {
      return {
        "$inc":{
          "clicks_num": 1
        }
      }
     }
  }
}
module.exports = getMap