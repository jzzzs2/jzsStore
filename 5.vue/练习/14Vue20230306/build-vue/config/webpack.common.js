/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-25 13:44:44
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-03-06 14:47:13
 */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
//webpack 查看打包模块依赖关系以及size 插件
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer")
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
  mode: "development",
  //指定入口
  entry: {
    main: './src/main.js'
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      title: "html plugn page",
      template: './src/index.html'
    }),
    new VueLoaderPlugin()
    // new CleanWebpackPlugin()
  ],
  output: {
    //输出文件名称
    filename: '[name].build.js',
    //输出文件路径
    path: path.resolve(__dirname, '../dist'),
    // publicPath: "/test"
  },
  resolve: {
    alias: {
      Test: path.join(__dirname, "../src/"),
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['.js', '.vue', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.vue$/, // 处理 .vue 文件
        loader: 'vue-loader'
      },
      {
        test: /\.styl(us)?$/i,
        use: [
          'vue-style-loader',
          "style-loader",
          {
            loader: "css-loader",

          },
          {
            loader: "stylus-loader",
          },
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};