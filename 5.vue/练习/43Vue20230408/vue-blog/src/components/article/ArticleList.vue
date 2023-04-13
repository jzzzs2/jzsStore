<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-03-18 16:05:10
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-06 16:50:40
-->
<template>
  <div class="blog-scroll--wrap">
    <!-- <vuescroll :ops="ops" @handle-scroll="handleScroll" ref="scroll"> -->
    <el-card class="box-card" v-if="isExist">
      <Article v-for="(item, idx) in articles" :key="idx" :item="item" />
    </el-card>
    <el-card v-else>
      <div class="blog-classify-lost">
        <div class="blog-classify-wrap">
          <p>该分类还没有文章捏</p>
          <p class="touch">
            <a href="javascript:;" class="touch" @click="addArticle"
              >点我去添加</a
            >
          </p>
        </div>
      </div>
    </el-card>
    <!-- </vuescroll> -->
  </div>
</template>

<script>
import Vue from  "vue"
import router from "@/router/index"
import { io } from "socket.io-client";
import b from "@/config/http.config";
import store from "store";
let { TOKEN_NAME } = b;
import qs from "qs";
// import vuescroll from "vuescroll";
import Article from "@/components/article/Article";
// import _ from "lodash";
export default {
  name: "ArticleList",
  components: {
    Article,
    // vuescroll,
  },
  inject: ["setLoading"],
  computed: {
    isExist() {
      return this.articles?.length > 0;
    },
  },
  props: {
    loading: {
      type: Boolean,
    },
  },
  watch: {
    loading(newValue) {
      if (newValue) {
        console.log("获得新articles");
        this.getArticles();
      }
    },
    $route(to) {
      console.log(to, "totototo");
      if (to.name === "articles") {
        console.log("new ");
        this.clearData();
        this.getArticles();
      }
    },
  },
  data() {
    return {
      articles: [],
      size: 3,
      page: 1,
      search: undefined,
      // scrollTop: 0,
      // ops: {
      //   vuescroll: {},
      //   scrollPanel: {},
      //   rail: {
      //     background: "#01a99a",
      //     opacity: 0,
      //     size: "6px",
      //     specifyBorderRadius: false,
      //     gutterOfEnds: null,
      //     gutterOfSide: "2px",
      //     keepShow: false,
      //   },
      //   bar: {
      //     showDelay: 500,
      //     onlyShowBarOnScroll: true,
      //     keepShow: false,
      //     background: "cyan",
      //     opacity: 1,
      //     hoverStyle: false,
      //     specifyBorderRadius: false,
      //     minSize: 0,
      //     size: "6px",
      //     disable: false,
      //   },
      // },
    };
  },
  async created() {
    // let classifyId = this.isClassify()
    // console.log(classifyId,"classId");
    this.getArticles();
    // let result = await this.$http({type: "articles",data: {
    //     query: qs.stringify({query:{classify: classId}})
    //   }})
    //   console.log(result.data.data.list,"result xxxxx");
    // console.log(await this.$http({type: "classify"}));
    // this.getFirstArticles()
    // try {
    //   this.setLoading();
    //   let result = await this.$http({
    //     type: "articles",
    //     data: { size: this.size, page: 1 },
    //   });
    //   console.log(result, "result");
    //   result = result.data.data.list.map((item) => {
    //     // console.log(item.content.match(/>([^<>]+)</),"matched");
    //     item.content = item.content.match(/>([^<>]+)</)?.[1];
    //     return item;
    //   });
    //   this.page++;
    //   console.log(result, "created");
    //   this.articles = result;
    // } catch (error) {
    //   console.log(error);
    // }
  },
  mounted() {
    this.$bus.$on("getSearchArticle", this.getSearchArticle);
    // if (store.get(TOKEN_NAME)) {
    //   this.$http({ type: "index" })
    //     .then((result) => {
    //       console.log(result, "result222");
    //       this.$store.dispatch("setUser", {
    //         ...result.data.data,
    //         articleNum: result.articleNum,
    //         classifyNum: result.classifyNum,
    //       });
    //       let socketUser = io(process.env["VUE_APP_SOCKET_URL"], {
    //         transports: ["websocket"],
    //       });
    //       socketUser.on("connect", () => {
    //         // console.log(socketUser.testName,"test");
    //         Vue.prototype.$socket = socketUser;
    //         console.log(Vue.prototype.$socket, "xxx vue socket");
    //         Vue.prototype.$own = false;
    //         socketUser.emit("loginUser", {
    //           nickname: result.data.data.nickname,
    //           uid: result.data.data["_id"],
    //         });
    //         socketUser.on("disconnect", () => {
    //           console.log("清空", "quitttttttttttttt");
    //           this.$bus.$emit("clearChatSocket");
    //           if (Vue.prototype.$own) {
    //             this.$store.dispatch("clearUser", { type: 1 });
    //           } else {
    //             this.$store.dispatch("clearUser", { type: 0 });
    //           }

    //           router.push("/");
    //           // this.$notify({
    //           //   title: "通知",
    //           //   message:"其它设备已登录",
    //           //   type: "warning",
    //           // });
    //         });
    //       });
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // }
  },
  beforeDestroy() {
    this.$bus.$off("getSearchArticle", this.getSearchArticle);
  },
  // activated() {
  //   this.getFirstArticles()
  // },
  methods: {
    getSearchArticle(value) {
      console.log(value, "获得搜索值");
      this.clearData();
      this.search = value;
      this.getArticles(value);
    },
    addArticle() {
      this.$router.push({
        name: "Edit",
        query: {
          classifyId: this.$route.query.classifyId,
        },
      });
    },
    clearData() {
      this.articles = [];
      this.page = 1;
      this.search = undefined;
    },
    isClassify() {
      return this.$route.query["classifyId"];
    },
    // async getFirstArticles() {
    //   try {
    //     let result = await this.$http({
    //       type: "articles",
    //       data: { size: this.size, page: 1 },
    //     });
    //     console.log(result, "result");
    //     result = result.data.data.list.map((item) => {
    //       item.content = item.content.match(/>([^<>]+)</)?.[1];
    //       return item;
    //     });
    //     this.page++;
    //     console.log(result, "created");
    //     this.articles = result;
    //   } catch (error) {
    //     console.log(error);
    //   }
    // },
    async getArticles() {
      try {
        let classifyId = this.isClassify();
        // console.log(searchValue, "value");
        // query: qs.stringify({query:{classify: classId}}
        let result = classifyId
          ? await this.$http({
              type: "articles",
              data: {
                size: this.size,
                page: this.page,
                query: qs.stringify({
                  query: { classify: classifyId, search: this.search },
                }),
              },
            })
          : await this.$http({
              type: "articles",
              data: {
                size: this.size,
                page: this.page,
                query: qs.stringify({
                  query: { search: this.search },
                }),
              },
            });
        result.data.data.list = result.data.data.list.map((item) => {
          item.content = item.content.match(/>([^<>]+)</)?.[1];
          return item;
        });
        this.articles.push(...result.data.data.list);
        this.page++;
        if (this.articles.length >= result.data.data.total) {
          console.log("终止执行", result.data.data.total);
          return;
        }
        this.setLoading();
      } catch (error) {
        console.log(error);
      }
    },
  },
  // methods: {
  // handleScroll: _.throttle(async function (
  //   vertical,
  //   horizontal,
  //   nativeEvent
  // ) {
  //   if (this.loading) {
  //     return;
  //   }
  //   let sh = vertical.scrollTop;
  //   let vh = nativeEvent.srcElement.clientHeight;
  //   let allH = nativeEvent.srcElement.scrollHeight;
  //   this.scrollTop = sh;
  //   if (vh + sh + 200 > allH) {
  //     this.loading = true;
  //     console.log("加载ing");
  //     let result = await this.$http({
  //       type: "articles",
  //       data: { size: this.size, page: this.page },
  //     });
  //     console.log(result.data.data, "scrolling data");
  //     this.articles.push(...result.data.data.list);
  //     this.page++;
  //     this.loading = false;
  //     if (this.articles.length >= result.data.data.total) {
  //       console.log("终止执行");
  //       this.loading = true;
  //     }
  //   }
  // },
  // 500),
  // },
  // console.log(process.env.VUE_APP_TEST_HOST, "环境变量1");
  // console.log(process.env._TEST_NAME, "环境变量2");
  // console.log(process.env.VUE_APP_BASE_P, "环境变量3");
  // console.log(process.env.VUE_APP_FILE_UPLOAD_PATH, "环境变量4");
  // console.log(process.env.VUE_APP_TEST_HOST,"production");
  // this.$refs["scroll"].scrollTo(
  //   {
  //     y: this.top,
  //   },
  //   0
  // );
};
</script>

<style lang="stylus">
body .blog-page .blog-scroll--wrap {
  height: 60vh;
  // background-color: #9a9a9a;
}

.blog-classify-wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 400px;
  margin: auto;

  & p {
    margin: 20px;
    padding: 10px;
  }
}

.blog-classify-lost {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40vh;
  background-color: #fff;
}

.blog-classify-lost p {
  width: 66%;
  padding: 10px;
  color: #444;
  font-size: 12px;
  border: 1px solid skyblue;
  border-radius: 10px 10px;
  text-align: center;
}
</style>
