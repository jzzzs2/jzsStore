/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-11-11 20:09:34
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-11-11 20:18:02
 */
importScripts("./add.js")
addEventListener("message", function (e) {
  console.log(fb(e.data) + "我是子线程 接收到了数据");
  this.postMessage(fb(e.data));
})