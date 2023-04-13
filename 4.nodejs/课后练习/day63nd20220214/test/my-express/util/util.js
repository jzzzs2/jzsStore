/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-02-04 14:55:50
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-02-14 18:37:18
 */
const pagination = require("mongoose-sex-page")
async function pagiUtil (model,{size = 100,page = 1,display = 10,query={}} = {},link={}) {
  let result = await pagination(model).find(query).populate(link).select("+password").page(page).size(size).display(display).exec()
  // let result = await pagination(model).find(query).populate(link.key,link.value).select("+password").page(page).size(size).display(display).exec()
  // console.log(result,"result sssaaaaa");
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
function formatDate (date = new Date(), format = "yyyy-mm-dd") {

  let regMap = {
    'y': date.getFullYear(),
    'm': toDouble(date.getMonth() + 1),
    'd': toDouble(date.getDate())
  }

  //逻辑(正则替换 对应位置替换对应值) 数据(日期验证字符 对应值) 分离
  return Object.entries(regMap).reduce((acc, [reg, value]) => {
    return acc.replace(new RegExp(`${reg}+`, 'gi'), value);
  }, format);
}
const preUrl = "http://127.0.0.1:3000/"
const fileSize = 1024000
module.exports = {
  pagiUtil,preUrl,fileSize,selectValid,formatDate
}