/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-15 18:25:58
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-15 20:44:17
 */
let url = require("url")
let urlObj = url.parse("http://127.0.0.1:3002/user?user=asdf123&pwd=21312312")
console.log(urlObj);
console.log(urlObj.protocol) //http:
console.log(urlObj.host); //127.0.0.1:3002
console.log(urlObj.hostname); //127.0.0.1
console.log(urlObj.port); //3002
console.log(urlObj.pathname); // /user
console.log(urlObj.path); // /user?user....
console.log(urlObj.search); // ?user..
console.log(urlObj.query); // user=sss....