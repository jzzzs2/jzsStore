/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-03-25 18:13:07
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-03-27 17:36:36
 */
export default {
    "login": {
      secName: "password",
      url: "admin/login",
      method: "POST",
      rsa: true
    },
    "register": {
      secName: "password",
      url: "admin/regis",
      method: "POST",
      rsa: true
    },
    "index": {
      url: "/index",
      method: "GET",
      auto: true
    },
    "getPublic": {
      secName: "",
      url: "/key",
      method: "GET"
    },
    "articles": {
      url: "/api/rest/articles",
      method: "GET"
    },
    "classifyAdd": {
      url: "/api/rest/classify",
      method: "POST",
    },
    "classify": {
      url: "/api/rest/classify",
      method: "GET",
      rest: true
    },
    "article": {
      rest: true,
      url: "/api/rest/article/:id",
      method: "GET"
    },
    "articleAdd": {
      url: "/api/rest/articles",
      method: "POST"
    },
    "commentAdd": {
      url: "/api/rest/comments",
      method: "POST"
    },
    "info": {
      url: "/info",
      method: "GET"
    },
    "infoModify": {
      url: "/info",
      method: "PUT"
    },
    "photo": {
      url: "/photoModify",
      method: "POST"
    },
    "likeOperate": {
      url: "/nice/:id",
      method: "POST",
      rest: true
    }
}