/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-03-18 18:38:41
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-10 15:20:49
 */
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
const CompressionPlugin = require("compression-webpack-plugin");
module.exports = {

  parallel: false,
  publicPath: "",
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin).end();
      config.plugin("lodash-webpack-plugin").use(require("lodash-webpack-plugin"))

      // new CompressionPlugin({
      //   test: /\.js$|\.css$|\.html$/,
      //   algorithm: 'gzip',
      //   threshold: 10240,
      //   deleteOriginalAssets: false
      // })
    }
    config.optimization.minimize(true)
    config.externals({
      'wangeditor': 'wangEditor',
      'vue': 'Vue',
    })
    config.plugins.delete("prefetch")
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("views", resolve("src/views"))
    // .set("base", resolve("baseConfig"))
    // .set("public", resolve("public"));
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new CompressionPlugin({
            test: /\.js$|\.css$|\.html$/,
            algorithm: 'gzip',
            threshold: 10240,
            deleteOriginalAssets: false,
          })
        ]
      }
    }
  }
}