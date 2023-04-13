/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-20 19:56:36
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-01-20 20:05:10
 */

const path = require('path')
module.exports = {
  mode: 'development',

  // 入口起点 https://www.webpackjs.com/concepts/entry-points/
  // 打包入口文件的路径
  entry: path.join(__dirname, './src/main.js'),

  // 输出 https://www.webpackjs.com/concepts/output/
  output: {
    // 输出文件的存放路径
    path: path.join(__dirname, './dist'),
    // 输出文件的名称
    filename: 'bundle.js',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    host: 'localhost',
    port: 8080,
    open: true
  }
}