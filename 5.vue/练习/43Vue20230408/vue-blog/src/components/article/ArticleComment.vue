<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-03-20 16:43:14
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-03-20 16:51:13
-->
<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-03-20 16:43:14
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-03-20 16:44:25
-->
<template>
  <div class="blog-article-comment-list">
    <h3>评论列表</h3>
    <ul>
      <!-- {{#each comments}} -->
      <ArticleCommentSingle v-for="item in comments" :key="item.id" :articleObj="item" />
      <!-- {{/each}} -->
    </ul>
  </div>
</template>

<script>
import ArticleCommentSingle from "@/components/article/ArticleCommentSingle"
export default {
  components: {
    ArticleCommentSingle
  },
  props: {
    comments: {
      type: Array
    }
  },
  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="stylus">




.blog-comment-user {
  padding: 10px 10px;

  & img {
    vertical-align: bottom;
  }
}

.blog-article-comment-list {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px 10px;

  & li {
    padding: 20px;
    margin-top: 10px;
  }

  & img {
    height: 30px;
    width: 30px;
    border-radius: 5px;
    margin-left: 10px;
  }

  & h3 {
    text-align: left;
  }
}

.blog-comment-content {
  padding: 10px 10px;
}

.blog-comment-date {
  padding: 10px 10px;

  & p {
    text-align: right;
  }
}

.line-row-top::before {
  content: '';
  display: block;
  width: 100%;
  height: 1px;
  transform: scaleY(0.5) translateY(-10px);
  background-color: #222;
}



</style>