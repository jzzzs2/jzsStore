<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-04-04 16:24:56
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-08 18:57:55
-->
<template>
  <div>
    <van-form ref="form">
      <van-cell-group inset>
        <van-field
          v-for="(item, idx) in inputs"
          :key="idx"
          :readonly="item?.query==='username'&&type==='info'"
          v-model="form[item?.query]"
          :name="item.query"
          :label="item.label"
          :placeholder="item.placeholder"
          :rules="rulesValidate[item?.query]"
          :type="item.type"
        />
      </van-cell-group>
    </van-form>
  </div>
</template>

<script>
import { capitalize, padStart } from "lodash";
import rulesMap from "@/config/formValidateForMob.js";
import InputDatas from "@/config/formDatas.js";
export default {
  props: {
    type: {
      type: String,
    },
  },
  data() {
    return {
      form: {},
    };
  },
  created() {
    if (this.type === "info") {
      let sourceData = this.$store.state.userInfo;
      console.log(sourceData, "source");
      let finalArr = Object.entries(sourceData).filter(([key]) => {
        return (
          this.formInputs.find((item) => {
            return item.query === key;
          }) !== undefined
        );
      });
      // console.log(finalArr, "Arr");
      let finalObj = Object.fromEntries(finalArr);
      // console.log(finalObj, "finalObj");
      this.form = finalObj
    }
  },
  computed: {
    formInputs() {
      return InputDatas[this.type];
    },
    inputs() {
      return InputDatas?.[this.type].filter(item => {
        return item.query !== "avatar"
      });
    },
    rulesValidate() {
      return rulesMap?.[this.type];
    },
  },
  mounted() {
    console.log(padStart(capitalize("blur"), 6, "on"));
  },

  methods: {},
  filters: {
    // triggerFormat(arr) {
    //   return arr.map(item => {
    //     item.trigger = padStart(capitalize(item.trigger),6,"on")
    //     console.log(item.trigger);
    //     return item
    //   })
    // }
  },
};
</script>

<style lang="scss" scoped>
</style>