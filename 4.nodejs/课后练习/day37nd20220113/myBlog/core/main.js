/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-13 18:59:21
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-01-13 21:00:06
 */
import Http from "./http.js"
import Modal from "./modal.js"
// let http = new Http({})
// console.log(http);
console.log(Modal);
let data = {
  login: {
    title: "登录",
    formData: [
      {
        name: "用户名",
        inputType: "text",
        placeHolder: "请输入用户名"
      },
      {
        name: "密码",
        inputType: "text",
        placeHolder: "请输入密码"
      }
    ],
    btns: [
      {
        type: "close",
        resName: "取消"
      },
      {
        type: "confirm",
        resName: "确定"
      }
    ]

  },
  regis: {
    title: "注册",
    formData: [
      {
        name: "用户名",
        inputType: "text",
        placeHolder: "请输入用户名"
      },
      {
        name: "密码",
        inputType: "text",
        placeHolder: "请输入密码"
      }
    ],
    btns: [
      {
        type: "close",
        resName: "取消"
      },
      {
        type: "confirm",
        resName: "确定"
      }
    ]
  }
}
let modal = new Modal({data,template:Handlebars.templates["modal.hbs"]})