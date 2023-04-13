/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-10 16:11:59
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-10 16:21:03
 */
console.log("我是测试 获取只有路径文件夹下的index.js");
console.log(require.cache);
console.log(require.resolve(module.path));
exports.result = "成功1";