<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-04-01 14:48:23
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-06 16:11:14
-->
<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-04-01 14:48:23
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-01 15:12:48
-->
<template>
  <div>
    <van-pull-refresh
      v-model="refresh"
      @refresh="onRefresh"
      success-text="刷新成功"
      pulling-text="下拉ing"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        offset="100"
      >
        <router-link
          v-for="(item, idx) in articleList"
          :key="idx"
          :to="{ name: 'mArticleContent', params: { id: item._id } }"
        >
          <MArticleItem :info="item" class="mt14" />
        </router-link>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import qs from "qs";
import MArticleItem from "@/mComponents/MArticleItem";
export default {
  components: {
    MArticleItem,
  },
  data() {
    return {
      page: 1,
      size: 4,
      articleList: [],
      loading: false,
      finished: false,
      refresh: false,
      search: "",
    };
  },
  props: {
    classifyId: {
      type: String,
    },
  },
  created() {
    this.$bus.$off("m-searchAriticles", this.getSearchArticle);
    this.$bus.$on("m-searchAriticles", this.getSearchArticle);
  },
  mounted() {},
  watch: {
    classifyId(newValue) {
      console.log("监听到classifyId");
      if (newValue) {
      this.clearArticle();
      this.getArticles();
      }
    },
  },
  methods: {
    async onLoad() {
      await this.getArticles();
      setTimeout(() => {
        this.loading = false;
      }, 200);
    },
    async getSearchArticle(value) {
      this.search = value;
      this.clearArticle();
      this.getArticles();
    },
    clearArticle() {
      this.page = 1;
      this.articleList = [];
    },
    async getArticles() {
      //
      let result;
      this.classifyId
        ? (result = await this.$http({
            type: "articles",
            data: {
              size: this.size,
              page: this.page,
              query: qs.stringify({
                query: { classify: this.classifyId, search: this.search },
              }),
            },
          }))
        : (result = await this.$http({
            type: "articles",
            data: {
              size: this.size,
              page: this.page,
              query: qs.stringify({
                query: { search: this.search },
              }),
            },
          }));
      //
      // let result = await this.$http({
      //   type: "articles",
      //   data: { size: this.size, page: this.page },
      // });
      result.data.data.list = result.data.data.list.map((item) => {
        item.content = item.content.match(/>([^<>]+)</)?.[1];
        return item;
      });
      if (this.articleList.length >= result.data.data.total) {
        this.page--;
        this.finished = true;
        return;
      }
      let list = result.data.data.list;
      this.articleList.push(...list);
      this.page++;
    },
    async onRefresh() {
      this.finished = false;
      this.page = 1;
      this.articleList = [];
      await this.getArticles();
      this.onLoad();
      setTimeout(() => {
        this.refresh = false;
      }, 500);
    },
  },
};
</script>

<style lang="stylus" scoped>
.mt14 {
  margin-top: 14px;
}
</style>