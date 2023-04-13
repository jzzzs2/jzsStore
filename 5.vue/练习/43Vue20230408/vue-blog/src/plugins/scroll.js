/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-03-18 17:39:08
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-03-18 17:50:31
 */
import vuescroll from 'vuescroll';
import Vue from 'vue';

Vue.use(vuescroll, {
  ops: {
    // The global config
  },
  name: "myScroll" // customize component name, default -> vueScroll
});
