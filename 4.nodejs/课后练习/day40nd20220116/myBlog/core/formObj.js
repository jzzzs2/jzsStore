/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-16 21:14:23
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-01-16 21:14:57
 */
function getFormJson (form) {
  return $(form).serializeArray().reduce((acc, { name, value }) => {
    acc[name] = value
    return acc
  }, {})
}
export {
  getFormJson
}