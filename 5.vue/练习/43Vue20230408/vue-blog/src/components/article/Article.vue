<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-03-18 16:04:37
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-03-21 16:11:01
-->
<template>
  <div class="blog-content--blogs">
    <el-card class="box-card">
      <div @click="jumpToAricle" class="touchArea">
        <h2>{{ item.title }}</h2>
        <p class="time">
          <i class="glyphicon glyphicon-heart-empty"></i
          ><span>{{ item.createtime }}</span>
        </p>
        <p>{{ item.author.nickname }}</p>
        <img :src="item.cover" alt="" />
        <p class="blog-easyIntro">
          {{ item.content }}
        </p>
        <div class="blog-content--intro">
          <div class="blog-content--tags"></div>
          <div class="blog-content--interact">
            <span class="like">浏览量({{ item.clicks_num }})</span>
            <span class="like">点赞({{ item.hits_num }})</span>
            <span class="comment">评论({{ item.comments_num }})</span>
          </div>
        </div>
      </div>
    </el-card>
    
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {};
  },
  props: {
    item: {
      type: Object,
    },
  },
  computed: {
    
  },
  mounted() {},

  methods: {
    jumpToAricle() {
      this.$router.push({
        name: "singleArticle",
        params: {
          id: this.item.id,
        },
      });
    },
  },
};
</script>

<style lang="stylus">
@import '~assets/css/variable.styl';

.blog-content--blogs {
  width: 90%;
  margin: auto;
  text-align: center;
  background-color: bgc-normal;
  margin-bottom: pad-normal * 3;

  & .box-card {
    background-color: bgc-normal;
  }

  & p {
    margin: 0 0 8px 0;
  }
}

.blog-content--blogs h2 {
  padding: pad-normal * 2 0;
}

.blog-content--blogs .time span {
  padding-left: 2px;
}

.blog-content--blogs img {
  height: 230px;
  width: auto;
  border-radius: 0;
}

.blog-content--blogs .blog-easyIntro {
  box-sizing: border-box;
  padding: 0 pad-normal * 2;
  text-indent: 2em;
  text-align: left;
}

.blog-content--intro {
  box-sizing: border-box;
  padding: 0 pad-normal;
  display: flex;
  justify-content: space-between;
}

.touchArea {
  cursor: pointer;
}
.blog-article-comment {
  box-sizing: border-box
  width: 100%;
  background-color: bgc-normal;
  padding: 40px;
  margin: 0 auto
  margin-top: 10px;
}
</style>