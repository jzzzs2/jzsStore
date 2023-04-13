const { merge } = require("webpack-merge")
const common = require("./webpack.common.js")
module.exports = merge(common, {
  devtool: "inline-source-map",
  devServer: {
    contentBase: "dist",  //服务器的启动目录
    host: "127.0.0.1",
    port: 8089,
    open: true,
    // publicPath: "../public/"
  },
})