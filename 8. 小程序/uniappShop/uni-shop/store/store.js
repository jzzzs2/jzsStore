import Vue from 'vue'
import Vuex from 'vuex'
import cart from '@/store/cart.js'
import address from '@/store/address.js'
import foot from "@/store/foot.js"
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    cart,
    address,
    foot
  }
})
export default store