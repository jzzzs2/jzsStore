/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-02 17:54:35
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-01-02 20:41:28
 */
// function fn1 () {
//   return new Promise((resolve,reject) => {
//     resolve("222")
//     // reject("wuwu")
//   })
// }
async function test() {
  setTimeout(() => {
    console.log("final success");
  }, 4000);
  new Promise(function (resolve,reject) {
    setTimeout(() => {
      console.log("okkkk");
      resolve("okkk")
    }, 3000);
  })
  return "ok"
}
test().then(function(data) {
  console.log(data);
}).catch(function(err) {
  console.log(err);
})
// async function fn2 () {
//   let result = await fn1()
//   console.log(await "222","test");
//   console.log(result,"result");
//   console.log("fn1 have been operate");
// }

// fn2()
// function fn () {
//   return Promise.reject("fail")
// }
// async function asyncFn () {
//   try {
//     await fn()
//     console.log("exists error");
//   } catch (error) {
//     console.log(error,"error");
//   }
// }
// asyncFn()
// function takeLongTime(n) {
//   return new Promise(resolve => {
//     setTimeout(() => resolve(n), 2000);
//   });
// }
// function step1(n) {
//   console.log(`step1 with ${n}`);
//   return takeLongTime(n);
// }
// function step2(m, n) {
//   console.log(`step2 with ${m} and ${n}`);
//   return takeLongTime(m + n);
// }
// function step3(k, m, n) {
//   console.log(`step3 with ${k}, ${m} and ${n}`);
//   return takeLongTime(k + m + n);
// }

// async function doIt() {
//   // let result = await step1(100)
//   // result += await step2(100,200)
//   // result += await step3(100,50,30)
//   // console.time("doIt");
//   // console.log(`result is ${result}`);
//   // console.timeEnd("doIt");
//   step1(100).then(function (data) {
//     return step2(10, data)
//   }).then(function (data) {
//     return step3(data, 20, 60)
//   }).then(function (data) {
//     console.log(data,"result");
//   }).catch(function (err) {
//     console.log(err,"err");
//   })
// }

// doIt();