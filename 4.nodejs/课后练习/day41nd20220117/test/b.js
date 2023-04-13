/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-17 00:02:12
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-01-17 00:21:55
 */
let a= 999
let b=323
class Test {
  constructor (data,callback) {
    this.data = data
    this.callback = callback
    this.use()
  }
  use() {
    this.sum = a + this.data + b
  }
}
export {
  Test
}