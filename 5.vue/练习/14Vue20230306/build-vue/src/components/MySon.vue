<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-03-06 09:27:09
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-03-06 14:39:29
-->
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
<style lang="stylus">
  div p
    font-size 30px
    color cyan
</style>