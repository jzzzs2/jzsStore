<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-04-21 16:05:23
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-21 16:43:39
-->
<template>
  <div class="todo-header">
    <input type="text" placeholder="请输入你的任务名称，按回车键确认" @keyup.enter="addP" v-model="name" />
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref} from "vue";
export default defineComponent({
  name: "Header",
  props: {
    addPerson: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const name = ref("")
    const addP = function () {
      if (!name.value.trim()) {
        return false
      }
      props.addPerson(name.value)
      name.value = ""
    }
    return {
      name,
      addP
    }
  }
});
</script>
<style>
.todo-header input {
  width: 560px;
  height: 28px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 7px;
}

.todo-header input:focus {
  outline: none;
  border-color: rgba(82, 168, 236, 0.8);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
    0 0 8px rgba(82, 168, 236, 0.6);
}
</style>