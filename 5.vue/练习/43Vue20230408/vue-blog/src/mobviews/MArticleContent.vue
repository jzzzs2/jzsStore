<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-04-01 14:49:02
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-04 18:24:29
-->
<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-04-01 14:49:02
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-04 18:09:52
-->
<template>
  <div>
    <div class="markdown-body">
      <!-- <ArticleInfoBar :articleInfo="articleInfo" /> -->
      <MArticleInfoBar :info="articleInfo" />
      <p class="blog-easyIntro" v-html="content"></p>
      <h2 class="mblog-comment--title">评论区</h2>
      <div v-if="isComments" >
        <div v-for="item in comments" :key="item.id" class="mblog-comment--item">
          <van-cell-group>
            
            <van-cell :title="item?.uid?.nickname" :value="item?.content"></van-cell>
            <van-cell :value="item?.createtime" />
          </van-cell-group>
        </div>
      </div>
      <div v-else>
        <van-empty description="没有评论捏" />
      </div>
    </div>
    <van-action-sheet
      v-model="isShow"
      title="评论"
      :round="false"
      cancel-text="提交"
      @cancel="submitComment"
    >
      <van-cell-group inset>
        <van-field
          v-model="message"
          rows="1"
          autosize
          label="内容"
          type="textarea"
          placeholder="请输入内容"
          show-word-limit
          maxlength="50"
        />
      </van-cell-group>
    </van-action-sheet>
  </div>
</template>

<script>
import { Notify } from 'vant';
import MArticleInfoBar from "@/mobviews/MArticleInfoBar";
export default {
  components: {
    MArticleInfoBar,
  },
  data() {
    return {
      articleInfo: {},
      isShow: false,
      message: "",
    };
  },
  watch: {
    isShow() {
      this.message = "";
    },
  },
  // methods: {
  //   show() {
  //     console.log("触发展示框");
  //     this.isShow = true;
  //   },
  // },
  // created() {
  //   this.$bus.$on("show", this.show);
  // },
  beforeDestroy() {
    this.$bus.$off("show", this.show);
  },
  computed: {
    isComments() {
      return this.articleInfo?.comments?.length > 0;
    },
    comments() {
      return this.articleInfo?.comments;
    },
    // commentsLength() {
    //   return this.articleInfo?.comments?.length || 0;
    // },
    // title() {
    //   return this.articleInfo?.title || "默认标题";
    // },
    // cover() {
    //   return this.articleInfo?.cover || "http://127.0.0.1:3000/img/miku.jpg";
    // },

    // className() {
    //   return this.articleInfo?.classify?.name || "默认分类";
    // },
    content() {
      return this.articleInfo?.content || "默认内容";
    },
  },
  mounted() {},
  async created() {
    this.getInfo();
    this.$bus.$on("show", this.show);
  },
  methods: {
    async submitComment() {
      console.log("submit");
      try {
        await this.$http({
          type: "commentAdd",
          data: {
            content: this.message,
            articleId: this.articleInfo?._id,
            uid: localStorage.getItem("uid").match(/(\d\w+)/)[1],
          },
        });
        console.log("添加cgong");
        Notify({ type: 'success', message: '评论成功' });
        this.message = "";
      } catch (error) {
        console.log(error);
      }
    },
    async getInfo() {
      let id = this.$route.params.id;
      try {
        let result = await this.$http({ type: "article", data: { id } });
        console.log(result, "文章信息");
        this.articleInfo = result.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    show() {
      console.log("触发展示框");
      this.isShow = true;
    },
  },
};
</script>

<style lang="stylus" scoped>
.markdown-body .blog-easyIntro pre {
  white-space: pre-wrap;
}

.mblog-comment--title {
  font-size: 1.5rem;
}

.mblog-comment--item {
  margin-top: 12px;
  border-bottom: 4px solid #eaeaea
}
.van-cell
  text-align: left
.van-cell__value
  text-align: left
</style>
