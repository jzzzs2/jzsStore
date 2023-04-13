/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-25 18:26:54
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-01-25 18:56:59
 */
const { merge } = require("webpack-merge")
const common = require("./webpack.common.js")
module.exports = merge(common, {
  mode: "production", //development|production
  output: {
    filename: '[name].[hash:7].js'
  },
  plugins: [
    // new webpack.optimize.SplitChunksPlugin(),
  ]
})