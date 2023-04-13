/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-17 18:52:36
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-01-17 18:53:08
 */
export default {
  login: {
    title: "登录",
    formData: [
      {
        inputName: "username",
        name: "用户名",
        inputType: "text",
        placeHolder: "请输入用户名"
      },
      {
        inputName: "pwd",
        name: "密码",
        inputType: "text",
        placeHolder: "请输入密码"
      }
    ],
    btns: [
      {
        pageType: "login",
        type: "close",
        resName: "取消"
      },
      {
        pageType: "login",
        type: "confirm",
        resName: "确定"
      }
    ]

  },
  regis: {
    title: "注册",
    formData: [
      {
        inputName: "username",
        name: "用户名",
        inputType: "text",
        placeHolder: "请输入用户名"
      },
      {
        inputName: "pwd",
        name: "密码",
        inputType: "text",
        placeHolder: "请输入密码"
      }
    ],
    btns: [
      {
        pageType: "regis",
        type: "close",
        resName: "取消"
      },
      {
        pageType: "regis",
        type: "confirm",
        resName: "确定"
      }
    ]
  }
}