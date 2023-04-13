<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-03-21 16:27:39
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-03-28 16:52:36
-->
<template>
  <div
    class="blog-route-operate"
    @click="jumpToOperate"
    :class="{ active: isActive && info.type === 'star' }"
  >
    <i :class="info.icon"></i>
  </div>
</template>

<script>
import mixin from "@/config/mixin.config.js";
import { createNamespacedHelpers } from "vuex";
let { mapGetters, mapActions } = createNamespacedHelpers("hits");
export default {
  mixins: [mixin],
  props: {
    info: {
      type: Object,
      aid: ""
    },
  },
  data() {
    return {
      // isActive: false,
    };
  },
  computed: {
    isActive:{
      get() {
        return this.is_hits()?.(this.aid)
      },
    }
  },
  created() {
    let aid = this.$route.params?.id;
    this.aid = aid
    this.setArticlePosition();
    // this.isActive = this.is_hits()(aid);
  },
  mounted() {
    // console.log("操作栏渲染完毕");
    // this.$bus.$on("up",this.up)
    // this.$bus.$on("down",this.down)
  },

  methods: {
    ...mapActions(["pushArticle", "pullArticle", "setArticlePosition"]),
    ...mapGetters(["is_hits"]),
    handleComment() {
      this.$bus.$emit("operateFocus");
    },
    async jumpToOperate() {
      if (this.info.type === "star") {
        //进行点赞操作
        console.log(this.isActive,"isActive");
        this.isActive?this.$bus.$emit("down"):this.$bus.$emit("up")
        let judge = !this.isActive
        let aid = this.aid;
        console.log("click");
        // this.isActive?this.step-=1:this.step+=1
        judge ? this.pushArticle({ aid }) : this.pullArticle({ aid });
        //操作数据库
        let result = null;
        judge
          ? (result = await this.$http({
              type: "likeOperate",
              data: { params: { isAdd: true, id: aid } },
            }))
          : (result = await this.$http({
              type: "likeOperate",
              data: { params: { isAdd: false, id: aid } },
            }));
        console.log(result, "xxx");
        console.log("点赞");
        return;
      }
      if (this.info.callModel) {
        //召唤mixin
        this.showModal(this.info.callModel);
        return;
      }
      if (this.info.name) {
        console.log(this.info.name, "name");
        this[this.info.name]();
      }
      if (!this.info.route) {
        return false;
      }
      this.$router.push(this.info.route);
    },
  },
};
</script>

<style lang="stylus" scoped>
.blog-route-operate {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  background-color: #fff;
  border: 1px solid #ccc;
  margin-top: 10px;
  cursor: pointer;

  & i {
    font-size: 20px;
  }
}

.active {
  background-color: cyan;
  color: #fff;
  border: none;
}
</style>