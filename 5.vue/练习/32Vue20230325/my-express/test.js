/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-02-07 18:26:05
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-02-17 12:56:53
 */
// import axios from "axios"
// axios.get("http://127.0.0.1:3000/",{data: {name:"jzs"}}).then(data=>{
//   console.log(data);
// }).catch(err){
//   console.log(err);
// }
// let {decrypt} = require("./createKey")
// console.log(decrypt("D2TJ+cojACDGm+zGuxYL6OB4FUSUvfC3JaPuVQCUDR67PIoJwcmFvGUgyTM4u7RdOSJZrW8190JC39G3K7WcjQ=="));
// for (var i = 0; i <= 10; i++) {

// }
// for (let i = 0; i <= 10; i++) {

// }
// setTimeout(() => {
//   console.log(i);
// }, 1000);

// let arr = [1, 4, 1]
// arr.forEach((item,idx) => {
//   var i = 10
//   console.log(item,idx);
// })
// console.log(i);
function formatDate(date = new Date(), format = "yyyy-MM-dd hh:mm:ss") {

  let regMap = {
    'y': date.getFullYear(),
    'M': toDouble(date.getMonth() + 1),
    'd': toDouble(date.getDate()),
    "h": toDouble(date.getHours()),
    "m": toDouble(date.getMinutes()),
    "s": toDouble(date.getSeconds())
  }

  //逻辑(正则替换 对应位置替换对应值) 数据(日期验证字符 对应值) 分离
  return Object.entries(regMap).reduce((acc, [reg, value]) => {
    return acc.replace(new RegExp(`${reg}+`, 'g'), value);
  }, format);
}
function toDouble(num) {
  return String(num)[1] && String(num) || '0' + num;
}
console.log(formatDate(new Date("2023-02-17T04:13:24.532+00:00")));