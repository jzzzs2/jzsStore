<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-04-01 14:53:05
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-09 11:29:00
-->
<template>
  <div class="mblog-userInfo--wrap">
    <h2 class="mblog-userInfo--title">{{ title }}</h2>
    <div v-if="formType === 'info'">
      <van-uploader
        v-model="file"
        :preview-image="false"
        :after-read="afterRead"
      >
        <template>
          <van-image
            round
            width="100"
            height="100"
            :src="newURL ? newURL : src"
          />
        </template>
      </van-uploader>
    </div>
    <div v-else>
      <van-image
        width="100"
        height="100"
        src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
      />
    </div>
    <MDialogForm :type="formType" ref="formWrap" />
    <p @click="changeForm">{{ tips }}</p>
    <div classs="mblog-btns--wrap">
      <van-button type="primary" @click="submitMessage">{{
        btnName
      }}</van-button>
      <van-button type="warning" v-if="formType === 'info'" @click="logoutMob">登出</van-button>
    </div>
  </div>
</template>

<script>
import store from "store";
const tipsMap = {
  login: "还没注册?点我注册",
  register: "已经注册?点我登录",
  info: "",
};
const apiMap = {
  info: "infoModify",
};
const titleMap = {
  login: "登录",
  register: "注册",
  info: "个人信息",
};
const btnMap = {
  login: "登录",
  register: "注册",
  info: "修改",
};
import MDialogForm from "@/mComponents/MDialogForm";
export default {
  components: {
    MDialogForm,
  },
  data() {
    return {
      file: [],
      newURL: "",
      tipType: "",
      type: "",
    };
  },
  props: {
    state: {
      type: String,
    },
  },
  mounted() {},
  methods: {
    logoutMob() {
      this.$store.dispatch("clearUser",{type: 1})
      this.$router.push({name: "mArticles"})
    },
    changeForm() {
      (this.type || this.state) === "login"
        ? (this.type = "register")
        : (this.type = "login");
    },
    async submitMessage() {
      console.log(this.formType, "xxxx");
      if (this.formType === "login" || this.formType === "register") {
        let data = this.$refs["formWrap"].form;
        let result = await this.$http({ type: this.formType, data: data });
        console.log(result, "xxxx");
        if (result.data.data.token) {
          await this.$store.dispatch("setToken", result.data.data.token);
          this.$router.push({ name: "mArticles" });
        }
      }
      //
      if (this.formType === "info") {
        //修改
        console.log("xiu gai");
        let data = this.$refs["formWrap"].form;
        await this.$http({ type: apiMap[this.formType], data });
        this.$store.dispatch("setToken", store.get("token"));
        // let result = await this.$http({ type: "info", data });
        // console.log(result2,"22222");
        //
      }
    },
    async afterRead(file) {
      // console.log(file,"",this.file);
      this.newURL = file.content;
      try {
        let data = new FormData();
        data.append("file", file.file);
        let result = await this.$http({ type: "photo", data });
        // console.log(result, "result photo");
        this.$store.dispatch("setToken", store.get("token"));
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    tips() {
      return tipsMap[this.type || this.formType];
    },
    formType() {
      return this.type || this.state ? this.type || this.state : "info";
    },
    title() {
      return titleMap[this.type || this.formType];
    },
    btnName() {
      return btnMap[this.type || this.formType];
    },
    src() {
      return this.$store.state.userInfo.avatar
        ? this.$store.state.userInfo.avatar
        : "https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg";
    },
  },
};
</script>

<style lang="stylus" >
.mblog-userInfo--wrap {
  height: calc(100vh - 110px);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.mblog-userInfo--title {
  width: 30%;
  background-color: #fff;
  padding: 4px 10px;
}
.van-button--normal
  padding: 0px 36px
</style>