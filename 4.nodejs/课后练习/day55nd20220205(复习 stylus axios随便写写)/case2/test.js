/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-02-05 16:04:18
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-02-05 16:45:35
 */
const axios = require("axios")
const fs = require("fs")
const path = require("path")
// console.log(path.join(__dirname, "/img/test.jpg"));
// let imgData = fs.readFileSync(path.join(__dirname, "/img/test.jpg"))
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // console.log(config);
  // config.data = {
  //   username: "zjc",
  //   password: 999
  // }
  // config.method = "get"
  // config.headers.Authorization = "keainie"
  return config;
}, function (error) {
  // 对请求错误做些什么
  // console.log(error);
  return Promise.reject(error);
});
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // console.log(response,response.res.statusCode,response.res.statusMessage);
  // console.log("111");
  response.status = 211
  response.statusText = "keainie"
  response.data = {
    "ziyou": 222
  }
  console.log("1111",response.status,response.statusText);
  return response;
}, function (error) {
  // 对响应错误做点什么
  // console.log(error);
  return Promise.reject(error);
});
axios.post("http://127.0.0.1:3000/test", {
  username: "jzs",
  password: 123
}, {
  headers: {
    'Authorization': "FASFASfdsfsfsd",
    "content-type": "application/json"
  }
}).then(data=> {
  console.log("|",data,"|");
}).catch(err=> {
  // console.log(err);
})

