<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-04-21 16:05:34
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-21 18:16:23
-->
<template>
  <ul class="todo-main">
    <Item v-for="(item,idx) in persons"  :key="item.id" :person="item" :idx="idx" />
  </ul>
</template>

<script lang='ts'>
import Item from "@/components/Item.vue"
import { defineComponent,inject} from "vue";
export default defineComponent({
  name: "List",
  components: {
    Item
  },
  props: {
    persons:{
      type: Array
    }
  },
  // setup() {
  //   const persons = inject("persons")
  //   return {
  //     persons
  //   }
  // },
});
</script>
<style>
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
</style>