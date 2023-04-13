/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-09 16:06:20
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-09 16:07:35
 */
Promise.resolve().then(() => {
  console.log("s1");
  return Promise.resolve().then(() => {
    console.log("s2");
  })
})
Promise.resolve().then(() => {
  console.log("p1");
  return Promise.resolve().then(() => {
    console.log("p2");
  })
})