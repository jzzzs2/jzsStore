/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-20 18:43:03
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-01-20 18:52:01
 */
module.exports = {
  devtool: "inline-source-map",//运行时 保留源码 可debug
  entry: "./src/test",
  plugins: [
    // new CleanWebpackPlugin(),
    new htmlWebPack({
      title: "mikusama",
      // template: "./config/test.html",
      
    })
  ],
  // entry: {
  //   "one": "./src/test",
  //   "two": "./src/b"
  // },
  // devServer: {
  //   contentBase: path.join(__dirname,"/dist/"),
  //   inline: true,
  //   host: "localhost",
  //   port: 3001,
  //   open: true
  // },
  output: {
    path: path.join(__dirname, "dist"),
    filename: "test.js"
    // filename: "[name].build.js"
  }
}