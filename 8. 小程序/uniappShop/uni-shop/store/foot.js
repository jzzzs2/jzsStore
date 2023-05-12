export default {
  namespaced: true,
  state: {
    visitedGoods: JSON.parse(uni.getStorageSync("visited") || "[]"),
    storeGoods: JSON.parse(uni.getStorageSync("goodstar") || "[]")
  },
  mutations: {
    addGoodVisited(state,obj) {
      let idx = state.visitedGoods.findIndex(item => {
        return item.goods_id === obj.goods_id
      })
      if (idx === -1) {
        state.visitedGoods.unshift(obj)
      } else {
        state.visitedGoods.splice(idx,1)
        state.visitedGoods.unshift(obj)
      }
      this.commit("foot/saveVisited")
    },
    saveVisited(state) {
      uni.setStorageSync("visited",JSON.stringify(state.visitedGoods))
    },
    addGoodStar(state,id) {
      let idx = state.storeGoods.indexOf(id)
      if (idx === -1) {
        state.storeGoods.unshift(id)
      } else {
        state.storeGoods.splice(idx,1)
      }
      this.commit("foot/saveGoodStar")
    },
    saveGoodStar(state) {
      uni.setStorageSync("goodstar",JSON.stringify(state.storeGoods))
    }
  },
  getters: {
    visitedNum(state) {
      return state.visitedGoods.length
    },
    starNum(state) {
      return state.storeGoods.length
    }
  }
}