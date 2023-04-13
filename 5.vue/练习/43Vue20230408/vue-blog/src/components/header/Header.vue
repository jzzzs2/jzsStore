<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-03-18 15:30:09
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-03-30 18:18:23
-->
<template>
  <el-row
    type="flex"
    justify="space-around"
    align="center"
    class="blog-header--row"
  >
    <el-col :span="4">
      <el-image
        style="width: 80px; height: 80px"
        :src="require('@/assets/img/xiangcai.png')"
        fit="cover"
      ></el-image>
    </el-col>
    <el-col :span="9" class="hidden-xs-only">
      <!-- <el-menu mode="horizontal" active-text-color="#fff" background-color="#222"> -->
      <el-menu
        mode="horizontal"
        router
        active-text-color="#409EFF"
        default-active="/"
      >
        <el-menu-item index="/">主页</el-menu-item>
        <el-menu-item index="/column">分类</el-menu-item>
        <!-- <el-menu-item index="/article/list">文章列表</el-menu-item> -->
        <el-menu-item index="/photo">DIY头像</el-menu-item>
        <el-menu-item index="/wechat">聊天室</el-menu-item>
        <el-menu-item index="/userInfo">我的</el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="4" class="hidden-xs-only">
      <el-input placeholder="搜索" v-model="searchValue" @keyup.native.enter="searchArticles" ref="searchInput">
        <i slot="suffix" class="el-input__icon el-icon-search" @click="searchArticles"></i>
      </el-input>
    </el-col>
    <component :is="isUser"></component>
  </el-row>
</template>

<script>
import NormalUser from "@/components/user/NormalUser";
import UserAvatar from "@/components/user/UserAvatar";
export default {
  components: {
    NormalUser,
    UserAvatar,
  },
  data() {
    return {
      searchValue: ""
    };
  },
  computed: {
    isUser() {
      return this.$store.state.token ? "UserAvatar" : "NormalUser";
    },
  },
  mounted() {},

  methods: {
    searchArticles() {
      // console.log(e,"xxx");
      this.$bus.$emit("getSearchArticle",this.searchValue)
      this.searchValue = ""
    }
  },
};
</script>

<style lang="stylus">
ul.el-menu {
  display: flex;
  justify-content: space-around;

  & li {
    width: 15%;
    font-size: 16px;
  }
}

div.el-image>img {
  border-radius: 50%;
}
</style>