/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-06-14 18:43:16
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-06-15 18:32:07
 */
let path = require("path")
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "static/js/main.js",
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
        // 从右往左解析 从下往上解析  style-loader将打包后的js文件中的css转化为style标签放在html中 css-loader将css文件进行模块化进行打包
      },
      {
        test: /\.less$/,
        use: [
          // compiles Less to CSS
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          // 将 JS 字符串生成为 style 节点
          'style-loader',
          // 将 CSS 转化成 CommonJS 模块
          'css-loader',
          // 将 Sass 编译成 CSS
          'sass-loader',
        ],
      },
      {
        test: /\.styl$/,
        use: [
          // 将 JS 字符串生成为 style 节点
          'style-loader',
          // 将 CSS 转化成 CommonJS 模块
          'css-loader',
          // 将 Sass 编译成 CSS
          'stylus-loader',
        ],
      },
      {
        // 默认情况下 打包图片不用下载loader,但要对图片进行一些配置需要设置
        test: /\.(png|jp?eg|gif|svg)$/,
        // type: "asset/resource", 以原图片格式输出
        type: "asset",   //以对符合条件的图片以base64输出
        generator: {
          filename: 'static/img/[hash:8][ext][query]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 5kb
          }
        }
      },
      {
        test: /\.(ttf|woff|woff2|mp3|mp4)$/,
        type: "asset/resource",
        generator: {
          filename: "static/media/[hash][ext][query]"
        }
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          // 也可以在配置文件进行配置
          // options: {
          //   presets: ['@babel/preset-env']
          // }
        }
      }
    ]
  },
  plugins: [
    new ESLintPlugin({
      context: path.resolve(__dirname,"../src")
    }),
    new HtmlWebpackPlugin({
      // 打包的位置和名字
      filename: path.resolve(__dirname,"../dist/index.html"),
      // 打包js要引入的模板html的路径
      template: path.resolve(__dirname, "../public/index.html")
    })
  ],
  devServer: {
    host: "localhost", // 启动服务器域名
    port: "3660", // 启动服务器端口号
    open: true, // 是否自动打开浏览器
    hot: true
  },
  devtool: "cheap-module-source-map",
  mode: "development"
}