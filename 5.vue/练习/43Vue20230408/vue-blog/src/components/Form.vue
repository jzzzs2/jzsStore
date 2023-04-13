<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-03-16 16:53:49
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-03-25 11:03:45
-->
<template>
  <div>
    <el-form ref="elForm" :model="ruleForm" label-width="90px" :rules="rules">
      <el-form-item
        :label="item.label"
        v-for="item in formInputs"
        :key="item.query"
        :prop="item.query"
        :roles="rules[item?.query]"
      >
        <el-upload
          v-if="item.type === 'avatar'"
          class="avatar-uploader"
          action="http://127.0.0.1:3000/upload/user"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :headers="{ Authorization: `Bearer ${$store.state.token}` }"
          
        >
          <el-image
            v-if="ruleForm[item?.query]" :src="ruleForm[item?.query]" class="avatar"
            style="width: 50px; height: 50px"
            fit="fit"
          ></el-image>
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-input
          v-model="ruleForm[item?.query]"
          :readonly="item.readOnly"
          :type="item.type"
          v-else
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import formInput from "@/config/formDatas.js";
import rulesMap from "@/config/formValidate.js";
export default {
  data() {
    return {
      ruleForm: {},
      imageUrl: "",
    };
  },
  computed: {
    formInputs() {
      return formInput[this.type];
    },
    rules() {
      return rulesMap[this.type];
    },
  },
  watch: {
    type: function () {
      this.clearForm();
    },
  },
  props: {
    type: {
      type: String,
    },
  },
  created() {
    if (this.$route.name == "myInfo") {
      console.log("对数据进行处理");
      console.log(this.formInputs);
      let sourceData = this.$store.state.userInfo;
      console.log(sourceData, "source");
      let finalArr = 
        Object.entries(sourceData).filter(([key]) => {
          return (
            (this.formInputs.find((item) => {
              console.log(item.query,key,"test");
              return item.query === key
            })!== undefined) 
          );
        })
      ;
      console.log(finalArr,"Arr");
      let finalObj = Object.fromEntries(finalArr)
      console.log(finalObj, "finalObj");
      this.ruleForm = finalObj
    }
  },
  mounted() {
    // console.log(this.type,"mounted");
  },

  methods: {
    clearForm() {
      this.$refs["elForm"].resetFields();
    },
    handleAvatarSuccess(res) {
      console.log(res.data);
      this.ruleForm.avatar = res.data
      // this.imageUrl = res.data;
      // this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      console.log(file);
      if (file.size > 20 * 1024 * 1024) {
        this.$notify({
          title: '警告',
          message: '文件过大',
          type: 'warning'
        });
        return false
      }
      if (!/image/.test(file.type)) {
        console.log("type file");
        this.$notify({
          title: '警告',
          message: '文件类型不对',
          type: 'warning'
        });
        return false
      }
      return true
      // const isJPG = file.type === "image/jpeg";
      // const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error("上传头像图片只能是 JPG 格式!");
      // }
      // if (!isLt2M) {
      //   this.$message.error("上传头像图片大小不能超过 2MB!");
      // }
      // return isJPG && isLt2M;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>