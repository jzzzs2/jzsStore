<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-03-21 16:57:29
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-03 16:15:17
-->
<template>
  <el-card>
    <div class="blog-article-edit">
      <div class="block">
        <span class="demonstration">标题</span>
        <el-input v-model="title" placeholder="标题" ref="title"></el-input>
      </div>
      <div class="block">
        <span class="demonstration">内容</span>
        <div id="content"></div>
      </div>
      <div class="blog-article-classify">
        <div class="block">
        <span class="mr8">分类:</span>
        </div>
        <el-radio-group v-model="classifyId">
          <el-radio-button :label="item.id" v-for="(item,idx) in classifies" :key="idx">{{item.name}}</el-radio-button>
        </el-radio-group>
        
      </div>
      <div class="blog-article-edit--btn">
        <el-button type="primary" @click="submitArticle">提交</el-button>
        <el-button type="info" @click="reset">清空</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import wangEditor from "wangeditor";
import store from "store";
export default {
  props: {
    initClassifyId: {
      type: String
    }
  },
  data() {
    return {
      title: "",
      content: "",
      editor: null,
      cover: "",
      classifyId: "",
      classifyArr: []
    };
  },
  async created() {
    let result = await this.$http({type: "classify"})
    console.log(result,"result edit");
    this.classifyArr = result.data.data.list
    if (this.initClassifyId) {
      console.log("修改");
      this.classifyId = this.initClassifyId
      return
    }
    this.classifyId = this.classifyArr[0].id
  },
  computed: {
    classifies() {
      return this.classifyArr?.length>0?this.classifyArr:[]
    }
  },
  mounted() {
    console.log(this.$route.query.classifyId,"ididididiid inti");
    
    const editor = new wangEditor("#content");
    editor.config.onchange = (newHtml) => {
      this.content = newHtml;
    };
    editor.config.uploadImgServer = process.env.VUE_APP_FILE_URL;
    editor.config.uploadImgMaxSize = 20 * 1024 * 1024;
    editor.config.uploadImgAccept = ["jpg", "jpeg", "png", "gif", "bmp"];
    editor.config.uploadImgMaxLength = 5; // 一次最多上传 5 个图片
    editor.config.uploadFileName = "file";
    editor.config.focus = false;
    editor.config.uploadImgHeaders = {
      Authorization: "Bearer " + store.get(process.env.VUE_APP_FILE_KEY),
    };
    editor.create();
    this.editor = editor;
  },
  beforeDestroy() {
    // 调用销毁 API 对当前编辑器实例进行销毁
    this.editor.destroy();
    this.editor = null;
  },
  methods: {
    reset() {
      this.title = "";
      this.editor.txt.clear();
    },
    async submitArticle() {
      let result = this.validateInput();
      if (!result) {
        return;
      }
      try {
        this.cover = this.content.match(/<img src="(\S+)"/)?.[1];
        console.log(this.cover, "cover");
        console.log(localStorage.getItem("uid"), "发请求 UID");
        await this.$http({
          type: "articleAdd",
          data: {
            content: this.content,
            title: this.title,
            author: localStorage.getItem("uid"),
            cover: this.cover,
            classify: this.classifyId
          },
        });
        this.$notify.success({
          title: "成功",
          message: "添加成功",
        });
        this.$router.push("/");
        return false;
      } catch (error) {
        console.log(error);
      }
    },
    validateInput() {
      if (!this.title) {
        this.$notify.error({
          title: "错误",
          message: "标题不能为空",
        });
        this.$refs["title"].focus();
        return false;
      }
      if (!this.content) {
        this.$notify.error({
          title: "错误",
          message: "内容不能为空",
        });
        return false;
      }
      return true;
    },
  },
};
</script>

<style lang="stylus">
.blog-article-edit {
  padding: 10px;
  background-color: #fff;
}

.block {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 10px;
  margin-top: 8px;
  text-align: left;

  & span {
    width: 60px;
    padding-right: 6px;
  }
}

.blog-article-edit--btn {
  display: flex;
  justify-content: space-between;
  width: 60%;
  margin: 10px auto;

  & button {
    width: 50%;
  }
}
.blog-article-classify
  display flex
  flex-direction: column
  justify-content: flex-start
  margin-bottom: 16px
</style>