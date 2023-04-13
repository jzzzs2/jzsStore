<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-03-28 15:10:14
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-03-30 15:12:39
-->
<template>
  <div class="live2d-wrap" :class="direction">
    <div class="live-operate">
      <i class="el-icon-refresh-right" @click="changeModel"></i>
      <i class="el-icon-arrow-down" @click="changeClothes"></i>
    </div>
    <canvas id="live2d" width="300" height="500"> </canvas>
  </div>
</template>

<script>
import Live2d from "@/static/live2d";
import axios from "axios";
import store from "store";
const LIVE2D_MODEL_NAME = "info_live2d";
const GET_URL = "https://live2d.fghrsh.net/api/get/";
const MODEL_URL = "http://api.fghrsh.net/live2d/switch/";
const TEXTURES_URL = "https://api.fghrsh.net/live2d/rand_textures/";
export default {
  data() {
    return {
      modelId: 1,
      texturesId: 0,
    };
  },
  computed: {
    direction () {
      return this.$store.state.direction || "left"
    }
  },
  mounted() {
    this.initData();
    this.startLoadGirl();
  },

  methods: {
    async changeModel() {
      try {
        let result = await axios.get(`${MODEL_URL}?id=${this.modelId}`);
        // console.log(result.data.model.id,"xxx1");
        this.modelId = result.data.model.id;
        this.startLoadGirl();
      } catch (error) {
        console.log("切换模型出错");
        this.modelId = 6
        this.startLoadGirl();
      }
    },
    async changeClothes() {
      try {
        let result = await axios.get(`${TEXTURES_URL}?id=${this.modelId}`);
        // console.log(result,"xxx2");
        this.texturesId = result.data.textures.id;
        this.startLoadGirl();
      } catch (error) {
        console.log("切换衣服出错");
        this.texturesId = 6
        this.startLoadGirl();
      }
    },
    startLoadGirl() {
      console.log("渲染canvas");
      // this.initData()
      loadlive2d("live2d", `${GET_URL}?id=${this.modelId}-${this.texturesId}`);
      store.set(LIVE2D_MODEL_NAME, {
        modelId: this.modelId,
        texturesId: this.texturesId,
      });
    },
    initData() {
      let { modelId, texturesId } = store.get(LIVE2D_MODEL_NAME);
      modelId ? (this.modelId = modelId) : (tihs.modelId = 1);
      texturesId ? (this.texturesId = texturesId) : (this.texturesId = 0);
    },
  },
};
</script>

<style lang="stylus">
.live2d-wrap {
  position: fixed;
  width: 300px;
  height: 500px;
  bottom: 10px;
  &:hover .live-operate {
    display: flex;
  }
}
.live2d-wrap.left {
  left: 20px;
}
.live2d-wrap.right {
  right: 20px
}
.live-operate {
  display: none;
  position: absolute;
  left: 44px;
  bottom: 210px;
  font-size: 20px;
  color: #000;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  & i {
    margin: 4px;
    cursor: pointer;
    padding: 4px
    border-radius: 50%
    background-color #fff
  }
}
</style>