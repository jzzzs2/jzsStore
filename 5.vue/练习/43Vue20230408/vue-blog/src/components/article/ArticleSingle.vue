<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-03-20 15:59:04
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-03 16:16:51
-->
<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-03-20 15:59:04
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-03-21 16:14:47
-->
<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-03-20 15:59:04
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-03-20 16:30:06
-->
<template>
  <div class="blog-article-descript-wrap">
    <div class="blog-article-descrip markdown-body">
      <h2>{{ title }}</h2>
      <ArticleInfoBar :articleInfo="articleInfo" />
      <div class="blog-img-wrap">
        <img :src="cover" alt="" />
      </div>
      <p class="blog-easyIntro" v-html="content"></p>
      <p class="blog-easyIntro blog-descrip-classify">
        <span>{{ className }}</span>
      </p>
    </div>
    <div class="blog-article-comment">
      <ArticleCommentSubmit :aid="articleInfo.id" />
      <el-card v-if="commentsLength > 0">
        <ArticleComment :comments="articleInfo.comments" />
      </el-card>
    </div>
  </div>

</template>

<script>
import ArticleComment from "@/components/article/ArticleComment";
import ArticleCommentSubmit from "@/components/article/ArticleCommentSubmit";
import ArticleInfoBar from "@/components/article/ArticleInfoBar";
export default {
  data() {
    return {
      articleInfo: {},
    };
  },
  provide () {
    return {
      getInfo: this.getInfo
    }
  },
  components: {
    ArticleInfoBar,
    ArticleComment,
    ArticleCommentSubmit,
  },
  computed: {
    commentsLength() {
      return this.articleInfo?.comments?.length || 0;
    },
    title() {
      return this.articleInfo?.title || "默认标题";
    },
    cover() {
      return this.articleInfo?.cover || "http://127.0.0.1:3000/img/miku.jpg";
    },
    content() {
      return this.articleInfo?.content || "默认内容";
    },
    className() {
      return this.articleInfo?.classify?.name || "默认分类";
    },
  },
  async created() {
    this.getInfo();
  },
  mounted() {},

  methods: {
    async getInfo() {
      let id = this.$route.params.id;
      try {
        let result = await this.$http({ type: "article", data: { id } });
        console.log(result,"文章信息");
        this.articleInfo = result.data.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="stylus">
@import "~assets/css/typo.styl"
.blog-article-descript-wrap {
  height: 55vh;
  background-color: #f1f1f1;
}

.blog-article-descrip {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  padding: 16px;
  border-radius: 6px;

  & p {
    margin-top: 20px;
  }

  & h2 {
    text-align: center;
  }

  & img {
    display: block;
    margin: 10px auto;
    width: 30%;
    height: auto;
    border-radius: 10px;
  }
}

.blog-easyIntro {
  text-indent: 2em;
  text-align: start;
}

.blog-img-wrap {
  position: relative;
}

.blog-descript-info {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.blog-descrip-classify {
  text-align: right;

  & span {
    padding: 6px;
    border: 1px solid #222;
    color: #222;
  }
}
</style>