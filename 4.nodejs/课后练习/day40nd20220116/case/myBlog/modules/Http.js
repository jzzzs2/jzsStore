
//


const BASEURL = 'http://127.0.0.1:3000'
const TIMEOUT = 3000
const pubKeyName = 'ua_publicKay'
const tokenName = "ua_jot"

const REQUEST_MAP = {
  'register': {
    withToken: false,
    url: '/register',
    method: 'POST',
    rsaKey: 'pwd'
  },
  'login': {
    withToken: false,
    url: '/login',
    method: 'POST',
    rsaKey: 'pwd'
  },
  'user': {
    withToken: true,
    url: '/',
    method: 'POST'
  },
  'pubKey': {
    withToken: false,
    url: '/getPublicKey',
    method: 'GET'
  }
}

function encrypt (publicKey, value) {
  let encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);
  return encrypt.encrypt(value)
}


axios.defaults.baseURL = BASEURL;

export default class Http {
  constructor({ type = 'user', data = {}, callback } = {}) {
    this.type = type
    this.data = data
    this.callback = callback
    this.request = axios.create({ timeout: TIMEOUT })
    this.init()
  }

  init () {
    let type = this.type
    if (!(type in REQUEST_MAP)) {
      return false;
    }
    Object.assign(this, REQUEST_MAP[type])
    if (this.withToken === true) {
      //如果需要Token 配置实例默认请求头 添加token
      this.request.defaults.headers.common['Authorization'] = `Bearer ${store.get(tokenName)}`;
    }
    //添加拦截器
    this.interceptors()
    //发送请求
    this.send()
  }

  async send () {
    let { url, method, data } = this
    try {
      let result = await this.request[method?.toLowerCase()](url, data)

      result && this.callback(result)

    } catch (err) {
      console.log(err)
    }
  }

  async interceptors () {
    let rsaKey = this.rsaKey
    //请求拦截
    this.request.interceptors.request.use(async (config) => {
      let data = config.data
      //如果存在需要加密的 data 键
      if (rsaKey in data) {
        //加密处理
        data[rsaKey] = await this.encrty(data[rsaKey])
      }
      data = JSON.stringify(data)

      return config;

    }, (error) => {

      return Promise.reject(error);
    });
    // 添加响应拦截器
    this.request.interceptors.response.use((response) => {
      //剥离最外层
      let result = response.data
      //p判断任务状态码 是否 为正常 正常为200
      if (result.statusCode !== 200) {
        console.warn('错误信息:', result.errMsg)
        return result?.data;
      }
      //拦截登录成功 后的token
      if (this.type === 'login') {
        let token = result.data.token;
        //本地存储token
        store.set(tokenName, token)
      }

      console.log('成功信息:', result.errMsg)
      return result?.data;
    }, (error) => {
      // 对响应错误做点什么
      return Promise.reject(error);
    });

  }
  //登录成功重定向
  redirect () {

  }

  async encrty (word) {
    let key = store.get(pubKeyName)
    if (!key || key === 'undefined') {
      key = await this.getPubKey()
    }
    return encrypt(key, word)
  }

  async getPubKey () {
    //本地获取pubkey
    let key;
    try {
      let result = await axios.get('/getPublicKey')
      result = result.data
      if (result.statusCode === 200) {
        key = result.data.pubKey
        key = key.replace(/\. +/g, '')
        key = key.replace(/[\r\n]/g, '')
        store.set(pubKeyName, key)
      }
    } catch (err) {
      console.log(err)
    }
    return key
  }


}

/*

  1. host+port
  2. method 分类
  3. 地址分类管理
  4. 返回内容解构

    result.data.data



    axios.get().then(result=>{
      if(result.statusCode)
    })


  接口地址管理
  host port
  http://127.0.0.1:3000


  url
    register  /user/register
    login     /user/login
    getRSA   /getPublicRsa

    method
      post get

  axios[method](url,data)



  request 接口参数管理
    register  username pwd
    login username pwd


    register:{
      getSms:{
        url:'/newW/api/getSms',
        data:{
          mobile: '手机号',
          uuid: 'UuId'
        }
      }
    }
      register/getSms 短信注册
      register/getUuid 获取注册Uuid








  response 返回内容的过滤和管理


*/