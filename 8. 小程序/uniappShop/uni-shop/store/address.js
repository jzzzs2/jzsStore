export default {
  namespaced: true,
  state: {
    addressInfo: (uni.getStorageSync("addr") ? JSON.parse(uni.getStorageSync("addr")) : {}),
    token: uni.getStorageSync("token") || "",
    userInfo: JSON.parse(uni.getStorageSync("userInfo") || "{}"),
    backInfo: {}
  },
  mutations: {
    updateBackInfo(state,info) {
      state.backInfo = info
    },
    updateAddress(state,info) {
      state.addressInfo = info
      this.commit("address/saveAddress")
    },
    saveAddress(state) {
      uni.setStorageSync("addr",JSON.stringify(state.addressInfo))
    },
    updateUserInfo(state,obj) {
      state.userInfo = obj
      this.commit("address/saveUserInfoStorage")
    },
    saveUserInfoStorage(state) {
      uni.setStorageSync("userInfo",JSON.stringify(state.userInfo))
    },
    updateToken(state,token) {
      state.token = token
      this.commit("address/saveToken")
    },
    saveToken(state) {
      uni.setStorageSync("token",state.token)
    }
  },
  getters: {
    locationAddr(state) {
      return state.addressInfo.provinceName + state.addressInfo.cityName + state.addressInfo.countyName + state.addressInfo.detailInfo
    }
  }
}