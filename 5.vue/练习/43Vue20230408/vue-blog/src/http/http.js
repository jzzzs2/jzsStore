/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-03-17 18:36:36
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-03-27 17:56:29
 */
/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-03-17 18:36:36
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-03-17 18:42:01
 */
/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-16 11:29:48
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-02-20 16:21:39
 */
import b from "@/config/http.config"
let { TOKEN_NAME, PUBLICKey_NAME, RESTIME } = b
import store from "store"
import JSEncrypt from "jsencrypt"
import axios from "axios"
import reqInfoMap from "@/config/httpMap"
const codeMap = {
  "401": "无权限登录"
}
function getToken() {
  return store.get(TOKEN_NAME)
}
axios.defaults.baseURL = 'http://127.0.0.1:3000'
axios.defaults.timeout = RESTIME

//请求函数
export default async function Http({ type, data }) {
  let { url, method, secName, rest, auto } = reqInfoMap[type]
  //拦截器
  let instance = axios.create()
  instance.interceptors.request.use(async (config) => {
    console.log("请求拦截器");
    if (store.get(TOKEN_NAME)) {
      config.headers['Authorization'] = "Bearer " + getToken()
    }
    //rest参数替换
    if (rest) {
      console.log(url,data,"xxxx test");
      let restSymbol = config.url.match(/:(.*)$/)?.[1]
      console.log(restSymbol,"restSymbol");
      config.url = config.url.replace(/:(.*)$/,data?.params?.[restSymbol])
      // let id = config?.params?.id
      // if (id) {
      //   console.log(id, "ID", config,url,config.url);
      //   console.log(config.url, "url1");
      //   config.url = config.url.replace(/:.*$/, id)
      //   console.log(config.url, "url2");
      //   console.log(config.url.params,"after params");
      // }

    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });
  instance.interceptors.response.use((response) => {
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
    console.log("失败了捏");
    return Promise.reject(error);
  });
  /*
  拦截器
  */
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
  console.log(data, "传入接口的data", url, method);
  let result = await instance[method.toLowerCase()](url, data)
  console.log(result, "axios result");
  if (result?.data?.data?.token) {
    console.log("token");
    store.set(TOKEN_NAME, result.data.data.token)
    store.set("uid", result.data.data.userId)
  }
  result.articleNum = result.data.message.articleNum
  result.classifyNum = result.data.message.classifyNum
  return result
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