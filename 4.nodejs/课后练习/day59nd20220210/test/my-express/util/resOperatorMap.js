/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-02-06 16:31:46
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-02-07 17:01:41
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
    select: "content uid",
    populate: {
      path: "uid",
      select: "nickname avator"
    }
  },
  {
    path: 'author',
    select: 'nickname avatar',
  },
  ],
  "Comment": [{
    path: 'uid',
    select: 'nickname avator',
  },
  {
    path: "articleId",
    select: "title"
  }
  ],
  "Classify": [{
    path: 'articles',
    select: 'title',
  }]
}
const collRelation = {
  "Article": {
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