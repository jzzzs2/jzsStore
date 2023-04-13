/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-07 19:38:35
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-03-29 22:04:21
 */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors")
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
const regRouter = require("./routes/regis")
const publicRouter = require("./routes/getPublicKey")
const switchName = require("./middleWare/switchParams")
const busRouter = require("./routes/bus")
const searchRouter = require("./routes/search")
const fileRouter = require("./routes/upload")
const { preUrl, fileSize } = require("./util/util")
const expressJwt = require("express-jwt")
const { getPublicKey } = require("./readKey")
const niceRouter = require("./routes/nice")
const adminRouter = require("./routes/admin")
const User = require("./model/User")
const Article = require("./model/Article")
const Classify = require("./model/Classify")
const infoRouter = require("./routes/info")
const photoRouter = require("./routes/photo")
require("./socket")
var app = express();
let mulErrorMap = {
  'LIMIT_FILE_SIZE': `文件大小不能超过${fileSize}`,
  "credentials_required": "权限不足"
}
app.use(cors({
  "origin": true, //true 设置为 req.origin.url
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE", //容许跨域的请求方式
  "allowedHeaders": "x-requested-with,Authorization,token, content-type", //跨域请求头
  "preflightContinue": false, // 是否通过next() 传递options请求 给后续中间件 
  "maxAge": 1728000, //options预验结果缓存时间 20天
  "credentials": true, //携带cookie跨域
  "optionsSuccessStatus": 200 //options 请求返回状态码
}))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'upload')));
// app.use("*",function (req,res,next) {
//   console.log(req.body);
//   res.send("ok")
//   res.end()
// })
//检权
let publicKey = getPublicKey()
app.use(expressJwt({
  secret: publicKey,
  algorithms: ["RS256"],
  isRevoked: function (req, payload, next) {
    // req.tokenId = payload.username
    console.log(payload.id, payload.username, "payload");
    if (payload.id) {
      console.log("jin xin fuzhi");
      req._id = payload.id
      if (User.find({ "_id": payload._id })) {
        console.log("身份验证通过");
        req.isPass = true
        next()
        return 
      }
      console.log("身份验证未通过");
    }
    //payload { username: 'jzs', exp: 1673265621, iat: 1673006421 }
    next()
  }
}).unless({
  path: [
    { url: "/key", methods: "GET" },
    { url: "/public" },
    { url: "/img" },
    { url: "/admin/login", methods: ["GET", "POST"] },
    { url: "/admin/regis", methods: ["GET", "POST"] },
    { url: "/search", methods: "GET" },
    { url: "/api/rest/articles", methods: "GET" },
    // { url: /\/api\/rest/, methods: "GET" },
    { url: /nice/, methods: ["GET", "POST"] },
    // { url: /upload/ },
    { url: "/test"}
  ]
}))
app.use('/api/rest/:resource', switchName(), busRouter);
app.use("/info",infoRouter)
// app.use('/index', indexRouter);
// app.use('/login', loginRouter);
// app.use('/admin/login', loginRouter);
// app.use("/regis",regRouter)
// app.use("/admin/regis", regRouter)
app.use("/admin", adminRouter)
// app.use("/getPublic",publicRouter)
app.use("/key", publicRouter)
app.use("/upload", fileRouter)
app.use("/search", searchRouter)
app.use("/nice", niceRouter)
app.use("/photoModify",photoRouter)
app.get("/index", async function (req, res, next) {
  console.log("进入index了捏");
  
  if (req.isPass) {
    let articleNum = (await Article.find({author: req._id})).length
    let classifyNum = (await Classify.find({uid: req._id})).length
    let result = await User.findById(req._id)
    console.log(articleNum,classifyNum,"numberxxxxxxxxxxxxxxx");
    res.send(200, {
      message: {info:"身份验证成功",articleNum,classifyNum},
      data: result,
    })
    return
  }
  res.send(400, {
    message: "身份验证失败"
  })
})
app.use("/test",async function (req,res,next) {
  res.send(200,{
    message: "获取成功",
    data: {name: "可爱捏"}
  })
})
// app.use("/test",function (req,res,next) {
//   // console.log(req.body,"body",req.headers["authorization"],req.method);
//   console.log(res.statusCode,"|",res.message,"|",res.statusMessage,"|",res.date,"|",res.msg,res.statusText);
//   res.send(200,{
//     message: "ok233"
//   })
// })
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.log(err,"errrr");
  if (err.message.indexOf("duplicate key error") !== -1) {
    //字段值重复
    err.message = "字段值重复"
    err.status = 422
  }
  if (err.errors) {
    let Str = ""
    for (let key in err.errors) {
      let msg = err.errors[key].message
      let isEmail = /email/.test(msg) ? msg = "邮箱未传" : false
      Str += msg + "| "
    }
    err.message = Str
    err.status = 422
  }
  if (err.code in mulErrorMap) {
    err.message = mulErrorMap[err.code]
    err.status = 400
  }
  res.status(err.status || 500).send({
    code: err.status,
    message: err.message
  });
});
module.exports = app;
