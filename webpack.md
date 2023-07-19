## webpack5 从零开始 基础部分

```
1.webpack是打包工具,本体只能打包js文件,并解析模块化.
```

## 搭建环境

```
npm i webpack webpack-cli -D   //下载所需资源
```

```
npx webpack ./src/main.js --mode=development //打包命令 打包哪个文件,默认打包后生成dist文件夹放在根目录下
```

## 创建配置文件

```
webpack.config.js
module.exports = {
entry: 相对路径   //打包的入口文件,
output: {
	path: path.resolve(__dirname,"dist")  //打包后的输出目录
	filename: "main.js"  //打包后的js名称,
	clean: true //在每次打包操作前,对之前打包文件进行清除
},
module: {
	rules: [
	
	]
},
plugins: []
mode: "development"
}
```

```
有了配置文件之后,可以直接执行npx webpack,会使用配置文件的配置进行打包
```

## loader

```
1.加载器 webpack本身只能对js进行解析打包,添加loader对不同资源进行解析打包
```

```
对css,less,sass,styl进行加载器配置,预编译以sass为例
module: {
	rules: [
		{
			test: test: /\.css$/,
        	use: ["style-loader", "css-loader"]
        	//css-loader作用是把css打包为模块,style-loader作用是把js包中的css内容解析为style标签放在html中
		}
	]
},
```

+ use配置项,从右往左解析,从下往上解析

```
sass配置
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
```

```
对图片进行配置:
默认情况下,webpack可以打包图片,但是如果需要一些自定义操作,仍需要配置.
{
        // 默认情况下 打包图片不用下载loader,但要对图片进行一些配置需要设置
        test: /\.(png|jp?eg|gif|svg)$/,
        // type: "asset/resource", 不进行转化,以原图片格式输出
        type: "asset",   //对符合条件的图片以base64输出,减少请求
        generator: {
        	//设置输出路径 
          filename: 'static/img/[hash:8][ext][query]'
        },
        parser: {
        	//设置使用base64解析图片的条件
          dataUrlCondition: {
            maxSize: 5 * 1024 // 5kb
          }
        }
}
```

```
设置字体图标文件: 字体图标处理和img一致
{
        test: /\.(ttf|woff|woff2|mp3|mp4)$/,
        type: "asset/resource",
        generator: {
          filename: "static/media/[hash][ext][query]"
        }
 }
```

```
自定义设置输出路径
output: {
    path: path.resolve(__dirname, "dist"),
    filename: "static/js/main.js",
    clean: true
 },
```

```

```

## eslint配置

```
1.下载对应资源并引入配置
npm install eslint-webpack-plugin --save-dev
npm install eslint --save-dev
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  // ...
  plugins: [new ESLintPlugin({
  	context: path.resolve(__dirname,"src") //eslint检查的目录范围
  })],
  // ...
};
```

```
2.配置eslint 配置文件
在项目根目录下创建其一:
.eslintrc
.eslintrc.js
.eslintrc.json
package.json中eslintConfig

我采用.eslintrc.js
module.exports = {
  extends: ["eslint:recommended"], //继承官方的一些规则
  rules: {
    "no-var": 2   //自己书写的一些规则,会进行覆盖
  },
  env: {
    node: true, //启用node中全局变量
    browser: true, //启用浏览器中全局变量 使用console.log
  },
  parserOptions: {
    ecmaVersion: 6,  //ES6语法
    sourceType: "module",  //ES6模块化
  }
}
```

+ 当你的eslint插件将dist下的文件也标红(因为eslint没有检测范围,全检测),可以在项目根目录下创建.eslintignore文件,对一些文件进行检测的忽略.

```
例: .eslintignore   内容: dist
```

## babel  es6解析为es5

```
1.下载资源
npm i babel-loader @babel/core @babel/preset-env -D
```

```
2.配置文件
babel.config.js
babel.config.json
.babelrc
.babelrc.js
.babelrc.json
```

```
3.配置内容 babel.cofig.js为例
module.exports = {
  presets: ["@babel/preset-env"],
};
```

```
5.webpack.config.js配置
rules: [
	{
        test: /\.js$/,
        exclude: /node_modules/, // 排除node_modules代码不编译
        loader: "babel-loader",
     }
]
```

## html资源

```
1.下载资源
npm i html-webpack-plugin -D
2.webpack.config.js配置
plugins: [
	new HtmlWebpackPlugin({
		filename: "index.html", //相对路径,打包到哪个位置,默认dist目录下
		template:  path.resolve(__dirname, "../public/index.html") //绝对路径,以哪个文件作为模板文件
		
	})
]
```

##  dev-server 修改自动编译 内存打包

```
1. 下载资源
npm i webpack-dev-server -D
2.服务器配置
// 开发服务器
  devServer: {
    host: "localhost", // 启动服务器域名
    port: "3000", // 启动服务器端口号
    open: true, // 是否自动打开浏览器
  },
  mode: "development",
3. npx webpack serve //serve 指用服务器打开打包后的html文件
```

## 生产模式

```
1.功能: 对代码进行优化,运行性能和速度
2. 在根目录创建config文件夹,存放不同环境的webpack配置文件
webpack.prod.js
webpack.dev.js
```

+ 相对路径,相对的是运行程序时终端输入命令时的位置.

```
对应的打包命令发送变化:
npx webpack serve --config ./config/webpack.dev.js
npx webpack --config ./config/webpack.prod.js
```

## css单独分出 link引入css

```
1.下载资源
npm i mini-css-extract-plugin -D
2.配置
new MiniCssExtractPlugin({
      // 定义输出文件名和目录
      filename: "static/css/main.css",
 }),
 3.替换style方式引入
 {
        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
  },
```

## css3兼容

```
1.下载资源
npm i postcss-loader postcss postcss-preset-env -D
2.在sass-loader和css-loader之间加入
{
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  "postcss-preset-env", // 能解决大多数样式兼容性问题
                ],
              },
            },
 }
 3.对哪些版本进行兼容
 package.json下:
{
  // 其他省略
  "browserslist": ["last 2 version", "> 1%", "not dead"]
}
```

## CSS压缩

```
1.下载资源
npm i css-minimizer-webpack-plugin -D
2.配置
// css压缩
    new CssMinimizerPlugin(),
```

## 默认production模式下会对js,html进行压缩

## 高级部分

```
1.提升开发体验
```

```
source-map 开发模式|生产模式 发生代码错误,寻找到的是编译后的代码,无法准备知道报错位置和原因,所以需要配置devtool
开发模式:
module.exports = {
  // 其他省略
  mode: "development",
  devtool: "cheap-module-source-map",
};
生产模式:
module.exports = {
  // 其他省略
  mode: "production",
  devtool: "source-map",
};
```



```
2.提升打包速度
HMR: 开发模式使用,当修改一个js文件,会对所有模块进行编译打包,效率低,配置它实现局部更新,不对整个项目进行打包刷新
配置:
module.exports = {
  // 其他省略
  devServer: {
    host: "localhost", // 启动服务器域名
    port: "3000", // 启动服务器端口号
    open: true, // 是否自动打开浏览器
    hot: true, // 开启HMR功能（只能用于开发环境，生产环境不需要了）
  },
};
main.js
if (module.hot) {
	module.hot.accept("js模块路径")
}
当然在vue和react项目中,只需要使用相应的loader解析即可.

oneOf
缩短寻找对应资源loader的查询过程
配置:
rules: [
      {
        oneOf: [
          		{
            // 用来匹配 .css 结尾的文件
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
          		}
    		]
  	  }
  ]
  
include,exclude 排除和包含,排除对第三方库的检测和编译
{
            test: /\.js$/,
            // exclude: /node_modules/, // 排除node_modules代码不编译
            include: path.resolve(__dirname, "../src"), // 也可以用包含
            loader: "babel-loader",
 }
 
 new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, "../src"),
      exclude: "node_modules", // 默认值
 })
 
 cache 用于生产模式,生成一次打包后的babel编译和eslint检查缓存,在第二次打包时,只检查和编译更新的内容
 配置:
 {
            test: /\.js$/,
            // exclude: /node_modules/, // 排除node_modules代码不编译
            include: path.resolve(__dirname, "../src"), // 也可以用包含
            loader: "babel-loader",
            options: {
              cacheDirectory: true, // 开启babel编译缓存
              cacheCompression: false, // 缓存文件不要压缩
            },
  }


Thread 多线程执行检查编译压缩功能,eslint 、babel、Terser
配置:
// nodejs核心模块，直接使用
const os = require("os");
// cpu核数
const threads = os.cpus().length;
npm i thread-loader -D

const os = require("os");
const TerserPlugin = require("terser-webpack-plugin");
// cpu核数
const threads = os.cpus().length;
babel配置:
{
            test: /\.js$/,
            // exclude: /node_modules/, // 排除node_modules代码不编译
            include: path.resolve(__dirname, "../src"), // 也可以用包含
            use: [
              {
                loader: "thread-loader", // 开启多进程
                options: {
                  workers: threads, // 数量
                },
              },
              {
                loader: "babel-loader",
                options: {
                  cacheDirectory: true, // 开启babel编译缓存
                },
              },
            ],
          },
        ],
 }
 eslint配置:
 new ESLintWebpackPlugin({
      // 指定检查文件的根目录
      context: path.resolve(__dirname, "../src"),
      exclude: "node_modules", // 默认值
      cache: true, // 开启缓存
      // 缓存目录
      cacheLocation: path.resolve(
        __dirname,
        "../node_modules/.cache/.eslintcache"
      ),
      threads, // 开启多进程
    }),
terset配置:
optimization: {
    minimize: true,
    minimizer: [
      // css压缩也可以写到optimization.minimizer里面，效果一样的
      new CssMinimizerPlugin(),
      // 当生产模式会默认开启TerserPlugin，但是我们需要进行其他配置，就要重新写了
      new TerserPlugin({
        parallel: threads // 开启多进程
      })
    ],
  },
```

```
3.减少打包代码体积

babel 减少babel中辅助代码重复
下载:
npm i @babel/plugin-transform-runtime -D

{
                loader: "babel-loader",
                options: {
                  cacheDirectory: true, // 开启babel编译缓存
                  cacheCompression: false, // 缓存文件不要压缩
                  plugins: ["@babel/plugin-transform-runtime"], // 减少代码体积
                },
 },
 
 
 
image-minimizer 图片压缩
1.下載包
npm i image-minimizer-webpack-plugin imagemin -D
2.选择哪一种
无损:
npm install imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo -D
有损:
npm install imagemin-gifsicle imagemin-mozjpeg imagemin-pngquant imagemin-svgo -D

无损:
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
配置文件:
optimization: {
    minimizer: [
      // css压缩也可以写到optimization.minimizer里面，效果一样的
      new CssMinimizerPlugin(),
      // 当生产模式会默认开启TerserPlugin，但是我们需要进行其他配置，就要重新写了
      new TerserPlugin({
        parallel: threads, // 开启多进程
      }),
      // 压缩图片
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminGenerate,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              [
                "svgo",
                {
                  plugins: [
                    "preset-default",
                    "prefixIds",
                    {
                      name: "sortAttrs",
                      params: {
                        xmlnsOrder: "alphabetical",
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],
  }
  打包出错:
  我们需要安装两个文件到 node_modules 中才能解决, 
  node_modules\jpegtran-bin\vendor 下http://jpegclub.org/jpegtran/
  node_modules\optipng-bin\vendor 下 http://optipng.sourceforge.net/
```

```
优化代码运行性能
```

```
js代码分割

1.多路口引入 (几个路口几个出口)
entry: {
    main: "./src/main.js",
    app: "./src/app.js",
},
output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "js/[name].js",
    clear: true,
}
```

```
2.多路口引入同一代码模块重复问题
 optimization: {
    // 代码分割配置
    splitChunks: {
      chunks: "all", // 对所有模块都进行分割
      // 以下是默认值
      // minSize: 20000, // 分割代码最小的大小
      // minRemainingSize: 0, // 类似于minSize，最后确保提取的文件大小不能为0
      // minChunks: 1, // 至少被引用的次数，满足条件才会代码分割
      // maxAsyncRequests: 30, // 按需加载时并行加载的文件的最大数量
      // maxInitialRequests: 30, // 入口js文件最大并行请求数量
      // enforceSizeThreshold: 50000, // 超过50kb一定会单独打包（此时会忽略minRemainingSize、maxAsyncRequests、maxInitialRequests）
      // cacheGroups: { // 组，哪些模块要打包到一个组
      //   defaultVendors: { // 组名
      //     test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
      //     priority: -10, // 权重（越大越高）
      //     reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
      //   },
      //   default: { // 其他没有写的配置会使用上面的默认值
      //     minChunks: 2, // 这里的minChunks权重更大
      //     priority: -20,
      //     reuseExistingChunk: true,
      //   },
      // },
      // 修改配置
      cacheGroups: {
        // 组，哪些模块要打包到一个组
        // defaultVendors: { // 组名
        //   test: /[\\/]node_modules[\\/]/, // 需要打包到一起的模块
        //   priority: -10, // 权重（越大越高）
        //   reuseExistingChunk: true, // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
        // },
        default: {
          // 其他没有写的配置会使用上面的默认值
          minSize: 0, // 我们定义的文件体积太小了，所以要改打包的最小文件体积
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
```

```
3.按需加载,动态导入
console.log("hello main");

document.getElementById("btn").onclick = function () {
  // 动态导入 --> 实现按需加载
  // 即使只被引用了一次，也会代码分割
  import("./math.js").then(({ sum }) => {
    alert(sum(1, 2, 3, 4, 5));
  });
};

只有当按下按钮时,math.js才会加载
```

```
4.动态导入取名
 import(/* webpackChunkName: "math" */ "./js/math.js").then(({ count }) => {
    console.log(count(2, 1));
  });
  
output: {
    path: path.resolve(__dirname, "../dist"), // 生产模式需要输出
    filename: "static/js/[name].js", // 入口文件打包输出资源命名方式
    chunkFilename: "static/js/[name].chunk.js", // 动态导入输出资源命名方式
    assetModuleFilename: "static/media/[name].[hash][ext]", // 图片、字体等资源命名方式（注意用hash）
    clean: true,
  },
```

```
5.预加载 preload,prefetch
npm i @vue/preload-webpack-plugin -D
const PreloadWebpackPlugin = require("@vue/preload-webpack-plugin");
new PreloadWebpackPlugin({
      rel: "preload", // preload兼容性更好
      as: "script",
      // rel: 'prefetch' // prefetch兼容性更差
    }),
```

```
6.core.js解决js es6以上兼容
npm i core-js
自动按需引入:
presets: [
    [
      "@babel/preset-env",
      // 按需加载core-js的polyfill
      { useBuiltIns: "usage", corejs: { version: "3", proposals: true } },
    ],
  ],
```

```
7.pwa
npm i workbox-webpack-plugin -D
const WorkboxPlugin = require("workbox-webpack-plugin");
new WorkboxPlugin.GenerateSW({
      // 这些选项帮助快速启用 ServiceWorkers
      // 不允许遗留任何“旧的” ServiceWorkers
      clientsClaim: true,
      skipWaiting: true,
    }),
    
main.js:
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}
```

```
net-work
```

## vue-cli  开发生产合并配置

```
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
```

