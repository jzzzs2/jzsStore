/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-20 16:07:36
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-01-20 22:46:42
 */
const path = require("path")
let {CleanWebpackPlugin} = require("clean-webpack-plugin")
const  HtmlWebPack = require("html-webpack-plugin")

module.exports = {
  // devtool: "inline-source-map",//运行时 保留源码 可debug
  entry: "./src/test.js",
  // plugins: [
  //   new CleanWebpackPlugin(),
  //   new htmlWebPack({
  //     title: "mikusama",
  //     // template: "./config/test.html",bui
      
  //   })
  // ],
  // entry: {
  //   "one": "./src/test",
  //   "two": "./src/b"
  // },
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, '/dist/'),
    // contentBase: '/dist',
    // inline: true,
    host: 'localhost',
    port: 8080,
    open: true,
    // static:'./dist'
    // static: {
    //   directory: path.join(__dirname, '/dist'),
    // },
    // compress: true,
    // port: 3001,
  },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "test.js"
    // filename: "[name].build.js"
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
  },
  plugins: [new HtmlWebPack({
    template: path.join(__dirname, '/cry.html')
  })]
}