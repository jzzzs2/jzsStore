<template>
    <li>
      <div class="blog-comment-user line-row-top">
        <i class="el-icon-s-custom"></i>:<img
          :src="avatar"
          alt=""
        /><span>{{ username }}</span>
      </div>
      <div class="blog-comment-content">
        {{ articleObj.content }}
      </div>
      <div class="blog-comment-date line-row-bt">
        <p>{{ articleObj.createtime }}</p>
      </div>
    </li>
</template>

<script>
export default {
  props: {
    articleObj: {
      type: Object
    }
  },
  data() {
    return {};
  },
  computed: {
    avatar () {
      return this.articleObj?.uid?.avatar.replace("/public","") || "http://127.0.0.1:3000/img/miku.jpg"
    },
    username () {
      return this.articleObj?.uid?.username || "默认用户名"
    }
  },
  mounted() {},

  methods: {},
};
</script>

<style lang="stylus">
.el-icon-s-custom
  font-size 20px
.blog-comment-user
  text-align: start
.blog-comment-content {
  text-align: start
}
.line-row-bt::after {
  content: '';
  display: block;
  width: 100%;
  height: 1px;
  transform: scaleY(0.5);
  background-color: #222;
}

.line-column::after {
  content: '';
  display: block;
  width: 1px;
  height: 100%;
  transform: scaleX(0.5);
  background-color: #222;
}
</style>