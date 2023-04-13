/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-06 17:08:18
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-01-06 20:35:42
 */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var session = require("express-session")
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors")
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
app.use(cors({
  "origin": true, //true 设置为 req.origin.url
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE", //容许跨域的请求方式
  "allowedHeaders": "x-requested-with,Authorization,token, content-type", //跨域请求头
  "preflightContinue": false, // 是否通过next() 传递options请求 给后续中间件 
  "maxAge": 1728000, //options预验结果缓存时间 20天
  "credentials": true, //携带cookie跨域
  "optionsSuccessStatus": 200 //options 请求返回状态码
}))
app.use(session({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: true,
  name: "sessid", //cookie上的id
  cookie: {
    maxAge: 172000
  },
  // rolling: true
}))
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

app.use("/login", function (req, res, next) {
  let { username, pwd } = req.body
  console.log(username, pwd, 'info');
  //验证成功后 设置信息 对信息进行加密后,返回到客户端cookie
  req.session.sessid2 = username
  res.send(200, {
    status: 200,
    errMsg: "welcome"
  })
})
app.use("/test", function (req, res, next) {
  // let { username, pwd } = req.body
  // console.log(username, pwd, 'info');
  //验证成功后 设置信息 对信息进行加密后,返回到客户端cookie
  req.session.sessid2 = "fds3242ga"
  res.send(200, {
    status: 200,
    errMsg: "welcome222"
  })
})
app.use("/getAvatar", function (req, res, next) {
  // console.log(req.sessionID,"id");
  // console.log(req.session.cookie,"id2");
  console.log(req.session.sessid2,"id3");
  if (!req.session.sessid2) {
    res.send(200, {
      msg: "权限不够",
      status: 403
    })
    return false
  }
  res.send(200,{
    msg: "欢迎登录",
    status: 200
  })
})

app.use("/logout", function (req, res, next) {
  req.session.destroy(function (err) {
    console.log("session 已 清除");
    // req.cookies.sessid = ""
    // console.log(req.cookies,"cookies");
  })
})
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
