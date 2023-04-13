/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-14 19:38:59
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-02-10 19:47:17
 */
import Validator from "validator.tool"
export default class Validate {
  constructor({ type }) {
    this.type = type
    this.rolesMap = {
      login: {
        username: 'required|is_username',
        pwd: 'required|is_pwd'
      },
      regis: {
        username: 'required|is_username',
        pwd: 'required|is_pwd',
        email: 'required|is_email'
      }
    }
    this.msgMap = {
      login: {
        username: "账号必填|账号格式 数字+字母 6-8位",
        pwd: "密码必填|密码格式 至少包含大写字母+小写字母+数字 8-12位 "
      },
      regis: {
        username: "账号必填|账号格式 数字+字母 6-8位",
        pwd: "密码必填|密码格式 至少包含大写字母+小写字母+数字 8-12位 ",
        email: "邮箱必填|邮箱格式错误"
      }
    }
    return this.verify()
  }
  getValidateArr() {
    let msgObj = this.msgMap[this.type]
    let roleObj = this.rolesMap[this.type]
    console.log(msgObj, roleObj, "test");
    return Object.entries(msgObj).map(([key, value]) => {
      return {
        name: key,
        display: value,
        rules: roleObj[key]
      }
    })
  }
  verify() {
    let arr = this.getValidateArr()
    let type = this.type
    console.log(arr, type, "验证");
    // let data = getFormJson(document.querySelector("#test"))
    console.log(new Promise(function (resolve, reject) {
      new Validator("test", arr, (obj, evt) => {
        console.log(obj, "obj", evt);
        if (obj.errors.length === 0) {
          console.log("111", type);
          resolve(type)
          return false
          // this.succValidCallback(this.type)
        }
        let data = obj.errors
        console.log(data, "data");
        data = data.map(function (item, idx) {
          return {
            msg: item.messages?.[0],
            detailMsg: item.display,
            name: item.name
          }
        })
        console.log("reject");
        reject(data)
      }).validate()
    }));
    return new Promise(function (resolve, reject) {
      new Validator("test", arr, (obj, evt) => {
        console.log(obj, "obj", evt);
        if (obj.errors.length === 0) {
          console.log("111", type);
          resolve(type)
          return false
          // this.succValidCallback(this.type)
        }
        let data = obj.errors
        console.log(data, "data");
        data = data.map(function (item, idx) {
          return {
            msg: item.messages?.[0],
            detailMsg: item.display,
            name: item.name
          }
        })
        console.log("reject");
        reject(data)
      }).validate()
    })

  }
}