/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-02-12 10:12:08
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-02-12 10:16:04
 */
const refMap = {
  "Article": {
    together(body,id) {
      return {
        ...body,
        author: id
      }
    }
  }
}
module.exports =  refMap