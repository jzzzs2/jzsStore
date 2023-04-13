/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-02-10 22:52:16
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-02-10 22:56:46
 */
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
function toDouble (num) {
  return String(num)[1] && String(num) || '0' + num;
}
export {
  formatDate
}