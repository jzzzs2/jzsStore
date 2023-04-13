/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-16 11:29:48
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-01-17 22:26:04
 */
let reqInfoMap = {
  "login": {
    hasToken: false,
    secName: "pwd",
    url: "/login",
    method: "POST"
  },
  "regis": {
    hasToken: false,
    secName: "pwd",
    url: "/regis",
    method: "POST"
  },
  "index": {
    hasToken: true,
    url: "/index",
    secName: "",
    method: "GET"
  },
  "getPublic": {
    hasToken: false,
    secName: "",
    url: "/getPublic",
    method: "GET"
  }
}
const TOKEN_NAME = "jzs_token"
const PUBLICKey_NAME = "pbkey"
const RESTIME = 2500
axios.defaults.baseURL = 'http://127.0.0.1:3000'
export default class Http {
  constructor({ type = "index",data,successCallback } = {}) {
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
      console.log(this.request.headers);
      this.request.defaults.headers.common['Authorization'] = "Bearer " + getToken()
      console.log(getToken());
    }
    this.request.interceptors.request.use( async (config) => {
      console.log(config.data,"data",config);
      let obj = config.data
      if (config.method.toLowerCase() === "post" && this.secName in obj) {
        //进行加密
        console.log(obj[this.secName],"数据");
        let formatInfo = await this.encrypt(obj[this.secName])
        console.log(formatInfo,"formatInfo");
        console.log(config,"config");
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
      console.log(response,"response HTTP");
      if (/^2.+/.test(response.data.status)) {
        // this.successCallback(response.data)
        //注册成功
        console.log("成功了捏");
      }
      if (response.data.tip === "LOGINSUCC") {
        store.set(TOKEN_NAME, response.data.data)
      }
      console.log(response,"如果返回了token 则本地保存");
      return response;
    }, function (error) {
      // 对响应错误做点什么
      return Promise.reject(error);
    });
    return this.send()
  }
  async send() {
    console.log("进入发送数据");
    let result = await this.request[this.method.toLowerCase()](this.url,this.data)
    console.log(result,"result");
    return result
  }
  async getPublicKey () {
    let key = await axios.get("http://127.0.0.1:3000/getPublic")
    console.log(key,"key");
    key = key.data
    key = key.replace(/\. +/g, '')
    key = key.replace(/[\r\n]/g, '')
    store.set(PUBLICKey_NAME,key)
    return key
  }
  async encrypt (info) {
    let key = await this.getPublicKey()
    console.log(key,"public key",info);
    return encrypt(key, info)
  }
}
function encrypt (publicKey, value) {
  let encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);
  return encrypt.encrypt(value)
}
function getToken () {
  return store.get(TOKEN_NAME)
}