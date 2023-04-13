<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-04-03 15:43:34
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-04 16:35:36
-->
<template>
  <div>
    <van-nav-bar
      :title="title"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    >
    <template #right v-if="btn">
        <van-button plain  type="primary" @click="operate">{{btn}}</van-button>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    title: {
      type: String
    },
    btn: {
      type: String
    }
  },
  mounted() {},

  methods: {
    operate() {
      console.log("展示评论框");
      if (!this.$store.state.token) {
        //跳出登录框
        this.$bus.$emit("setModal","login")
        this.$bus.$emit("setDialogShow")
        return
      }
      this.$bus.$emit("show")
    }
  },
};
</script>

<style lang="stylus" scoped></style>