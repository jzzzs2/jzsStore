<template>
  <div class="w100">
    <h3 class="myComment">我的评论</h3>
    <div class="blog-article-comment-area">
      <textarea
        name="atticleComment"
        id=""
        placeholder="请输入评论"
        v-model="content"
        ref="commentArea"
      ></textarea>
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: "",
    };
  },
  inject: ["getInfo"],
  props: {
    aid: {
      type: String,
    },
  },
  mounted() {
    this.$bus.$on("operateFocus",this.focuOperate)
  },
  beforeDestroy() {
    this.$bus.$off("operateFocus",this.focuOperate)
  },
  
  methods: {
    focuOperate() {
      // console.log(this,"this");
      this.$refs["commentArea"].focus()
    },
    async submit() {
      try {
        console.log(this.aid);
        await this.$http({
          type: "commentAdd",
          data: {
            content: this.content,
            articleId: this.aid,
            uid: localStorage.getItem("uid").match(/(\d\w+)/)[1],
          },
        });
        this.getInfo()
        this.content = "";
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="stylus">
.w100 {
  width: 100%;
  box-shadow: 0 0 8px #222;
  padding: 4px;
  margin-bottom: 20px;
}

h3.myComment {
  text-align: left;
}

.blog-article-comment-area {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  height: 130px;
  margin: 0 auto;
  margin-bottom: 10px;

  & textarea {
    width: 100%;
    resize: none;
  }

  & input {
    width: 100%;
  }

  & h3 {
    text-align: left;
  }
}
</style>