/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-02 19:53:23
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-01-02 21:00:44
 */
/*
什么是 Async/Await

 帮助我们更好的理解异步函数
 本质上其实是promise 的进阶语法糖

 async
  声明一个异步函数

  async关键字声明的函数 会自动将函数转化为Promise
  只有async函数内部的异步操作执行完 才会执行then方法指定的回调函数
  async异步函数内可以使用await

 await
  暂停异步功能的执行

  放置在primise对象前的 关键字await强制其他代码进行等待 直到promise 返回结果
  只能和promise一起使用 不适合常规的回调写法
  只能在async 函数内部使用
*/
//
const fs = require("fs").promises
let result = []
// console.log(result);
async function storage(...paths) {
  let arr = []
  arr = paths.map(function (item, idx) {
    return fs.readFile(item, "utf8", function (err, data) { console.log(idx,"idx");})
    // fs.readFile(item,"utf8",function (err,data) {
    //   arr.push(data)
    //   if (idx === paths.length - 1) {
    //     console.log(arr);
    //   }
    // })
  })
  try {
    // let result = await Promise.all(arr)
    // let result = await Promise.all(arr)
    let result = await Promise.race(arr)
    // let result = await Promise.race(arr)
    // console.log(await result);
    console.log(result);
    return false
  } catch (error) { 
    console.log("fail",error.message,"xxxx",error);
  }
  // let result = await Promise.all(arr)
  // console.log(result);
  // result = await result
  // console.log(result);
}
// storage("./data/a.txt", "./data/b.txt", "./data/cfdsfdsf.txt")
// storage("./data/afs.txt", "./data/b.txt", "./data/c.txt")
storage("./data/b.txt", "./data/c.txt","./data/a.txt")
// let arr = [2, 7, 39, 11]
// console.log(arr.some(ele => {
//   return ele > 38
// }));
// console.log(arr.some(ele => {
//   return ele > 80
// }));
// console.log(arr.every(ele => {
//   return ele > 1
// }));
// console.log(arr.every(ele => {
//   return ele > 2
// }));