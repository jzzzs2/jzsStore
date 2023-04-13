/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-03-16 15:56:58
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-04 17:01:03
 */
export default {
  login: {
    username: [
      {
        required: true, message: '账号必填', trigger: 'onBlur'
      },
      {
        pattern: /^(?!\d+$)(?![a-zA-Z]+$)[a-zA-Z0-9]{6,8}$/,
        message: "账号格式 数字+字母 6-8位",
        trigger: 'onBlur'
      }
    ],
    password: [
      {
        required: true, message: '密码必填', trigger: 'onBlur'
      },
      {
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!.#*?&]{8,12}$/,
        message: "密码必填|密码格式 至少包含大写字母+小写字母+数字 8-12位",
        trigger: 'onBlur'
      }
    ]
  },
  // /^(?!\d+$)(?![a-zA-Z]+$)[a-zA-Z0-9]{6,8}$/
  // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!.#*?&]{8,12}$/
  //   username: "账号必填|账号格式 数字+字母 6-8位",
  //   password: "密码必填|密码格式 至少包含大写字母+小写字母+数字 8-12位 "
  register: {
    username: [
      {
        required: true, message: '账号必填', trigger: 'onBlur'
      },
      {
        pattern: /^(?!\d+$)(?![a-zA-Z]+$)[a-zA-Z0-9]{6,8}$/,
        message: "账号格式 数字+字母 6-8位",
        trigger: 'onBlur'
      }
    ],
    password: [
      {
        required: true, message: '密码必填', trigger: 'onBlur'
      },
      {
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!.#*?&]{8,12}$/,
        message: "密码必填|密码格式 至少包含大写字母+小写字母+数字 8-12位",
        trigger: 'onBlur'
      }
    ],
    email: [
      {
        required: true, message: '邮箱必填', trigger: 'onBlur'
      },
      {
        type: "email", message: '邮箱格式有误', trigger: 'onBlur'
      }
    ]
  },
  // username: "账号必填|账号格式 数字+字母 6-8位",
  //   email: '邮箱必填|请填写正确的邮箱格式',
  //   password: "密码必填|密码格式 至少包含大写字母+小写字母+数字 8-12位 "
  classifyAdd: {
    classifyName: [
      {
        required: true, message: '分类必填', trigger: 'onBlur'
      }
    ]
  },
  info: {
    nickname: [
      {required: true, message: '昵称必填', trigger: 'onBlur'}
    ],
    email: [
      {required: true, message: '邮箱必填', trigger: 'onBlur'}
    ]
  }
}