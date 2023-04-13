/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-31 18:08:01
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-02-06 15:58:43
 */
const inflection = require("inflection")
module.exports = (options) => {
  return async function (req,res,next) {
    let params = req.params["resource"]
    let name = inflection.classify(params)
    console.log(name,"name");
    req.model = require(`../model/${name}.js`)
    next()
  }
}