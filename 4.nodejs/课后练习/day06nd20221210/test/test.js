/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-10 15:52:01
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-10 16:03:08
 */
let you = "jzs";
let result = require("./test2");
console.log(module,"模块对象");
console.log(module.filename,"模块绝对路径");
console.log(module.path,"模块路径");
console.log(__filename,"模块绝对路径");
console.log(result,"test2模块");
console.log(require.main,"入口文件");
console.log(require.main.id,"入口文件的id");
console.log(require.main.children[0].filename);
console.log(require.main.children[0].path);
console.log(require.main === module,"是否是当前在运行的模块");