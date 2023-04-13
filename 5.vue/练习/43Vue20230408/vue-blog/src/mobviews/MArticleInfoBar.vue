<template>
  <div>
    <van-card>
      <template #title>
        <h2 class="blog-mob--title">{{ title }}</h2>
      </template>
      <template #desc>
        <p class="blog-mob--title"><van-icon name="friends-o" />: {{ nickname }}</p>
      </template>
      <template #price>
        <div class="blog-mob--info">
          <p>
            <van-icon name="eye-o" dot /><span>{{ clicks_num }}</span>
          </p>
          <p>
            <van-icon name="like-o" dot /><span>{{ hits_num }}</span>
          </p>
          <p>
            <van-icon name="comment-o" dot /><span>{{ comments_num }}</span>
          </p>
        </div>
      </template>
      <template #num>
        <p>{{ createtime }}</p>
      </template>
      <template #thumb>
        <van-image width="70" height="70" around :src="cover" />
      </template>
      <!-- <template #tags>
        <van-tag plain type="primary">{{ classifyName }}</van-tag>
      </template> -->
      <template #footer>
        <van-button size="mini">{{ className }}</van-button>
      </template>
    </van-card>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    info: {
      type: Object,
    },
  },
  mounted() {},
  computed: {
    commentsLength() {
      return this.info?.comments?.length || 0;
    },
    title() {
      return this.info?.title || "默认标题";
    },
    cover() {
      return this.info?.cover || "http://127.0.0.1:3000/img/miku.jpg";
    },

    className() {
      return this.info?.classify?.name || "默认分类";
    },
    createtime() {
      return this.info?.createtime || "默认时间";
    },
    nickname() {
      return this.info?.author?.nickname || "默认昵称";
    },
    // classifyName() {
    //   return this.info?.classify.name || "默认分类";
    // },
    clicks_num() {
      return this.info?.clicks_num || 0;
    },
    comments_num() {
      return this.info?.comments_num || 0;
    },
    hits_num() {
      return this.info?.hits_num + this.step || 0;
    },
  },
  methods: {},
};
</script>

<style lang="stylus">
.blog-mob--info {
  display: flex;
  justify-content: space-around;
  align-items: center;

  & * {
    margin: 2px;
  }
}
.van-card__bottom
  text-align: left
.blog-mob--title
  text-align: left
</style>