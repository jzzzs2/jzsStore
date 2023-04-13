<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-04-03 15:36:26
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-06 15:42:29
-->
<template>
  <div>
    <van-search
      v-model="value"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @keyup.native.enter="onSearch"
    >
      <template #action>
        <div @click="onClickButton">搜索</div>
      </template>
      
    </van-search>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
    };
  },

  mounted() {},

  methods: {
    onSearch() {
      this.$bus.$emit("m-searchAriticles",this.value)
    },
    onClickButton() {
      this.$bus.$emit("m-searchAriticles",this.value)
    },
  },
};
</script>

<style lang="scss" scoped>
</style>