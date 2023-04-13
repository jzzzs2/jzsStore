/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-16 11:29:48
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-02-12 12:45:30
 */
import RouterObj from "./router.js"
import store from "store"
import JSEncrypt from "jsencrypt"
import axios from "axios"
import MsgModule from "./message"
let reqInfoMap = {
  "login": {
    hasToken: false,
    secName: "pwd",
    url: "admin/login",
    method: "POST"
  },
  "regis": {
    hasToken: false,
    secName: "pwd",
    url: "admin/regis",
    method: "POST"
  },
  // "index": {
  //   hasToken: true,
  //   url: "/index",
  //   secName: "",
  //   method: "GET"
  // },
  "index": {
    hasToken: true,
    url: "/index",
    method: "GET",
    auto: true
  },
  "getPublic": {
    hasToken: false,
    secName: "",
    url: "/key",
    method: "GET"
  },
  "articles": {
    hasToken: false,
    url: "/api/rest/articles",
    method: "GET"
  },
  "classify": {
    hasToken: false,
    url: "/api/rest/articles",
    method: "GET"
  },
  "article": {
    rest: true,
    hasToken: false,
    url: "/api/rest/article/:id",
    method: "GET"
  },
  "articleAdd": {
    hasToken: true,
    url: "/api/rest/articles",
    method: "POST"
  } 
}
const codeMap = {
  "401": "无权限登录"
}
const TOKEN_NAME = "token"
const PUBLICKey_NAME = "pbkey"
const RESTIME = 2500
axios.defaults.baseURL = 'http://127.0.0.1:3000'
export default class Http {
  constructor({ type = "index", data, successCallback } = {}) {
    this.type = type
    this.data = data
    this.successCallback = successCallback
    this.request = axios.create({
      timeout: RESTIME
    });
    return this.init()
  }
  init() {
    if (!this.type in reqInfoMap) {
      return
    }
    Object.assign(this, reqInfoMap[this.type])
    return this.interceptor()
  }
  interceptor() {
    console.log("进入 interceptor");
    if (this.hasToken) {
      // 添加token
      this.request.defaults.headers.common['Authorization'] = getToken()
      console.log(getToken(),"token");
    }
    this.request.interceptors.request.use(async (config) => {
      let id = config.id
      //rest参数替换
      if (this.rest) {
        config.url = config.url.replace(/:.*$/,id)
      }
      let obj = config.data
      if (config.method.toLowerCase() === "post" && this.secName in obj) {
        //进行加密
        // console.log(obj[this.secName],"数据");
        let formatInfo = await this.encrypt(obj[this.secName])
        config.data[this.secName] = formatInfo
      }
      // 在发送请求之前做些什么
      return config;
    }, function (error) {
      // 对请求错误做些什么
      return Promise.reject(error);
    });
    this.request.interceptors.response.use((response) => {
      // 对响应数据做点什么
      // console.log(response, "response HTTP");
      if (/^2.+/.test(response.data.status)) {
        // this.successCallback(response.data)
        //注册成功
        console.log("成功了捏");
      }
      if (response.data.tip === "LOGINSUCC") {
        console.log("save token");
        store.set(TOKEN_NAME, response.data.data)
      }
      // console.log(response, "如果返回了token 则本地保存");
      return response;
    }, (error) =>{
      // 对响应错误做点什么
      console.log(this.auto,"AUTO");
      if (this.auto) {
        console.log("不进行显示报错");
        return
      }
      console.log("error ++++",error.response.data);
      let data = error.response.data
      if (data.code in codeMap) {
        data.message = codeMap[data.code]
      }
      data = {...data,type: "danger"}
      let wrap = document.querySelector("#tips")
      // console.log(data,"data");
      new MsgModule(wrap,data)
      return Promise.reject(error);
    });
    return this.send()
  }
  async send() {
    console.log("进入发送数据");
    console.log(this.method.toLowerCase());
    try {
      // console.log(this.method,this.url,this.data,"2222");
      let result = await this.request[this.method.toLowerCase()](this.url, this.data)
      console.log(result, "result");
      return result
    } catch (error) {
      console.log(error, "error");
      RouterObj.go("/index")
    }

  }
  async getPublicKey() {
    let key = await axios.get("http://127.0.0.1:3000/key")
    console.log(key, "key");
    key = key.data.data['pubKey']
    console.log(key,"key2");
    key = key.replace(/\. +/g, '')
    key = key.replace(/[\r\n]/g, '')
    store.set(PUBLICKey_NAME, key)
    return key
  }
  async encrypt(info) {
    let key = await this.getPublicKey()
    console.log(key, "public key", info);
    return encrypt(key, info)
  }
}
function encrypt(publicKey, value) {
  let encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);
  return encrypt.encrypt(value)
}
function getToken() {
  return store.get(TOKEN_NAME)
}