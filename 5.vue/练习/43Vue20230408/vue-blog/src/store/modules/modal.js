export default {
  namespaced: true,
  state: {
    isShow: false,
    type: ""
  },
  mutations: {
    OPEN (state) {
      state.isShow = true
    },
    CLOSE (state) {
      state.isShow = false
    },
    SET_TYPE (state,obj) {
      state.type = obj.type
    }
  },
  actions: {
    openModal (context,obj) {
      context.commit("OPEN")
      context.commit("SET_TYPE",obj)
    },
    closeModal (context) {
      context.commit("CLOSE")
    },
    setType (context,obj) {
      context.commit("SET_TYPE",obj)
    }
  },
  modules: {
    
  }
}