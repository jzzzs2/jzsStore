/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-03 18:12:02
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-01-03 20:44:00
 */
const express = require("express")
const fs = require("fs")
const http = require("http")
const cors = require("cors")
const morgan = require("morgan")
const httperrors = require("http-errors")
const cookieParser = require("cookie-parser")
let app = express()
// app.use(morgan("combined"))
app.use(morgan("short"))
app.use(cookieParser())
// console.log(req.origin.url,"tset");
app.use(cors({
  origin: "http://127.0.0.1:5500",
  optionsSuccessStatus: 200,
  credentials: true,
  maxAge: 33543,
  preflightContinue: false,
}))
app.use("/user", function (req, res, next) {
  console.log(req.originalUrl, "tset");

  // next(httperrors(403))
  // next(httperrors(404))
  // console.log("yao G la");
  // next(httperrors(403))
  console.log(req.cookies, "cookies");
  res.header("Set-Cookie", "name=jzs")
  res.status(200).send("okkk")
})
app.use(function (error, req, res, next) {
  console.log(error, error.message, "error");
  throw error
  // next()
})
http.createServer(app).listen(3001, function () {
  console.log("3001 端口开启");
})