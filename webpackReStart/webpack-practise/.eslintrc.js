module.exports = {
  extends: ["eslint:recommended"],
  rules: {
    "no-var": 2
  },
  env: {
    node: true, // 启用node中全局变量
    browser: true, // 启用浏览器中全局变量 使用console.log
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",  //ES6模块化
  }
}