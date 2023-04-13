/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-25 18:26:54
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-01-25 21:04:55
 */
const { merge } = require("webpack-merge")
const common = require("./webpack.common.js")
// const webpack = require("webpack")
const webpack = require("webpack")
module.exports = merge(common, {
  mode: "production", //development|production
  output: {
    filename: '[name].[hash:7].js'
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "dist",  //服务器的启动目录
    host: "127.0.0.1",
    port: 3001,
    open: true,
    // publicPath: "../public/"
  },
  plugins: [
    new webpack.optimize.SplitChunksPlugin()
    // new webpack.optimize.SplitChunksPlugin(),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        }
      }
    }
  },
  externals: {
    // jquery: 'jQuery',
    // axios: "axios",
    // bootstrap: "bootstrap"
  }
})