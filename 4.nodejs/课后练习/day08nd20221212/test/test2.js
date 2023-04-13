/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-12 21:14:47
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-12 21:32:30
 */
let path = require("path")
// console.log(path.basename('C:\\temp\\myfile.html'))
// console.log(path.basename("./app/demo/test.js"))
// console.log(path.basename("d:\\test\\test.html"));
// console.log(path.dirname("d:\\test\\demo\\one.html"));
console.log(path.join("a/b","c","d"));
console.log(path.normalize('C:\\temp\\\\foo\\bar\\..\\'));
console.log(path.resolve("a","b"));
console.log(path.resolve("/d","/a","c"));
