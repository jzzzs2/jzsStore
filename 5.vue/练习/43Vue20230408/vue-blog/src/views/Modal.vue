<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-03-16 15:06:23
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-04 17:36:32
-->
<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-03-16 15:06:23
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-03-18 15:28:53
-->
<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-03-16 15:06:23
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-03-17 20:01:43
-->
<template>
  <el-dialog
    :title="title"
    :visible.sync="isShow"
    :width="width"
    :before-close="handleClose"
  >
    <Form ref="form" :type="type" />
    <span slot="footer" class="dialog-footer">
      <el-button
        :type="item.isSubmit ? 'primary' : ''"
        v-for="(item, idx) in btns"
        :key="idx"
        @click="handleAgent(item.targetName)"
        >{{ item.name }}</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import Vue from  "vue"
import router from "@/router/index"
import { io } from "socket.io-client";
import { createNamespacedHelpers } from "vuex";
let { mapState } = createNamespacedHelpers("modal");
import Form from "@/components/Form.vue";
import formDatas from "@/config/modal.config.js";
export default {
  components: {
    Form,
  },
  data() {
    return {};
  },
  computed: {
    userInfo() {
      return this.$store.userInfo || "默认nickname";
    },
    ...mapState(["type"]),
    isShow: {
      set(dataV) {
        this.$store.state.modal.isShow = dataV;
      },
      get() {
        return this.$store.state.modal.isShow;
      },
    },
    width() {
      return this.type ? formDatas[this.type].width : "";
    },
    title() {
      return this.type ? formDatas[this.type].title : "";
    },
    formData() {
      return this.type ? formDatas[this.type].formData : "";
    },
    btns() {
      return this.type ? formDatas[this.type].btns : "";
    },
  },
  mounted() {
    console.log(this.type, "mounted");
    console.log("MODEL 创建");
  },
  beforeDestroy() {
    console.log("MODAL 销毁");
  },

  methods: {
    handleClose(done) {
      done();
    },
    handleAgent(type) {
      this[type]();
    },
    confirm() {
      let form = this.$refs["form"];
      form.$refs["elForm"].validate(async (valid) => {
        if (valid) {
          let data = form["ruleForm"];
          console.log(data, "form 数据");
          try {
            let result = await this.$http({ type: this.type, data });
            if (result.data.data.token) {
              //修改状态并且获取用户信息
              await this.$store.dispatch("setToken", result.data.data.token);
              //成功登录 连接socket
              console.log(result.data.data, "dataxxx");
              let socketUser = io(process.env["VUE_APP_SOCKET_URL"], {
                transports: ["websocket"],
              });
              socketUser.on("connect", () => {
                // console.log(socketUser.testName,"test");
                Vue.prototype.$socket = socketUser
                console.log(Vue.prototype.$socket,"xxx vue socket");
                Vue.prototype.$own = false
                socketUser.emit("loginUser", {
                  nickname: result.data.data.nickname,
                  uid: result.data.data["_id"],
                });
                socketUser.on("disconnect", () => {
                  console.log("清空","quitttttttttttttt");
                  this.$bus.$emit("clearChatSocket")
                  if (Vue.prototype.$own) {
                    this.$store.dispatch("clearUser",{type: 1});
                  } else {
                    this.$store.dispatch("clearUser",{type: 0});
                  }
                  router.push("/")
                  // this.$notify({
                  //   title: "通知",
                  //   message:"其它设备已登录",
                  //   type: "warning",
                  // });
                });
              });
            }
            if (this.type === "classifyAdd") {
              console.log("触发一次提交");
              this.$bus.$emit("flashClassify");
            }
            form.$refs["elForm"].resetFields();
            this.$store.dispatch("modal/closeModal");
          } catch (error) {
            console.log(error, "error");
            let message = error?.response?.data?.message;
            this.$notify({
              title: "警告",
              message,
              type: "warning",
            });
            form.$refs["elForm"].resetFields();
          }
        } else {
          this.$notify({
            title: "警告",
            message: "表单数据不符合",
            type: "warning",
          });
        }
      });
    },
    close() {
      this.$store.dispatch("modal/closeModal");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>