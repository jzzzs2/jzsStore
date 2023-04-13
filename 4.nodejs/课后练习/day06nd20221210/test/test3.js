/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-10 16:04:37
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-10 17:26:06
 */
console.log(require.main === module);
let result = require("./storage");
// let twoResult = require("fs");
// console.log(twoResult);
console.log(result);
// console.log(module,"我是当前module");
// console.log(module.children[0].paths);
// console.log(__dirname,"|dir|");
exports.eat = "food"