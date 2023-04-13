/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-02-04 14:55:50
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-02-09 22:19:03
 */
const pagination = require("mongoose-sex-page")
async function pagiUtil (model,{size = 100,page = 1,display = 10} = {}) {
  let result = await pagination(model).find().select("+password").page(page).size(size).display(display).exec()
  console.log(result,"result");
  let {records,total,pages} = result
  let count = records.length
  return {
    page,
    size,
    count,
    list:records,
    total,
    pages,
    display
  }
}

function selectValid (inObj,validArr) {
  return Object.fromEntries(Object.entries(inObj).filter(([key,value]) => {
    return validArr.includes(key)
  }))
}
const preUrl = "http://127.0.0.1:3000/"
const fileSize = 1024000
module.exports = {
  pagiUtil,preUrl,fileSize,selectValid
}