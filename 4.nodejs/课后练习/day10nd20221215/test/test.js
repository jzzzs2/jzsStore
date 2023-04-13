/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-15 15:55:49
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-15 15:59:25
 */
let str = "name=jzs&age=22"
function parse(str) {
  let arr = str.split("&")
  let reg = /(.+)=(.+)/
  return arr.reduce((acc,item) => {
    item.replace(reg,function(all,$1,$2) {
      console.log(all);
      acc[$1] = $2
    })
    return acc
  },{})
}
console.log(parse(str));