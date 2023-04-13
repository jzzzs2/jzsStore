<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-03-18 16:03:35
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-03-24 17:50:48
-->
<template>
  <el-card class="box-card" shadow="always">
    <div class="blog-userInfo">
      <img :src="userInfo.avatar" alt="" />
      <p class="nickname">{{ userInfo.nickname }}</p>
      <div class="blog-content-intro">
        <div class="blog-intro-num line-sept">
          <span class="w700">{{ userInfo.articleNum }}</span>
          <span>文章</span>
        </div>
        <div class="blog-intro-type">
          <span class="w700">{{ userInfo.classifyNum }}</span>
          <span>分类</span>
        </div>
      </div>
      <p class="blog-content-story">{{ userInfo.signature }}</p>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo || {};
    },
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="stylus">
@import '~@/assets/css/variable.styl';

.blog-content-intro::after {
  position: absolute;
  left: 50%;
  top: 6px;
  content: '';
  display: block;
  height: 32px;
  width: 1px;
  background-color: line-color;
}

.blog-userInfo {
  & img {
    width: 140px;
    height: 140px;
    border-radius: 50%;
  }
}
.blog-intro-num
  margin-top: 6px
  
.blog-intro-type {
  margin-top: 6px;
  align-items: center;
}

.blog-content-story {
  box-sizing: border-box;
  padding: pad-normal * 2;
  font-size: 12px;
}

.box-card {
  background-color: shadow-light;
}
</style>