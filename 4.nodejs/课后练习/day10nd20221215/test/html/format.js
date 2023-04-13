/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-15 19:53:54
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-15 20:04:22
 */
// let str = "?name=jzs&age=22"
function formatUrl (str) {
  let reg = /[^&=?]+=[^&=?]+/g
  // console.log(str.match(reg));
  let arr = str.match(reg)
  arr = arr.map(function (item) {
    return item.match(/[^=]+/g)
  })
  // console.log(Object.fromEntries(arr));
  return Object.fromEntries(arr)
}
exports.formatUrl = formatUrl