<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-03-28 16:09:45
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-03-30 17:54:50
-->
<template>
  <div class="blog-room--wrap">
    
      <div class="blog-room--content">
        <vuescroll :ops="ops">
        <div class="blog-room--info" v-for="(item, idx) in infoList" :key="idx">
          <div class="blog-room--info--wrap" :class="item.type">
            <span class="userClass" v-if="item?.type !== 'action'">{{
              item?.type === "action" ? "" : item?.nickname
            }}</span>
            <div :class="{ 'blog-info--offset': item?.type !== 'action' }">
              <p class="left" :class="{ mtb20: item?.type === 'action' }">
                {{ item?.msg }}
              </p>
              <span class="fz12">{{ item?.time }}</span>
            </div>
          </div>
        </div>
        </vuescroll>
      </div>
      <div class="blog-room--input">
        <el-input v-model="content" placeholder="请输入内容"></el-input>
        <el-button type="primary" @click="send">发送</el-button>
      </div>
      <!--  -->
      <el-dialog title="注册昵称" :visible="!isName" width="30%">
        <el-input v-model="nameContent" placeholder="昵称"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitName">提交</el-button>
        </span>
        
      </el-dialog>
    
  </div>
</template>

<script>
import vuescroll from "vuescroll";
import Vue from "vue";
import { io } from "socket.io-client";
export default {
  components: {
    vuescroll,
  },
  data() {
    return {
      content: "",
      infoList: [],
      socket: null,
      nickName: "",
      isName: false,
      nameContent: "",
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
        bar: {},
      },
    };
  },
  created() {
    this.$store.state.direction = "right";
    let socket = io(process.env["VUE_APP_SOCKET_URL"], {
      transports: ["websocket"],
    });
    console.log(socket, "socket");
    this.socket = socket;
    let name = this.$store.state.userInfo?.nickname;
    console.log(name, "name xxxx");
    name ? (this.nickName = name) : (this.nickName = "");
    name ? (this.isName = true) : (this.isName = false);
    if (name) {
      this.socket.emit("login", { nickname: name, type: "action" });
    }
    socket.on("connect", () => {
      console.log("socket", "客户端连接建立");
      socket.on("enter", (obj) => {
        if (obj.error) {
          Vue.prototype.$notify({
            title: "警告",
            message: "昵称重复",
            type: "warning",
          });
          return;
        }
        if (obj.user === "me") {
          this.isName = true;
          this.nickName = obj.nickname;
        }
        // console.log(obj, "enter");
        this.infoList.push(obj);
      });
      socket.on("leave", (obj) => {
        this.infoList.push(obj);
        console.log(obj, "leave");
      });
      socket.on("receive", (obj) => {
        this.infoList.push(obj);
        console.log(obj, "obj");
      });
    });
  },
  beforeDestroy() {
    this.socket.close();
  },

  mounted() {
    this.$bus.$on("clearChatSocket", this.clearSocket);
  },
  methods: {
    clearSocket() {
      this.socket.close();
    },
    send() {
      this.socket.emit("chat", { msg: this.content, nickname: this.nickName });
      this.content = "";
    },
    submitName() {
      this.socket.emit("login", { nickname: this.nameContent });
    },
  },
};
</script>

<style lang="stylus" scoped>
.blog-room--wrap
  // height: 50vh

.blog-room--content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 60vh;
  // overflow-x: hidden;
  // overflow-y: auto;
  background-color: #fff;
  padding-bottom: 40px
}

.blog-room--info {
  // height: 50vh;
  margin: 10px 0px 5px;
}

.blog-room--info--wrap {
  display: flex;
  justify-content: center;
  align-items: center;

  & * {
    margin: 2px 6px;
  }

  & p {
    border-radius: 6px;
    background-color: #fff;
    border: 1px solid #ccc;
    background-color: cyan;
  }
}


.blog-room--info--wrap.left {
  align-items: center;
  justify-content: flex-start;

  & p {
    border-radius: 6px;
    background-color: pink;
    border: 1px solid #ccc;
  }
}

.blog-room--info--wrap.right {
  flex-direction: row-reverse;
  justify-content: flex-start;
  align-items: center;

  & p {
    border-radius: 6px;
    background-color: skyblue;
    border: 1px solid #ccc;
  }
}

.userClass {
  width: 40px;
  height: 20px;
  border-radius: 10px 6px;
  color: pink;
  font-size: 20px;
  background-color: #eee;
}

.fz12 {
  font-size: 12px;
}

.blog-room--input {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px
}

.blog-info--offset {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  border-radius: 20px;
  border: 1px solid pink;
  position: relative;
  top: 12px;
  padding: 2px;
}
</style>
