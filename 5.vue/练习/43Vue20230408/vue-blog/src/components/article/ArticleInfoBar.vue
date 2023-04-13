<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-03-25 18:13:07
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-03-31 15:03:19
-->
<template>
  <div class="blog-descript-info">
    <p class="time">
      <i class="el-icon-time"></i><span>{{ createtime }}</span>
    </p>
    <p><i class="el-icon-s-custom"></i>{{ nickname }}</p>
    <p class="visible-xs"><i class="el-icon-view"></i>{{ clicks_num }}</p>
    <p class="visible-xs">
      <i class="el-icon-s-comment"></i>{{ comments_num }}
    </p>
    <p class="visible-xs" ><i class="el-icon-star-on touch" @click="operateHits" :class="{active: isLike}"></i>{{ hits_num }}</p>
  </div>
</template>

<script>
import store from "store"
import { createNamespacedHelpers } from "vuex";
let { mapGetters,mapActions } = createNamespacedHelpers("hits");
export default {
  data() {
    return {
      // isLike: false,
      aid: "",
      step: 0
    };
  },
  
  props: {
    articleInfo: {
      type: Object
    }
  },
  created() {
    console.log("渲染了 文章内的星号");
    let aid = this.$route.params["id"]
    console.log(aid,"$route");
    this.aid = aid
    // console.log(this.is_hits(aid),"if1");
    console.log("create articleInfobar",store.get("HITS_ARTICLES"));
    if (store.get("HITS_ARTICLES") === undefined) {
      console.log("设置数组");
      store.set("HITS_ARTICLES",[])
    }
    this.setArticlePosition()
    // this.isLike = this.is_hits()(aid)
  },
  computed: {

    isLike() {
      return this.is_hits()(this.aid)
    },
    createtime() {
      return this.articleInfo?.createtime || "默认时间";
    },
    nickname() {
      return this.articleInfo?.author?.nickname || "默认昵称";
    },
    clicks_num() {
      return this.articleInfo?.clicks_num || 0;
    },
    comments_num() {
      return this.articleInfo?.comments_num || 0;
    },
    hits_num() {
      return this.articleInfo?.hits_num + this.step || 0;
    },
  },
  mounted() {
    console.log("绑定");
    this.$bus.$on("up",this.up)
    this.$bus.$on("down",this.down)
  },
  beforeDestroy() {
    console.log("解绑");
    this.$bus.$off("up",this.up)
    this.$bus.$off("down",this.down)
  },
  
  methods: {
    up () {
      console.log("触发up");
      this.step+=1
    },
    down () {
      console.log("触发down");
      this.step-=1
    },
    async operateHits () {
      let aid = this.aid
      let judge = null
      console.log("click");
      console.log(this.isLike,"this.like");
      this.isLike?this.down():this.up()
      judge = !this.isLike
      judge ?
      this.pushArticle({aid})
      :
      this.pullArticle({aid})
      //操作数据库
      let result = null;
      judge ?
      result = await this.$http({type: "likeOperate",data: {params:{isAdd: true,id: aid}}}) :
      result = await this.$http({type: "likeOperate",data: {params:{isAdd: false,id: aid}}})
      console.log(result,"xxx");
    },
    ...mapGetters(["is_hits"]),
    ...mapActions(["pushArticle","pullArticle","setArticlePosition"])
  },
};
</script>

<style lang="stylus">
  .touch
    cursor: pointer
  .active
    color cyan
    background-color #ccc
    border-radius: 50%
</style>