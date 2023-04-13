const path = require('path')
//插件工具 dist文件夹清洁插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')


module.exports = {
  //指定入口
  // entry: {
  //   main: './src/index.js',
  //   util: './src/app/util.js'
  // },
  //开发环境下 保留源码map 方便debug
  devtool: 'inline-source-map',
  //开发环境的临时服务器设置
  devServer: {
    contentBase: path.join(__dirname, '/dist/'),
    inline: true,
    host: 'localhost',
    port: 8080,
    open: true
  },
  //插件工具
  plugins: [
    new HtmlWebpackPlugin({
      title: "html plugn page",
      template: './index.html'
    }),
    // new CleanWebpackPlugin()
  ],
  //指定出口 输出
  // output: {
  //   //输出文件名称
  //   filename: '[name].build.js',
  //   //输出文件路径
  //   path: path.resolve(__dirname, 'dist')
  // },
  module: {
    rules: [
      // {
      //   test: /\.css$/,
      //   use: [
      //     'style-loader',
      //     'css-loader'
      //   ]
      // },
      {
        test: /\.styl$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
          },
          {
            loader: "stylus-loader",
          },
        ]
      },
      {
        //hbs 编译loader
        test: /\.hbs$/i,
        use: [
          "handlebars-loader",
        ]
      },
      {
        //图片资源 编译loader
        test: /\.(png|svg|jpg|gif)$/i,
        use: [
          "file-loader",
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