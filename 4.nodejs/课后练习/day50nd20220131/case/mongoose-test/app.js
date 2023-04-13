var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { mongoose } = require('./plugins/db')

const cors = require('cors')

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


const resourceMiddleware = require('./middleware/resource')

const { busRoute } = require('./routes/bus')




// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/rest/:resource', resourceMiddleware(), busRoute)

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/api/user/:field', (req, res, next) => {
//   let queryField = req.params['field']
//   let query = req.query
//   console.log(queryField, query)


//   let userLin = User.where(queryField)
//   for (let key in query) {
//     userLin = userLin[key](query[key])
//   }
//   userLin.exec(callback)

//   // User.where(queryField)['gte'](query['gte'])['lte'](query['lte']).exec(callback)
// })

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});




// route.get('/', )


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
