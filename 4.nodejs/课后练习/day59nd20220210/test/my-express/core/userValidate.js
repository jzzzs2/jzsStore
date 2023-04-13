/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-07 20:03:17
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-01-08 13:51:57
 */
const nodeRSA = require("node-rsa")
const path = require("path")
const fs = require("fs").promises
const { encrypt, decrypt } = require("../createKey")
const { getUserData, getUsersLength, writeUsers, getUserByName } = require("../readData")
const { getPublicKey, getPrivateKey } = require("../readKey")
let jwt = require("jsonwebtoken")
let priKey = getPrivateKey()
let pulKey = getPublicKey()
module.exports = {
  existUser(name, pwd) {
    console.log("=================");
    return isExist(name, pwd)
  },
  async addUser(name, pwd) {
    return await appendUser(name, pwd)
  },
  tokenTest(name, pwd) {
    let arr = getUserData()
    let result = arr.find(ele => {
      return ele.name === name && decrypt(decrypt(ele.password)) === pwd
    })
    console.log("token",result);
    if (!result) {
      return {
        msg: "Token错误",
        status: "5002",
        tip: "TokenMis"
      }
    }
    return {
      msg: "Token正确",
      status: "2005",
      tip: "TOkenSucc"
    }
  }
}
//token 判断是否存在
//用于注册
async function appendUser(name, pwd) {
  let id = ("000000" + getUsersLength()).slice(-6)
  console.log(pwd, "pwd");
  let arr = getUserData()
  let target = arr.find(ele => {
    // console.log(ele.name,name,"}}}}}");
    // console.log( decrypt(pwd) ===  decrypt( decrypt(ele.password)),"result");
    // return ele.name === name && decrypt(pwd) ===  decrypt( decrypt(ele.password))
    return ele.name === name
  })
  console.log(target, "target regis");
  if (!target) {
    // console.log("====");
    // console.log(pwd);
    pwd = encrypt(pwd)
    console.log(pwd);
    console.log("====");
    arr.push({ id, password: pwd, name })
    writeUsers(arr)
    return {
      msg: "注册成功",
      status: "2004",
      tip: "REGSUCC"
    }
  }
  return {
    msg: "已存在该用户",
    status: "4008",
    tip: "REGFAIL"
  }
}
//用于登录
function isExist(name, pwd) {
  // let userArr = getUserData()
  // let target = userArr.find(ele => {
  //   return decrypt(pwd) === decrypt(decrypt(ele.password)) && name === ele.name
  // })
  let target = getUserByName(name)
  console.log(target, "target2323232");
  if (!target) {
    return {
      msg: "用户不存在",
      status: "4000",
      tip: "USERNOT"
    }
  }
  console.log(target, "target");
  //存在 返回token
  console.log(pwd, "pwd1");
  console.log(target.password,"target pwd");
  let password = decrypt(decrypt(target.password))
  console.log(password,"normal mima");
  // pwd = decrypt(pwd.trim())
  pwd = decrypt(pwd)
  console.log(pwd, "pwd2", name);
  if (password == pwd) {
    console.log("success token");
    let token = jwt.sign({ name, pwd, exp: ~~((Date.now() / 1000) + 24 * 3600 * 3) }, priKey, { algorithm: "RS256" })
    // console.log(token,"token.....................");
    // let token = "ok"
    // console.log(token);
    return {
      msg: "登录成功",
      status: "2000",
      tip: "LOGINSUCC",
      data: token
    }
  }else {
    return {
      msg: "登录失败",
      status: "4010",
      tip: "PWDMIS",
    }
  }

}