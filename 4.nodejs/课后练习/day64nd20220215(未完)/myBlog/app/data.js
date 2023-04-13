/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-17 18:52:36
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-02-20 12:48:17
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
      },
      {
        inputName: "email",
        name: "邮箱",
        inputType: "text",
        placeHolder: "请输入邮箱"
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
  },
  classifyAdd: {
    title: "分类添加",
    formData: [
      {
        inputName: "name",
        name: "分类名",
        inputType: "text",
        placeHolder: "请输入分类名"
      },
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
  },
  info: {
    title: "用户信息",
    formData: [
      {
        inputName: "username",
        name: "用户名",
        inputType: "text",
        placeHolder: "用户名",
        readonly: true
      },
      {
        inputName: "email",
        name: "邮箱",
        inputType: "text",
        placeHolder: "修改邮箱"
      },
      {
        inputName: "nickname",
        name: "昵称",
        inputType: "text",
        placeHolder: "修改昵称"
      },
      {
        inputName: "signature",
        name: "签名",
        inputType: "text",
        placeHolder: "修改签名"
      }
    ],
    btns: [
      {
        pageType: "infoModify",
        type: "close",
        resName: "取消"
      },
      {
        pageType: "infoModify",
        type: "confirm",
        resName: "确定"
      }
    ]
  }
}