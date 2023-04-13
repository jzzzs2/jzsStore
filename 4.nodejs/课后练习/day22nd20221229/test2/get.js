/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-29 19:26:23
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-29 19:29:38
 */
let url = require("url")
let str = `http://127.0.0.1:8080/user?name=keyogre&pwd=!u894r382`
console.log(url.parse(str).query);
str = url.parse(str).query
console.log(format(str));
function format (str) {
  return Object.fromEntries(str.split("&").map(curr => {
    return curr.split("=")
  }))
}