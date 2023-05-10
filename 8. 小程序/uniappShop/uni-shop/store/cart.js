export default {
  namespaced: true,
  state: {
    cartList: uni.getStorageSync("cart") ? JSON.parse(uni.getStorageSync("cart")) : []
  },
  mutations: {
    updateAllSelected(state,isSelected) {
      state.cartList.forEach(item => {
        item.goods_state = isSelected
      })
      this.commit("cart/saveData")
    },
    addCart(state,goods) {
      state.cartList.push(goods)
      this.commit("cart/saveData")
    },
    addCartCountById(state,id) {
      state.cartList.find(item => {
        return item.goods_id === id
      }).goods_count++
      // console.log(this,"this")
      this.commit("cart/saveData")
    },
    changeStateById(state,good) {
      state.cartList.find(item => {
        return item.goods_id === good.goods_id
      }).goods_state = good.goods_state
      this.commit("cart/saveData")
    },
    changeNumById(state,good) {
      state.cartList.find(item => {
        return item.goods_id === good.goods_id
      }).goods_count = good.goods_count
      this.commit("cart/saveData")
    },
    deleteGoodById(state,id) {
      state.cartList = state.cartList.filter(item => {
        return item.goods_id !== id
      })
      this.commit("cart/saveData")
    },
    saveData(state)  {
      uni.setStorageSync("cart",JSON.stringify(state.cartList))
    }
  },
  getters: {
    cartCount(state) {
      return state.cartList.reduce((acc,item) => {
        acc += item.goods_count
        return acc
      },0)
    },
    cartCountSelected(state) {
      return state.cartList.reduce((acc,item) => {
        if (item.goods_state) {
          acc += item.goods_count
        }
        return acc
      },0)
    },
    cartAllPrice(state) {
      return state.cartList.reduce((acc,item) => {
        if (item.goods_state) {
          acc += item.goods_count * item.goods_price
        }
        return acc
      },0).toFixed(2)
    }
  }
}