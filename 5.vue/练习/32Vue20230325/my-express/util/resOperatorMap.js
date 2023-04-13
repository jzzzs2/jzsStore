/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-02-06 16:31:46
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-02-16 16:16:40
 */
const User = require("../model/User")
const Article = require("../model/Article")
const Classify = require("../model/Classify")
const Comment = require("../model/Comment")
const selectMap = {
  "Article": [{
    path: 'classify',
    select: 'name',
  },
  {
    path: "comments",
    select: "content uid createtime",
    populate: {
      path: "uid",
      select: "username nickname avatar"
    }
  },
  {
    path: 'author',
    select: 'nickname avatar',
  },
  ],
  "Comment": [{
    path: 'uid',
    select: 'nickname avatar',
  },
  {
    path: "articleId",
    select: "title"
  }
  ],
  "Classify": [{
    path: 'articles',
    select: 'title author',
  }]
}
const collRelation = {
  "Article": {
    prop: "classify",
    "idName": "classify",
    "model":Classify,
    // "ref": "articles",
    "actionName": "findByIdAndUpdate",
    // "action": "$push",
     get(id) {
      return {
        "$push":{
          "articles": id
        }
      }
     }
  },
  "Comment": {
    prop: "articleId",
    "idName": "articleId",
    "model":Article,
    // "ref": "comments",
    "actionName": "findByIdAndUpdate",
    // "action": "$push",
    get(id) {
      return {
        "$push":{
          "comments": id
        },
        $inc: {
          "comments_num": 1
        }
      }
     }
  }
}
module.exports = {
  selectMap,
  collRelation
}