<template>
  <div>
    <p>我是son组件中的message {{message}}</p>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        message: "info 可爱捏"
      }
    }
  }  
</script>
<style lang="stylus" scoped>
  div p
    font-size 30px
    color cyan
</style>