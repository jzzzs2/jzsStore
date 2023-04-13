/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-16 11:29:48
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-02-15 20:10:06
 */
import RouterObj from "./router.js"
import store from "store"
import JSEncrypt from "jsencrypt"
import axios from "axios"
import MsgModule from "./message"
let reqInfoMap = {
  "login": {
    secName: "pwd",
    url: "admin/login",
    method: "POST",
    rsa: true
  },
  "regis": {
    secName: "pwd",
    url: "admin/regis",
    method: "POST",
    rsa: true
  },
  // "index": {
  //   hasToken: true,
  //   url: "/index",
  //   secName: "",
  //   method: "GET"
  // },
  "index": {
    url: "/index",
    method: "GET",
    auto: true
  },
  "getPublic": {
    secName: "",
    url: "/key",
    method: "GET"
  },
  "articles": {
    url: "/api/rest/articles",
    method: "GET"
  },
  "classify": {
    url: "/api/rest/classify",
    method: "GET",
    rest: true
  },
  "article": {
    rest: true,
    url: "/api/rest/article/:id",
    method: "GET"
  },
  "articleAdd": {
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
export default async function Http({ type, data}) {
  // if (!reqInfoMap?.[type]) {
  //   console.log("没有该请求");
  //   return false
  // }
  let { url, method, rest, secName, auto, rsa } = reqInfoMap[type]
  let instance = axios.create()
  instance.interceptors.request.use(async (config) => {
    if (store.get(TOKEN_NAME)) {
      config.headers['Authorization'] = getToken()
    }

    //rest参数替换
    if (rest) {
      let id = config?.params?.id
      // if (type == "classify") {
      //   id = store.get("uid")
      // }
      console.log(id, "ID", config);
      console.log(config.url, "url1");
      config.url = config.url.replace(/:.*$/, id)
      console.log(config.url, "url1");
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });
  instance.interceptors.response.use((response) => {
    // console.log(response, "如果返回了token 则本地保存");
    return response;
  }, (error) => {
    if (auto) {
      console.log("不进行显示报错");
      return
    }
    let data = error?.response?.data
    if (data?.code in codeMap) {
      data.message = codeMap[data.code]
    }
    data = { ...data, type: "danger" }
    let wrap = document.querySelector("#tips")
    new MsgModule(wrap, data)
    return Promise.reject(error);
  });
  //
  if (method.toLowerCase() === "post" && secName) {
    //进行加密
    let formatInfo = await encrypt(data[secName])
    data[secName] = formatInfo
  }
  if (method.toLowerCase() === "get") {
    data = {
      params: data
    }
  }
  console.log(data,"传入接口的data",url,method);
  let result = await instance[method.toLowerCase()](url,data)
  console.log(result, "axios result");
  if (result?.data?.data?.token) {
    console.log("token");
    store.set(TOKEN_NAME, result.data.data.token)
    store.set("uid",result.data.data.userId)
  }
  return result

}





// export default class Http {
//   constructor({ type = "index", data, successCallback } = {}) {
//     this.type = type
//     this.data = data
//     this.successCallback = successCallback
//     this.request = axios.create({
//       timeout: RESTIME
//     });
//     return this.init()
//   }
//   init() {
//     if (!this.type in reqInfoMap) {
//       return
//     }
//     Object.assign(this, reqInfoMap[this.type])
//     return this.interceptor()
//   }
//   interceptor() {
//     console.log("进入 interceptor");
//     if (this.hasToken) {
//       // 添加token
//       this.request.defaults.headers.common['Authorization'] = getToken()
//       console.log(getToken(), "token");
//     }
//     this.request.interceptors.request.use(async (config) => {

//       //rest参数替换
//       if (this.rest) {
//         let id = config.id
//         console.log(id,"id");
//         config.url = config.url.replace(/:.*$/, id)
//       }
//       let obj = config.data
//       if (config.method.toLowerCase() === "post" && this.secName in obj) {
//         //进行加密
//         // console.log(obj[this.secName],"数据");
//         let formatInfo = await this.encrypt(obj[this.secName])
//         config.data[this.secName] = formatInfo
//       }
//       // 在发送请求之前做些什么
//       return config;
//     }, function (error) {
//       // 对请求错误做些什么
//       return Promise.reject(error);
//     });
//     this.request.interceptors.response.use((response) => {
//       // 对响应数据做点什么
//       // console.log(response, "response HTTP");
//       if (/^2.+/.test(response.data.status)) {
//         // this.successCallback(response.data)
//         //注册成功
//         console.log("成功了捏");
//       }
//       if (response.data.tip === "LOGINSUCC") {
//         console.log("save token");
//         store.set(TOKEN_NAME, response.data.data)
//       }
//       // console.log(response, "如果返回了token 则本地保存");
//       return response;
//     }, (error) => {
//       // 对响应错误做点什么
//       console.log(this.auto, "AUTO");
//       if (this.auto) {
//         console.log("不进行显示报错");
//         return
//       }
//       console.log("error ++++", error.response.data);
//       let data = error.response.data
//       if (data.code in codeMap) {
//         data.message = codeMap[data.code]
//       }
//       data = { ...data, type: "danger" }
//       let wrap = document.querySelector("#tips")
//       // console.log(data,"data");
//       new MsgModule(wrap, data)
//       return Promise.reject(error);
//     });
//     return this.send()
//   }
//   async send() {
//     console.log("进入发送数据");
//     console.log(this.method.toLowerCase());
//     try {
//       // console.log(this.method,this.url,this.data,"2222");
//       let result = await this.request[this.method.toLowerCase()](this.url, this.data)
//       console.log(result, "result");
//       return result
//     } catch (error) {
//       console.log(error, "error");
//       RouterObj.go("/index")
//     }

//   }
//   async getPublicKey() {
//     let key = await axios.get("http://127.0.0.1:3000/key")
//     console.log(key, "key");
//     key = key.data.data['pubKey']
//     console.log(key, "key2");
//     key = key.replace(/\. +/g, '')
//     key = key.replace(/[\r\n]/g, '')
//     store.set(PUBLICKey_NAME, key)
//     return key
//   }
//   async encrypt(info) {
//     let key = await this.getPublicKey()
//     console.log(key, "public key", info);
//     return encrypt(key, info)
//   }
// }
// function encrypt(publicKey, value) {
//   let encrypt = new JSEncrypt();
//   encrypt.setPublicKey(publicKey);
//   return encrypt.encrypt(value)
// }
function getToken() {
  return store.get(TOKEN_NAME)
}
async function encrypt(info) {
  if (!store.get(PUBLICKey_NAME)) {
    let key = await axios.get("http://127.0.0.1:3000/key")
    key = key.data.data['pubKey']
    key = key.replace(/\. +/g, '')
    key = key.replace(/[\r\n]/g, '')
    store.set(PUBLICKey_NAME, key)
  }
  let publicKey = store.get(PUBLICKey_NAME)
  let encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);
  return encrypt.encrypt(info)
}