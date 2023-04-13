/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-18 17:46:36
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-18 17:56:50
 */
let path = require("path")
let pathStr = "../app/test/a.js"
console.log(path.basename(pathStr)); //a.js
console.log(path.dirname(pathStr)); // ../app/test
console.log(path.extname(pathStr)); // .js
console.log(path.delimiter); // ;
console.log(path.sep); // \
console.log(path.parse(pathStr)); // {}
console.log(path.parse(pathStr).name); // a
console.log(path.format(path.parse(pathStr))); // "../app/test/a.js"
console.log(path.resolve("./test","a/b"));
console.log(path.resolve("a/b", "c/d"));
console.log(path.resolve("/a/b", "c/d")); // /代表根目录 从右往左拼接
console.log(path.join("a/b", "c/d"));
console.log(path.join("test/aa.js", "food/a"));
console.log(path.normalize("test/a.js/98"));
console.log(path.isAbsolute("test/a.js"));
console.log(path.isAbsolute("../test/a.js"));
console.log(path.isAbsolute("/test/a.js"));