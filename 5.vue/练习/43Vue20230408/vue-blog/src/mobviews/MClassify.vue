<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-04-01 14:49:14
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-06 15:28:31
-->
<template>
  <div>
    <van-tabs v-model="active" :sticky="true" offset-top="46">
      <van-tab :title="item.name" v-for="(item,idx) in classifyList" :key="idx" :name="item.id"></van-tab>
    </van-tabs>
    <MArticleList :classifyId="active" />
  </div>
</template>

<script>
import MArticleList from "@/mobviews/MArticleList.vue"
export default {
  components: {
    MArticleList
  },
  data() {
    return {
      active: "",
      classifyList: []
    };
  },
  async created() {
    let result = await this.$http({ type: "classify" });
    this.classifyList = result.data.data.list
    console.log(this.classifyList);
  },
  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped>
</style>