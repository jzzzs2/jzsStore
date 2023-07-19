/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-06-14 18:43:16
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-06-16 16:05:36
 */
let path = require("path")
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
// nodejs核心模块，直接使用
const os = require("os");
// cpu核数
const threads = os.cpus().length;
const TerserPlugin = require("terser-webpack-plugin");
module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "static/js/main.js",
    assetModuleFilename: "static/media/[name].[hash][ext]",
    clean: true
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, "css-loader", {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    [
                      'postcss-preset-env',
                      {
                        // 其他选项
                      },
                    ],
                  ],
                },
              },
            }]
            // 从右往左解析 从下往上解析  style-loader将打包后的js文件中的css转化为style标签放在html中 css-loader将css文件进行模块化进行打包
          },
          {
            test: /\.less$/,
            use: [
              // compiles Less to CSS
              MiniCssExtractPlugin.loader,
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    plugins: [
                      [
                        'postcss-preset-env',
                        {
                          // 其他选项
                        },
                      ],
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
              MiniCssExtractPlugin.loader,
              // 将 CSS 转化成 CommonJS 模块
              'css-loader',
              // 将 Sass 编译成 CSS
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    plugins: [
                      [
                        'postcss-preset-env',
                        {
                          // 其他选项
                        },
                      ],
                    ],
                  },
                },
              },
              'sass-loader',
            ],
          },
          {
            test: /\.styl$/,
            use: [
              // 将 JS 字符串生成为 style 节点
              MiniCssExtractPlugin.loader,
              // 将 CSS 转化成 CommonJS 模块
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    plugins: [
                      [
                        'postcss-preset-env',
                        {
                          // 其他选项
                        },
                      ],
                    ],
                  },
                },
              },
              // 将 Sass 编译成 CSS
              'stylus-loader',
            ],
          },
          {
            // 默认情况下 打包图片不用下载loader,但要对图片进行一些配置需要设置
            test: /\.(png|jp?eg|gif|svg)$/,
            // type: "asset/resource", 以原图片格式输出
            type: "asset",   //以对符合条件的图片以base64输出
            // generator: {
            //   filename: 'static/img/[hash:8][ext][query]'
            // },
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024 // 5kb
              }
            }
          },
          {
            test: /\.(ttf|woff|woff2|mp3|mp4)$/,
            type: "asset/resource",
            // generator: {
            //   filename: "static/media/[hash][ext][query]"
            // }
          },
          {
            test: /\.m?js$/,
            // exclude: /(node_modules)/,
            include: path.resolve(__dirname, "../src"),
            // use: {
            //   loader: 'babel-loader',
            //   // 也可以在配置文件进行配置
            //   // options: {
            //   //   presets: ['@babel/preset-env']
            //   // }
            // },
            use: [
              {
                loader: "thread-loader", // 开启多进程
                options: {
                  workers: threads, // 数量
                }
              },
              {
                loader: "babel-loader",
                options: {
                  cacheDirectory: true, // 开启babel编译缓存
                  cacheCompression: false, // 缓存文件不要压缩
                  plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积
                }
              }
            ],

          }
        ]
      }

    ]
  },
  plugins: [
    new ESLintPlugin({
      context: path.resolve(__dirname, "../src"),
      exclude: "node_modules",
      threads
    }),
    new HtmlWebpackPlugin({
      // 打包的位置和名字
      filename: "index.html",
      // 打包js要引入的模板html的路径
      template: path.resolve(__dirname, "../public/index.html")
    }),
    new MiniCssExtractPlugin(
      {
        // filename配置 默认目录是dist 使用相对路径
        filename: "static/css/[name].css",
        chunkFilename: "static/css/[name].chunk.css"
      }
    ),
    // new ImageMinimizerPlugin({
    //   minimizer: {
    //     implementation: ImageMinimizerPlugin.imageminGenerate,
    //     options: {
    //       plugins: [
    //         ["gifsicle", { interlaced: true }],
    //         ["jpegtran", { progressive: true }],
    //         ["optipng", { optimizationLevel: 5 }],
    //         [
    //           "svgo",
    //           {
    //             plugins: [
    //               "preset-default",
    //               "prefixIds",
    //               {
    //                 name: "sortAttrs",
    //                 params: {
    //                   xmlnsOrder: "alphabetical",
    //                 },
    //               },
    //             ],
    //           },
    //         ],
    //       ],
    //     },
    //   },
    // })
  ],
  optimization: {
    minimizer: [
      // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
      // `...`,
      new CssMinimizerPlugin(),
      // 当生产模式会默认开启TerserPlugin，但是我们需要进行其他配置，就要重新写了
      new TerserPlugin({
        parallel: threads // 开启多进程
      })
    ],
  },
  devtool: "source-map",
  mode: "production"
}