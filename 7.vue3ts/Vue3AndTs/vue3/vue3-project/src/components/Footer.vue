<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" v-model="allFinish" />
    </label>
    <span>
      <span>已完成{{ len }}</span> / 全部{{ allLen }}
    </span>
    <button class="btn btn-danger" @click="removeSelected">清除已完成任务</button>
  </div>
</template>

<script lang='ts'>
import { defineComponent, computed, inject } from "vue";
interface Person {
  id: number;
  name: string;
  isSelected: boolean;
}
export default defineComponent({
  name: "Footer",
  props: {
    persons: {
      type: Object as () => {todos: Person[]} ,
      required: true,
    },
    modifyAll: {
      type: Function,
      required: true
    },
    removeAllSelect: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const len = computed(() => {
      return props.persons.todos.reduce((acc, item) => {
        let result = item.isSelected ? 1 : 0;
        return acc + result;
      }, 0);
    });
    const allLen = computed(() => {
      return props.persons.todos.length;
    });
    const allFinish = computed({
      get() {
        return len.value === allLen.value;
      },
      set(newValue:boolean) {
        props.modifyAll(newValue);
        return false;
      },
    });
    const removeSelected = function () {
      props.removeAllSelect()
    }
    return {
      len,
      allLen,
      allFinish,
      removeSelected
    };
  },
});
</script>
<style>
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>