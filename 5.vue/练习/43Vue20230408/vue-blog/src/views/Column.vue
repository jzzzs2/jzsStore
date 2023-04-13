<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-03-22 17:10:09
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-03-28 09:50:20
-->
<template>
  <div class="word-classify">
    <wordcloud
      :data="defaultWords"
      nameKey="name"
      valueKey="value"
      :color="myColors"
      :showTooltip="false"
      :wordClick="wordClickHandler"
      spiral="rectangular"
      :wordPadding="6"
      :fontSize="[50, 60]"
    >
    </wordcloud>
  </div>
</template>

<script>
import wordcloud from "vue-wordcloud";
export default {
  components: {
    wordcloud,
  },
  async created() {
    this.getClassifies();
  },
  data() {
    return {
      myColors: ["#1f77b4", "#629fc9", "#94bedb", "#c9e0ef"],
      defaultWords: [],
    };
  },
  mounted() {
    // window.onunload = function () {
    //   localStorage.setItem("leave","likai")
    // }
    this.$bus.$on("flashClassify",this.getClassifies)
  },
  beforeDestroy() {
    this.$bus.$off("flashClassify",this.getClassifies)
  },
  
  methods: {
    async getClassifies() {
      let result = await this.$http({ type: "classify" });
      console.log(result, "result edit");
      this.defaultWords = result.data.data.list.map((item) => {
        return {
          name: item.name + " " + item.articles.length,
          value: item.articles.length,
          classifyId: item.id,
        };
      });
    },
    async wordClickHandler(name) {
      //分类名 文章数量  vm
      // console.log('wordClickHandler', name, value, vm);
      //   let result = await Http({
      //   type: "articles", data: {
      //     query: qs.stringify({ classify: columnId, search })
      //   }
      // })
      let classId = this.getClassifyId(name);
      // console.log(classId);
      this.$router.push({ name: "Home", query: { classifyId: classId } });
    },
    getClassifyId(name) {
      return this.defaultWords.find((item) => {
        return item.name === name;
      })["classifyId"];
    },
  },
};
</script>

<style lang="stylus">
.word-classify {
  background-color: #f4e4e4;
  border-radius: 14px;

  & * {
    user-select: none;
    cursor: pointer;
  }
}
</style>