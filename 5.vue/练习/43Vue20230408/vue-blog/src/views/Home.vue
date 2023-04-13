<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-03-15 15:37:19
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-09 17:49:25
-->
<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-03-15 15:37:19
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-03-17 21:43:55
-->
<template>
  <div class="blog-page">
    <el-container class="blog-wrap">
      <el-header height="10vh" class="blog-header">
        <Header />
      </el-header>
      <el-container class="blog-content-wrap">
        <div class="limit">
          <el-row :gutter="6">
            <el-col :span="2" class="hidden-xs-only">
              <!-- <transition-group appear enter-active-class="animate__animated animate__swing" leave-active-class="animate__animated animate__backOutDown" mode="out-in" move-class="move"> -->
              <transition-group appear name="operate" mode="out-in">
                <OperateBar
                  v-for="item in list"
                  :key="item.icon"
                  :info="item"
                />
              </transition-group>
            </el-col>
            <el-col :span="22" :md="{ span: 16 }">
              <el-main class="blog-content--main">
                <vuescroll
                  :ops="ops"
                  @handle-scroll="handleScroll"
                  ref="scroll"
                >
                  <!-- <keep-alive include="ArticleList"> -->
                  <transition appear enter-active-class="animate__animated animate__fadeInDown" leave-active-class="animate__animated animate__fadeOutDown" mode="out-in">
                    <router-view :loading="loading"></router-view>
                  </transition>
                  <!-- </keep-alive> -->
                </vuescroll>
              </el-main>
            </el-col>
            <el-col :span="6" class="hidden-md-and-down">
              <el-aside class="blog-content--aside">
                <Aside v-if="isUserExist" />
              </el-aside>
            </el-col>
          </el-row>
        </div>
      </el-container>
      <el-footer height="10vh" class="blog-footer">底部</el-footer>
    </el-container>
    <Modal />
    <Live2d />
  </div>
</template>

<script>
import Vue from "vue";
import router from "@/router/index";
import { io } from "socket.io-client";
import b from "@/config/http.config";
import store from "store";
let { TOKEN_NAME } = b;
// @ is an alias to /src
// import b from "@/config/http.config";
// import store from "store";
import OperateBar from "@/components/article/OperateBar.vue";
// let { TOKEN_NAME } = b;
import Modal from "./Modal.vue";
import Live2d from "./Live2D.vue";
import Header from "@/components/header/Header.vue";
import Aside from "@/components/aside/AsideUserInfo";
import {throttle} from "lodash";
import vuescroll from "vuescroll";
import routeMap from "@/config/routeOperateMap.js";
export default {
  name: "Home",
  watch: {
    $route(to) {
      if (!routeMap[to.name]) {
        this.list = []
        return false;
      }
      this.list = routeMap[to.name];
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      ops: {
        vuescroll: {},
        scrollPanel: {},
        rail: {
          background: "#01a99a",
          opacity: 0,
          size: "6px",
          specifyBorderRadius: false,
          gutterOfEnds: null,
          gutterOfSide: "2px",
          keepShow: false,
        },
        bar: {
          showDelay: 500,
          onlyShowBarOnScroll: true,
          keepShow: false,
          background: "cyan",
          opacity: 1,
          hoverStyle: false,
          specifyBorderRadius: false,
          minSize: 0,
          size: "6px",
          disable: false,
        },
      },
    };
  },
  methods: {
    setLoading() {
      this.loading = false;
    },
    handleScroll: throttle(async function (
      vertical,
      horizontal,
      nativeEvent
    ) {
      if (this.loading) {
        return;
      }
      let sh = vertical.scrollTop;
      let vh = nativeEvent.srcElement.clientHeight;
      let allH = nativeEvent.srcElement.scrollHeight;
      this.scrollTop = sh;
      if (vh + sh + 200 > allH) {
        this.loading = true;
        console.log("加载新articles Home");
      }
    },
    500),
  },
  provide() {
    return {
      setLoading: this.setLoading,
    };
  },
  computed: {
    isUserExist() {
      return this.$store.state.token;
    },
  },
  created() {
    // setTimeout(function () {
    //   window.L2Dwidget.init({
    //     pluginRootPath: "static/live2dw/",
    //     pluginJsPath: "lib/",
    //     pluginModelPath: "live2d-widget-model-z16/assets/",
    //     tagMode: false,
    //     debug: false,
    //     model: {
    //       jsonPath: "../static/live2dw/live2d-widget-model-z16/assets/z16.model.json"
    //     },
    //     display: {
    //       position: "right",
    //       width: 300,
    //       height: 450
    //     }
    //   })
    // },1000)
  },
  mounted() {
    console.log("home xaunran!!");
    //
    if (store.get(TOKEN_NAME)) {
      this.$http({ type: "index" })
        .then((result) => {
          console.log(result, "result222");
          this.$store.dispatch("setUser", {
            ...result.data.data,
            articleNum: result.articleNum,
            classifyNum: result.classifyNum,
          });
          let socketUser = io(process.env["VUE_APP_SOCKET_URL"], {
            transports: ["websocket"],
          });
          socketUser.on("connect", () => {
            // console.log(socketUser.testName,"test");
            Vue.prototype.$socket = socketUser;
            console.log(Vue.prototype.$socket, "xxx vue socket");
            Vue.prototype.$own = false;
            socketUser.emit("loginUser", {
              nickname: result.data.data.nickname,
              uid: result.data.data["_id"],
            });
            socketUser.on("disconnect", () => {
              console.log("清空", "quitttttttttttttt");
              this.$bus.$emit("clearChatSocket");
              if (Vue.prototype.$own) {
                this.$store.dispatch("clearUser", { type: 1 });
              } else {
                this.$store.dispatch("clearUser", { type: 0 });
              }

              router.push("/");
              // this.$notify({
              //   title: "通知",
              //   message:"其它设备已登录",
              //   type: "warning",
              // });
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
    //
    let isMob = navigator.userAgent.match(
      /(Android|iPhone|iPad|iPod|BlackBerry|webOS|Windows Phone|SymbianOS|IEMobile|Opera Mini|Mobile)/
    );

    console.log(isMob, "Mob");
    if (isMob) {
      this.$router.push("/m");
    }
    // window.onload = function () {
    //   console.log("加载 onload");
    // }
    // if (store.get(TOKEN_NAME)) {
    //   this.$http({ type: "index" })
    //     .then((result) => {
    //       console.log(result, "result222");
    //       this.$store.dispatch("setUser", {
    //         ...result.data.data,
    //         articleNum: result.articleNum,
    //         classifyNum: result.classifyNum,
    //       });
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // }
    //
    console.log("HOME 渲染了");
    if (routeMap[this.$route.name]) {
      this.list = routeMap[this.$route.name];
    }
  },
  components: {
    Modal,
    Header,
    Aside,
    vuescroll,
    OperateBar,
    Live2d,
  },
};
</script>
<style lang="stylus">
@import '~@/assets/css/variable.styl';

.operate-enter {
  transform: translateY(1100px);
}

.operate-enter-active, .operate-leave-active {
  transition: 0.5s;
}

.operate-leave-to {
  transform: translateY(-400px);
}

.blog-content-wrap {
  height: 80vh;
  width: 100%;
  margin: 0 auto;
  background-color: page-main-color;

  & .el-row {
    width: 100%;
  }

  & .limit {
    width: 70%;
    // min-width: 1400px;
    margin: 0 auto;
  }
}

.blog-content--main {
  margin-top: 80px;
  height: 60vh;
}

.blog-footer {
  background-color: #222;
}

.blog-header {
  background-color: #999;
  padding: 0;
}

.blog-header--row {
  height: 100%;
  align-items: center;
}

.blog-page .blog-content-wrap .blog-content--aside {
  margin: 100px auto;
  width: 80% !important;
}

.el-main.blog-content--main {
  overflow: hidden;
}

.move {
  transition: 0.5s;
}
</style>
