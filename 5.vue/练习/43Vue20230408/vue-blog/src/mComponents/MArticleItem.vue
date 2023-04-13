<template>
  <div>
    <van-card :thumb="info.cover">
      <template #tags>
        <van-tag class="blog-mob--right">{{info.classify.name}}</van-tag>
      </template>
      <template #desc>
        <p class="blog-mob--center blog-mob--nickname">
          {{ info.author.nickname }}
        </p>
      </template>
      <template #title>
        <h2 class="blog-mob--center blog-mob--title">{{ info.title }}</h2>
      </template>
      <!-- <template #price>
      <p class="blog-mob--center">{{info.content}}</p>
    </template> -->
      <template #num>
        <p>{{ info.createtime }}</p>
      </template>
      <template #tag>
        <div class="bgcf">
          <i class="el-icon-view"></i><span>浏览量({{ info.clicks_num }})</span>
        </div>
      </template>
    </van-card>
    <!-- <el-card class="box-card">
      <div>
        <h2>{{ info.title }}</h2>
        <p class="time">
          <span>{{ info.createtime }}</span>
        </p>
        <p>{{ info.author.nickname }}</p>
        <img :src="info.cover" alt="" width="40px" />
        <p class="blog-easyIntro">
          {{ info.content }}
        </p>
        <div class="blog-content--intro"></div>
      </div>
    </el-card> -->
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

  methods: {},
};
</script>

<style lang="stylus" scoped>
.blog-mob--center {
  text-align: left;
}

.blog-mob--title {
  font-size: 20px;
  padding: 2px;
}

.blog-mob--nickname {
  margin-top: 4px;
}
.blog-mob--right
  text-align: right
.bgcf
  background-color #fff
  border-radius 4px
</style>