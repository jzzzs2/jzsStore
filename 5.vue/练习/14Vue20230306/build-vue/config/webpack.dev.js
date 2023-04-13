/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-26 14:39:07
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-03-04 17:47:12
 */
const { merge } = require("webpack-merge")
const common = require("./webpack.common.js")
module.exports = merge(common, {
  devtool: "inline-source-map",
  devServer: {
    // contentBase: "public",  //服务器的启动目录 这里指的是根目录下的public文件夹为资源初始位置
    host: "127.0.0.1",
    port: 8089,
    open: true,
    // publicPath: "../public/"
  },
})