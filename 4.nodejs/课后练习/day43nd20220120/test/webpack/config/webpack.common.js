/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-20 18:43:17
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-01-20 21:58:36
 */
const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")
module.exports = {
  entry: "./src/test",
  plugins:[
    // new HtmlWebpackPlugin({title: "haoye"})
    new HtmlWebpackPlugin({
      template: "./cry.html"
    })
  ],
  output: {
    filename: "woc.js",
    path: path.join(process.cwd(), "/dist")
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader"
        ]
      },
      {
        test: /\.styl$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader"
          },
          {
            loader: "stylus-loader"
          }
        ]
      },
      {
        test: /\.hbs$/i,
        use: [
          "handlebars-loader"
        ]
      },
      {
        test: /\.png|jpg|gif$/i,
        use: [
          "file-loader"
        ]
      },
      {
        //字体资源 编译loader
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        use: [
          "file-loader",
        ]
      }
    ]
  }
}