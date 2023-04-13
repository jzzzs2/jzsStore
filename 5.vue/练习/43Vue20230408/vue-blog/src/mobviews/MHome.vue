<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-03-31 15:14:52
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-07 17:01:08
-->
<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-03-31 15:14:52
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-01 16:41:07
-->
<template>
  <div>
    <component :is="type" :title="title" :btn="btnName"></component>
    <!-- <van-search
      v-model="value"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
    >
      <template #action>
        <div @click="onClickButton">搜索</div>
      </template>
    </van-search> -->
    <div class="blog-mob--content">
      <router-view></router-view>
    </div>
    <van-tabbar v-model="active" active-color="cyan" route>
      <van-tabbar-item icon="home-o" :to="{ name: 'mArticles' }"
        >主页</van-tabbar-item
      >
      <van-tabbar-item icon="search" :to="{ name: 'mClassify' }"
        >分类</van-tabbar-item
      >
      <van-tabbar-item icon="friends-o" :to="{ name: 'mUser',query: {state: isUser} }"
        >我的</van-tabbar-item
      >
    </van-tabbar>
    <MModal :type="ModalType" />
    <!-- <van-action-sheet
      v-model="isShow"
      title="评论"
      :round="false"
      cancel-text="提交"
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
    </van-action-sheet> -->
  </div>
</template>

<script>
import MModal from "@/mComponents/MModal.vue"
import MSearch from "@/mComponents/MSearch.vue";
import MNavBar from "@/mComponents/MNavBar.vue";
// import { ref } from "vue";
export default {
  components: {
    MSearch,
    MNavBar,
    MModal
  },
  // setup() {
  //   const value = ref("");
  //   const onSearch = (val) => showToast(val);
  //   const onClickButton = () => showToast(value.value);
  //   return {
  //     value,
  //     onSearch,
  //     onClickButton,
  //   };
  // },
  // setup() {
  //   const active = ref(0);
  //   return { active };
  // },
  data() {
    return {
      // value: "",
      active: "",
      type: "MSearch",
      title: "",
      btnName: "",
      ModalType: "login"
      //
      // isShow: false,
      // message: ""
    };
  },
  created() {
    this.$bus.$on("setModal",this.setModelType)
  },
  beforeDestroy() {
    this.$bus.$off("setModal",this.setModelType)
  },
  computed: {
    isUser () {
      return this.$store.state.token ? "info" : "login"
    }
  },
  mounted() {},
  watch: {
    $route(to) {
      this.type = to.meta.navType;
      this.title = to.meta?.navTitle || "默认标题";
      this.btnName = to.meta?.btn;
    },
    // isShow() {
    //   this.message = ""
    // }
  },
  methods: {
    setModelType (type) {
      this.ModalType = type
    }
    // onSearch () {
    // },
    // onClickButton () {
    // }
    // show() {
    //   this.isShow = true;
    // },
  },
  // created() {
  //   this.$bus.$on("show", this.show);
  // },
  // beforeDestroy() {
  //   this.$bus.$off("show", this.show);
  // },
};
</script>

<style lang="stylus">
.blog-mob--content {
  height: calc(100vh - 105px);
  background-color: #f0f0f0;
  overflow: hidden;
  overflow-y: auto;
}
textarea.van-field__control
  min-height: 60px
</style>