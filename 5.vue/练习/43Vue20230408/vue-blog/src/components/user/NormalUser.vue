<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-03-17 20:08:34
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-03-23 16:06:31
-->
<template>
    <el-col :span="4" :offset="2" class="hidden-xs-only" :pull="1">
      <div class="blog-header--login">
        <span @click="showModal('login')">登录</span>|<span
          @click="showModal('register')"
          >注册</span
        >
      </div>
    </el-col>
</template>

<script>
export default {
  data() {
    return {};
  },

  mounted() {},

  methods: {
    showModal (type) {
      console.log(type,"type");
      this.$store.dispatch("modal/openModal",{type})
    }
  },
  
};
</script>

<style>
.blog-header--login {
  box-sizing: border-box;
  height: 60px;
  background-color: #eee;
  border-radius: 6px;
  padding: 16px;
}
</style>