/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-05 18:01:13
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-01-05 18:26:24
 */
let key = "RSA_Key"
let storage = {
  set(code) {
    localStorage.setItem(key,code)
  },
  get() {
    return localStorage.getItem(key)
  },
  remove() {
    return localStorage.removeItem(key)
  }
}
function isExistStorage () {
  let result = storage.get()
  if (result === "undefined" || !result) {
    // let code = 
    storage.set(code)
    return code
  }
  return result
}
// module.exports = {
//   isExistStorage
// }