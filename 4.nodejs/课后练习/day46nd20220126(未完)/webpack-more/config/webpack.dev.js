/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-25 19:21:53
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-01-26 15:58:47
 */
const { merge } = require("webpack-merge")
const common = require("./webpack.common.js")
module.exports = merge(common, {
  devtool: "inline-source-map",
  devServer: {
    contentBase: "dist",  //服务器的启动目录 默认是根目录
    host: "127.0.0.1",
    port: 3001,
    open: true,
    publicPath: "/test"
  },
})