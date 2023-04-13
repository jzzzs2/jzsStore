import store from "store"
import axios from "axios"
import b from "@/config/http.config"
let {TOKEN_NAME,RESTIME} = b
const codeMap = {
  "401": "无权限登录"
}
function getToken() {
  return store.get(TOKEN_NAME)
}
axios.defaults.baseURL = 'http://127.0.0.1:3000'
axios.defaults.timeout = RESTIME
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
export default instance