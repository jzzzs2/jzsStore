
<template>
  <div class="blog-photo--wrap">
    <!-- <button @click="dataURLtoFile('diy')" :disabled="!cropImg" class="spec">提交</button> -->
    <!-- <input
      ref="input"
      type="file"
      name="image"
      accept="image/*"
      @change="setImage"
    /> -->
    <div class="blog-photo">
      <div class="blog-photo-wrap">
        <div class="blog-photo-show" @click="add">
          <span>+</span>
        </div>
        <input
          ref="input"
          type="file"
          name="image"
          accept="image/*"
          @change="setImage"
          hidden="true"
        />
        <div class="actions">
          <a href="#" role="button" @click.prevent="zoom(0.2)"> Zoom In </a>
          <a href="#" role="button" @click.prevent="zoom(-0.2)"> Zoom Out </a>
          <a href="#" role="button" @click.prevent="move(-10, 0)">
            Move Left
          </a>
          <a href="#" role="button" @click.prevent="move(10, 0)">
            Move Right
          </a>
          <a href="#" role="button" @click.prevent="move(0, -10)"> Move Up </a>
          <a href="#" role="button" @click.prevent="move(0, 10)"> Move Down </a>
          <a href="#" role="button" @click.prevent="rotate(90)">
            Rotate +90deg
          </a>
          <a href="#" role="button" @click.prevent="rotate(-90)">
            Rotate -90deg
          </a>
          <a href="#" role="button" @click.prevent="cropImage" class="spec"
            >生成预览图</a
          >
        </div>
        <!-- <a
            href="#"
            class="submitBtn"
            @click="dataURLtoFile('diy')"
            :disabled="!cropImg"
            >上传头像</a
          > -->
        <el-button
          type="primary"
          @click="dataURLtoFile('diy')"
          :disabled="!cropImg"
          >上传头像</el-button
        >
      </div>
    </div>
    <div class="content">
      <section class="cropper-area">
        <div class="img-cropper">
          <vue-cropper
            ref="cropper"
            :aspect-ratio="16 / 9"
            :src="imgSrc"
            preview=".preview"
          />
        </div>
        <!-- <div class="actions">
          <a href="#" role="button" @click.prevent="zoom(0.2)"> Zoom In </a>
          <a href="#" role="button" @click.prevent="zoom(-0.2)"> Zoom Out </a>
          <a href="#" role="button" @click.prevent="move(-10, 0)">
            Move Left
          </a>
          <a href="#" role="button" @click.prevent="move(10, 0)">
            Move Right
          </a>
          <a href="#" role="button" @click.prevent="move(0, -10)"> Move Up </a>
          <a href="#" role="button" @click.prevent="move(0, 10)"> Move Down </a>
          <a href="#" role="button" @click.prevent="rotate(90)">
            Rotate +90deg
          </a>
          <a href="#" role="button" @click.prevent="rotate(-90)">
            Rotate -90deg
          </a>
          <a href="#" role="button" @click.prevent="cropImage" class="spec">生成预览图</a>
          <a href="#" role="button"  @click="dataURLtoFile('diy')" :disabled="!cropImg" class="spec">提交</a>
        </div> -->
      </section>
      <section class="preview-area">
        <p>Preview</p>
        <div class="preview" />
        <p>Cropped Image</p>
        <div class="cropped-image">
          <img v-if="cropImg" :src="cropImg" alt="Cropped Image" />
          <div v-else class="crop-placeholder" />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
export default {
  components: {
    VueCropper,
  },
  data() {
    return {
      imgSrc: "",
      cropImg: "",
      data: null,
      newFile: "",
    };
  },
  mounted() {},
  methods: {
    add() {
      this.$refs["input"].click();
    },
    async dataURLtoFile(fileName) {
      const arr = this.cropImg.split(",");
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      this.newFile = new File([u8arr], fileName, { type: mime });
      let data = new FormData();
      data.append("file", this.newFile);
      try {
        let result = await this.$http({ type: "photo", data });
        console.log(result, "");
        this.$notify({
          title: '成功',
          message: '上传成功',
          type: 'success'
        });
        this.$router.push("/")
        // return new File([u8arr], fileName, { type: mime });
      } catch (error) {
        console.log(error);
      }
    },
    cropImage() {
      // get image data for post processing, e.g. upload or setting image src
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
    },
    flipX() {
      const dom = this.$refs.flipX;
      let scale = dom.getAttribute("data-scale");
      scale = scale ? -scale : -1;
      this.$refs.cropper.scaleX(scale);
      dom.setAttribute("data-scale", scale);
    },
    flipY() {
      const dom = this.$refs.flipY;
      let scale = dom.getAttribute("data-scale");
      scale = scale ? -scale : -1;
      this.$refs.cropper.scaleY(scale);
      dom.setAttribute("data-scale", scale);
    },
    getCropBoxData() {
      this.data = JSON.stringify(this.$refs.cropper.getCropBoxData(), null, 4);
    },
    getData() {
      this.data = JSON.stringify(this.$refs.cropper.getData(), null, 4);
    },
    move(offsetX, offsetY) {
      this.$refs.cropper.move(offsetX, offsetY);
    },
    reset() {
      this.$refs.cropper.reset();
    },
    rotate(deg) {
      this.$refs.cropper.rotate(deg);
    },
    setCropBoxData() {
      if (!this.data) return;
      this.$refs.cropper.setCropBoxData(JSON.parse(this.data));
    },
    setData() {
      if (!this.data) return;
      this.$refs.cropper.setData(JSON.parse(this.data));
    },
    setImage(e) {
      const file = e.target.files[0];
      if (file.type.indexOf("image/") === -1) {
        alert("Please select an image file");
        return;
      }
      if (typeof FileReader === "function") {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.imgSrc = event.target.result;
          // rebuild cropperjs with the updated source
          this.$refs.cropper.replace(event.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Sorry, FileReader API not supported");
      }
    },
    showFileChooser() {
      this.$refs.input.click();
    },
    zoom(percent) {
      this.$refs.cropper.relativeZoom(percent);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.submitBtn {
  background-color: #efd8d8;
  width: 100px;
  height: 30px;
}

.blog-photo {
  width: 100%;
  background-color: #fff;
  text-align: center;
}

.blog-photo-wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  & input[type=file] {
    display: none;
  }

  & img {
    display: block;
    max-width: 100%;
    height: auto;
  }
}

.blog-photo-show {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 220px;
  height: 140px;
  background-color: pink;
  color: #fff;
  font-size: 60px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  transition: 0.8s;

  &:hover {
    transform: scale(1.1);
  }
}

img {
  width: 200px;
  height: auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0 5px 0;
}

.header h2 {
  margin: 0;
}

.header a {
  text-decoration: none;
  color: black;
}

.content {
  display: flex;
  justify-content: space-between;
}

.cropper-area {
  width: 614px;
}

.actions {
  margin-top: 1rem;
}

.actions a {
  display: inline-block;
  padding: 5px 15px;
  background: #0062cc;
  color: white;
  text-decoration: none;
  border-radius: 3px;
  margin-right: 1rem;
  margin-bottom: 1rem;
}

textarea {
  width: 100%;
  height: 100px;
}

.preview-area {
  width: 307px;
}

.preview-area p {
  font-size: 1.25rem;
  margin: 0;
  margin-bottom: 1rem;
}

.preview-area p:last-of-type {
  margin-top: 1rem;
}

.preview {
  width: 100%;
  height: calc(372px * (9 / 16));
  overflow: hidden;
}

.crop-placeholder {
  width: 100%;
  height: 200px;
  background: #ccc;
}

.cropped-image img {
  max-width: 100%;
}

body .blog-photo--wrap .spec {
  background-color: #222;
  color: #fff;
}
</style>
