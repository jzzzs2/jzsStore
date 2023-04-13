const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const mongoose = require('./plugins/db')
const assert = require('http-assert')
const User = require('./models/User')

// const indexRouter = require('./routes/index');
// const registerRouter = require('./routes/register');

// const getPublicKey = require('./routes/getPubKey');
const app = express();

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
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//中间件  nameMiddleware
const resourceMiddleware = require('./middleware/resource')

//路由  nameRoute
const busRoute = require('./routes/bus');
const loginRoute = require('./routes/login');
const registerRoute = require('./routes/register');


//资源路由
app.use('/api/rest/:resource', resourceMiddleware(), busRoute)

//登录注册
app.use('/admin/login', loginRoute)

app.use('/admin/register', registerRoute)




// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(res.status, 'status')
  // render the error page
  res.status(err.status || 500).send({
    code: err.status,
    message: err.message
  });
  // res.render('error');
});


module.exports = app;
