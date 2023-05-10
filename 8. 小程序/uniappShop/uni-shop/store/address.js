export default {
  namespaced: true,
  state: {
    addressInfo: uni.getStorageSync("addr") ? JSON.parse(uni.getStorageSync("addr")) : {}
  },
  mutations: {
    updateAddress(state,info) {
      state.addressInfo = info
      this.commit("address/saveAddress")
    },
    saveAddress(state) {
      uni.setStorageSync("addr",JSON.stringify(state.addressInfo))
    }
  },
  getters: {
    locationAddr(state) {
      return state.addressInfo.provinceName + state.addressInfo.cityName + state.addressInfo.countyName + state.addressInfo.detailInfo
    }
  }
}