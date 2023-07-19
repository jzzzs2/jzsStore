/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-06-17 11:35:42
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-06-17 12:41:25
 */
const path = require("path")
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const { VueLoaderPlugin } = require('vue-loader')
const ESLintWebpackPlugin = require("eslint-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const isProduction = process.env.NODE_ENV === "production";
module.exports = {
  entry: "./src/main.js",
  output: {
    path: isProduction?path.resolve(__dirname, "../dist"):undefined,
    filename: isProduction
    ? "static/js/[name].[contenthash:10].js"
    : "static/js/[name].js",
    chunkFilename: isProduction
    ? "static/js/[name].[contenthash:10].chunk.js"
    : "static/js/[name].chunk.js",
    assetModuleFilename: "static/js/[hash:10][ext][query]",
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          // 开启缓存
          cacheDirectory: path.resolve(
            __dirname,
            "node_modules/.cache/vue-loader"
          ),
        },
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "../src"),
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
          cacheCompression: false,
          plugins: [
            // "@babel/plugin-transform-runtime" // presets中包含了
          ],
        },
      },
      {
        test: /\.css$/,
        use: [
          isProduction?MiniCssExtractPlugin.loader:"vue-style-loader",
          'css-loader',
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  "postcss-preset-env", // 能解决大多数样式兼容性问题
                ],
              },
            },
          },
        ]
      },
      {
        test: /\.less$/,
        use: [
          // compiles Less to CSS
          isProduction?MiniCssExtractPlugin.loader:"vue-style-loader",
          'css-loader',
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  "postcss-preset-env", // 能解决大多数样式兼容性问题
                ],
              },
            },
          },
          'less-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          // 将 JS 字符串生成为 style 节点
          isProduction?MiniCssExtractPlugin.loader:"vue-style-loader",
          // 将 CSS 转化成 CommonJS 模块
          'css-loader',
          // 将 Sass 编译成 CSS
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  "postcss-preset-env", // 能解决大多数样式兼容性问题
                ],
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              // 自定义主题：自动引入我们定义的scss文件
              additionalData: `@use "@/styles/element/index.scss" as *;`,
            }
          },
        ],
      },
      {
        test: /\.styl$/,
        use: [
          // 将 JS 字符串生成为 style 节点
          isProduction?MiniCssExtractPlugin.loader:"vue-style-loader",
          // 将 CSS 转化成 CommonJS 模块
          'css-loader',
          // 将 Sass 编译成 CSS
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  "postcss-preset-env", // 能解决大多数样式兼容性问题
                ],
              },
            },
          },
          'stylus-loader',
        ],
      },
      {
        // 默认情况下 打包图片不用下载loader,但要对图片进行一些配置需要设置
        test: /\.(png|jp?eg|gif|svg)$/,
        // type: "asset/resource", 以原图片格式输出
        type: "asset",   //以对符合条件的图片以base64输出
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 5kb
          }
        }
      },
      {
        test: /\.(ttf|woff|woff2|mp3|mp4)$/,
        type: "asset/resource",
      },
    ]
  },
  plugins: [
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      // 自定义主题覆盖
      resolvers: [ElementPlusResolver({
              importStyle: "sass",
            })],
    }),
    
    new VueLoaderPlugin(),
    new ESLintWebpackPlugin(
      {
        context: path.resolve(__dirname, "../src"),
        exclude: "node_modules",
        cache: true,
        cacheLocation: path.resolve(
          __dirname,
          "../node_modules/.cache/.eslintcache"
        ),
      }
    ),
    new TerserPlugin({
    }),
    isProduction && new CssMinimizerPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html")
    }),
    new MiniCssExtractPlugin({
      // 定义输出文件名和目录
      filename: "static/css/main.css",
      chunkFilename: "static/css/[name].[contenthash:10].chunk.css"
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../public"),
          to: path.resolve(__dirname, "../dist"),
          toType: "dir",
          noErrorOnMissing: true,
          globOptions: {
            ignore: ["**/index.html"],
          },
          info: {
            minimized: true,
          },
        },
      ],
    }),
    new DefinePlugin({
      __VUE_OPTIONS_API__: "true",
      __VUE_PROD_DEVTOOLS__: "false",
    }),
  ],
  devServer: {
    open: true,
    host: "localhost",
    port: 3000,
    hot: true,
    compress: true,
    historyApiFallback: true, // 解决vue-router刷新404问题
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime~${entrypoint.name}`
    }
  },
  resolve: {
    extensions: [".vue", ".js", ".json"],
    alias: {
      "@": path.resolve(__dirname, "../src")
    }
  },
  mode: isProduction ? "production" : "development",
  devtool: isProduction?"source-map":"cheap-module-source-map",
  performance: false
}