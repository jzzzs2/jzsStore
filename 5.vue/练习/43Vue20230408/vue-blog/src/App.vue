<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-03-15 15:27:37
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-03-25 10:26:33
-->
<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
  export default {
    created() {
      this.$router.push("/")
    }
  }
</script>
<style>
html,body {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
