/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-04 18:07:01
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-01-04 20:49:42
 */
const http = require('http')
const fs = require('fs')
const express = require('express')
const hbs = require("hbs")
const path = require("path")
const app = express()
app.set("views", path.join(__dirname, "/views"))
app.set("view engine", "hbs")
app.use('/', (req, res, next) => {
  let template = hbs.handlebars.compile("<p>{{name}} : {{age}}</p>")
  let data = {
    "obj": {
      "num1": 1,
      "num2": 2,
      "num3": 3
    },
    // "obj": {
    //   "0": 0,
    //   "1": 1,
    //   "2": 2,
    //   "3": 3,
    //   "length": 4
    // },
    "name": "jzs",
    "age": 22,
    "html": template({name: "jzs", age: 22}),
    "test": "<h4>test</h4>",
    "signal": "<<signal>>",
    "list": [
      {
        price: 100,
        product: "time machine",
        items: [
          {
            "weight": 20
          },
          {
            "range": 50
          }
        ],
        obj: {
          addr: "jinhua",
          father: {
            type: "person",
            sex: "woman"
          }
        }
      },
      {
        price: 200,
        product: "bowl machine",
        hot: true,
        items: [
          {
            "weight": 20
          },
          {
            "range": 50
          }
        ]
      },
      {
        price: 900,
        product: "drink",
        hot: true,
        items: [
          {
            "weight": 20
          },
          {
            "range": 50
          }
        ]
      }
    ]
  }
  res.render("index",data)
  // res.render("other",data)
  // let result = app.render("index", data, function (err, html) {
  //   // console.log("html",html);
  //   res.status(200).send(html)

  // })
  // console.log(result, "result");
  // res.status(200).send(result)
})

http.createServer(app).listen(3001, function () {
  console.log(`listen 3001 port`)
})