<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-04-04 16:07:17
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-07 17:57:08
-->
<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-04-04 16:07:17
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-04 16:16:19
-->
<template>
  <div>
    <van-dialog
      v-model="isShow"
      :title="title"
      show-cancel-button
      :beforeClose="beforeClose"
    >
      
      <MDialogForm :type="type" ref="formWrap" />
      <van-tag style="display:block;text-align:right;" text-color="green" @click="register" class="mblog-btn-regis">注册</van-tag>
      <!-- <van-form>
        <van-cell-group inset>
          <van-field
            v-model="form.username"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="form.password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </van-cell-group>
      </van-form> -->
    </van-dialog>
  </div>
</template>

<script>
import Vue from "vue";
import { io } from "socket.io-client";
import MDialogForm from "@/mComponents/MDialogForm.vue";
import formDatas from "@/config/modal.config.js";
// import InputDatas from "@/config/formDatas.js";
export default {
  components: {
    MDialogForm,
  },
  data() {
    return {
      isShow: false,
    };
  },
  props: {
    type: {
      type: String,
    },
  },
  computed: {
    // inputs () {
    //   return InputDatas?.[this.type]
    // },
    title() {
      return this.type ? formDatas[this.type].title : "";
    },
    formData() {
      return this.type ? formDatas[this.type].formData : "";
    },
  },
  created() {
    this.$bus.$on("setDialogShow", this.setShow);
  },
  beforeDestroy() {
    this.$bus.$off("setDialogShow", this.setShow);
  },

  mounted() {},

  methods: {
    register () {
      this.isShow = false
      this.$router.push({name: "mUser",query: {state: "register"}})
    },
    setShow() {
      this.isShow = true;
    },
    async beforeClose(action, done) {
      console.log(action, "action");
      console.log("提交");
      if (action === "confirm") {
        let formData = this.$refs["formWrap"].form;
        let form = this.$refs["formWrap"].$refs["form"];
        form
          .validate()
          .then(async () => {
            try {
              let result = await this.$http({
                type: this.type,
                data: formData,
              });
              done();
              if (result.data.data.token) {
                await this.$store.dispatch("setToken", result.data.data.token);
                let socketUser = io(process.env["VUE_APP_SOCKET_URL"], {
                  transports: ["websocket"],
                });
                socketUser.on("connect", () => {
                  Vue.prototype.$socket = socketUser;
                  console.log(Vue.prototype.$socket, "xxx vue socket");
                  Vue.prototype.$own = false;
                  socketUser.emit("loginUser", {
                    nickname: result.data.data.nickname,
                    uid: result.data.data["_id"],
                  });
                  socketUser.on("disconnect", () => {
                    this.$bus.$emit("clearChatSocket");
                    if (Vue.prototype.$own) {
                      this.$store.dispatch("clearUser", { type: 1 });
                    } else {
                      this.$store.dispatch("clearUser", { type: 0 });
                    }
                    router.push("/m");
                  });
                });
              }
              if (this.type === "classifyAdd") {
                console.log("触发一次提交");
                this.$bus.$emit("flashClassify");
              }
              form.resetValidation();
              this.$store.dispatch("modal/closeModal");
            } catch (error) {
              // console.log(error, "error");
              console.log("清除表单捏");
              this.$refs["formWrap"].form = {};
              form.resetValidation();
              done(false);
              let message = error?.response?.data?.message;
              this.$notify({
                title: "警告",
                message,
                type: "warning",
              });
              form.resetValidation();
            }
          })
          .catch((err) => {
            done(false);
          });
      } else {
        done();
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
.mblog-btn-regis
  background-color:#fff
</style>