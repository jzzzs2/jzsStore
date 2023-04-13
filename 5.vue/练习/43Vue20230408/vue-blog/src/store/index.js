/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-03-15 15:36:31
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-03-30 16:53:17
 */
import Vue from 'vue'
import Vuex from 'vuex'
import modal from "./modules/modal"
import hits from "./modules/hits"
import store from "store"
import b from "@/config/http.config"
let { TOKEN_NAME } = b
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: store.get(TOKEN_NAME),
    userInfo: {

    },
    direction: "left"
  },
  getters: {
    src(state) {
      return state.userInfo?.avatar.replace("/public", "")
    }
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_USER(state, upload) {
      upload.avatar = upload.avatar.replace("/public", "")
      console.log(upload, "upload2");
      state.userInfo = upload
      Vue.prototype.$notify({
        title: "成功!",
        message: `${state.userInfo.nickname} 欢迎你~`,
        type: "success",
      });
    },
    CLEAR_USER (state,{type}) {
      if (type === 1) {
        Vue.prototype.$notify({
          title: "成功!",
          message: `${state.userInfo.nickname} 再见~`,
          type: "success",
        });
      }
      if (type === 0){
        Vue.prototype.$notify({
          title: "通知",
          message:"其它设备已登录",
          type: "warning",
        });
      }
      store.remove([TOKEN_NAME])
      store.remove("uid")
      state.token = ""
      state.userInfo = {}
    }
  },
  actions: {
    async setToken(context, token) {
      context.commit("SET_TOKEN", token)
      let result = await Vue.prototype.$http({ type: "index" })
      //修改用户信息
      // console.log(result,"real result");
      // console.log(result,{...result?.data.data,...result?.data.num},"look");
      // console.log({...result?.data.data,...result?.data.num},"upload1");
      context.dispatch("setUser", { ...result?.data.data, ...result?.data.message })
    },
    setUser(context, upload) {
      context.commit("SET_USER", upload)
    },
    async clearUser (context,{type}) {
      context.commit("CLEAR_USER",{type})
    }
  },
  modules: {
    modal,
    hits
  }
})
