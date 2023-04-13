<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-03-17 20:08:20
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-03-30 18:51:05
-->
<template>
  <div class="blog-user--wrap">
    <div class="blog-user--avatar">
      <img :src="src" alt="">
    </div>
    <svg @click="exit" t="1680161391068" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2771" width="20" height="20"><path d="M512.213333 42.666667a42.666667 42.666667 0 0 1 42.666667 42.666666v426.666667a42.666667 42.666667 0 0 1-85.333333 0V85.333333a42.666667 42.666667 0 0 1 42.666666-42.666666zM210.261333 253.141333a42.624 42.624 0 1 1 60.330667 60.330667 341.333333 341.333333 0 1 0 482.773333 0 42.666667 42.666667 0 0 1 60.330667-60.330667c166.570667 166.656 166.570667 436.778667-0.085333 603.349334-166.613333 166.613333-436.736 166.613333-603.349334 0s-166.613333-436.693333 0-603.349334z" fill="#ffffff" p-id="2772"></path></svg>
  </div>
</template>

<script>
import Vue from "vue"
export default {

  data() {
    return {
      
    };
  },

  mounted() {
    
  },
  computed: {
    src () {
      // return "http://127.0.0.1:3000/img/miku.jpg"
      return this.$store.state.userInfo?.avatar || ""
    },
  },
  methods: {
    exit () {
      // console.log(Vue.prototype.$socket);
      // this.$store.dispatch("clearUser",{type: 1})
      Vue.prototype.$own = true
      Vue.prototype.$socket.close()
      
    }
  },
};
</script>

<style lang="stylus">
  .blog-user--wrap
    display flex
    justify-content: space-around
    align-items: center
    & *
      margin: 0 4px
    & svg
      transition: .5s
      cursor: pointer
    & svg:hover
      transform: scale(1.3)
  .blog-user--avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
  }
  .blog-user--avatar img {
    width: 60px;
    height: 60px;
  }
</style>