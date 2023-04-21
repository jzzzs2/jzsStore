<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-04-18 18:16:08
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-21 18:31:25
-->
<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-04-18 18:16:08
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-19 17:36:01
-->
<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-04-18 14:55:15
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-19 15:00:16
-->
<template>
  <div class="todo-container">
    <div class="todo-wrap">
      <Header :addPerson="addPerson" />
      <List :persons="persons.todos" />
      <Footer
        :persons="persons"
        :modifyAll="modifyAll"
        :removeAllSelect="removeAllSelect"
      />
    </div>
  </div>
</template>

<script lang='ts'>
import {saveInfo,getInfo} from "@/ts/userInfo.ts"
import { defineComponent, reactive, provide,watch, onMounted} from "vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import List from "@/components/List.vue";
interface Person {
  id: number;
  name: string;
  isSelected: boolean;
}
export default defineComponent({
  name: "App",
  components: { List, Header, Footer },
  setup() {
    const persons = reactive<{ todos: Person[] }>({
      todos: [
        {
          id: Date.now(),
          name: "jzs",
          isSelected: false,
        },
        {
          id: Date.now(),
          name: "zjc",
          isSelected: true,
        },
        {
          id: Date.now(),
          name: "古堡龙姬",
          isSelected: true,
        },
      ],
    });
    persons.todos = getInfo()
    watch(persons,(newValue) => {
      // console.log(newValue);
      saveInfo(newValue.todos)
    },{
      deep: true
    })
    function changeSelect(idx: number) {
      persons.todos[idx].isSelected = !persons.todos[idx].isSelected;
    }
    function addPerson(title: string) {
      const obj = {
        name: title,
        id: Date.now(),
        isSelected: false,
      };
      persons.todos.unshift(obj);
    }
    function removeItem(index: number) {
      persons.todos.splice(index, 1);
    }
    function modifyAll(value: boolean) {
      persons.todos.forEach((item, idx) => {
        console.log(value, "value");
        persons.todos[idx].isSelected = value;
      });
    }
    function removeAllSelect() {
      persons.todos = persons.todos.filter(item => {
        return !item.isSelected
      })
      console.log(persons.todos);
    }
    provide("persons", persons.todos);
    provide("changeSelect", changeSelect);
    provide("removeItem", removeItem);
    // provide("modifyAll",modifyAll)
    return {
      persons,
      addPerson,
      changeSelect,
      modifyAll,
      removeAllSelect,
    };
  },
});
</script>
<style>
@import url(./assets/base.css);
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>