<template>
  <div>
    <p>{{message}}</p>
    <br>
    <br>
    <MySon></MySon>
  </div>
  
</template>
<script>
import MySon from "./components/MySon.vue"
  export default {
    components: {
      MySon
    },
    data () {
      return {
        message: "我是App组件"
      }
    }
  }  
</script>
<style scoped>
  p {
    font-size: 20px;
    color: red;
  }
</style>