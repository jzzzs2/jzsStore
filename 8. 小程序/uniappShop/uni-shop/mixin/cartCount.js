import {mapGetters} from "vuex"
export default {
  computed: {
    ...mapGetters("cart",["cartCount"])
  },
  onShow() {
    console.log("set")
    this.setTabBar()
  },
  watch:{
    cartCount() {
      this.setTabBar()
    }
  },
  methods: {
    setTabBar() {
        uni.setTabBarBadge({
          index: 2,
          text: String(this.cartCount)
        })
    }
  }
}