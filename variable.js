/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-06-19 19:58:42
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-06-21 17:53:19
 */
// var a = 99;
// var a = function () {
//   console.log(888)
// }
// function a() {
//   console.log(888)
// }
// a()
// function a () {
//   console.log("a1")
// }
// function a () {
//   console.log("a2")
// }
// a()
// 函数声明 提前优先级比 变量声明高, 并且函数的提前可以理解为变量和赋值一起提前. 当出现相同名变量或者相同名函数,后面覆盖前面
// var a = 11
// function a () {
//   console.log("555")
// }
// console.log(a,"aa")
// console.log([])
// const p1 = () =>
//   new Promise((resolve, reject) => {
//     console.log(1)
//     let p2 = new Promise((resolve, reject) => {
//       console.log(2)
//        setTimeout(() => {
//         console.log(3)
//         resolve(4)
//       }, 0)
//       resolve(5) //注意坑
//     })
//     resolve(6)
//     p2.then((arg) => {
//       console.log(arg)
//     })
//   })

// setTimeout(() => {
//   console.log(8)
//   const p3 = new Promise((reject) => { //注意坑
//     reject(9)
//   }).then((res) => {
//     console.log(res,"res")
//   })
// }, 0)

// p1().then((arg) => {
//   console.log(arg)
// })

// console.log(10)
// const p3 = new Promise((reject) => { //注意坑
//   reject(9)
// }).then((res) => {
//   console.log(res, "res")
// })
// let a = [1,4,7]
// a.forEach(item => {
//   return item + 2
// })
// console.log(a,"a")