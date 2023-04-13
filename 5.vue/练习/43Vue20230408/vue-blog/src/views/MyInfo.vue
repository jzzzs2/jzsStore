<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-03-24 20:33:48
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-08 20:30:05
-->
<template>
  <el-card>
    <div class="blog-info--wrap">
      <h2>我的信息</h2>
      <Form :type="type" ref="form" />
      <div class="divide">
        <el-button type="success" plain @click="submitForm">提交</el-button>
        <el-button type="info" plain @click="resetForm">重置</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import Form from "@/components/Form.vue";
import store from "store"
export default {
  components: {
    Form,
  },
  data() {
    return {
      type: "info",
    };
  },

  mounted() {},

  methods: {
    async resetForm() {
      this.type = ""
      this.$nextTick(function () {
        this.type = "info";
      });
    },
    async submitForm() {
      try {
        let data = this.$refs["form"]["ruleForm"];
        await this.$http({ type: "infoModify", data });
        this.$notify({
          title: "成功",
          message: "修改成功",
          type: "success",
        });
        this.$store.dispatch("setToken",store.get("token"))
        this.$router.push("/");
      } catch (error) {
        this.$notify({
          title: "失败",
          message: error.message,
          type: "error",
        });
      }
      // console.log(data);
    },
  },
};
</script>

<style lang="stylus" scoped>
h2 {
  margin: 10px;
}

.blog-info--wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  height: 40vh;
}
.divide
  display: flex
  justify-content: space-evenly
  align-items: center
</style>