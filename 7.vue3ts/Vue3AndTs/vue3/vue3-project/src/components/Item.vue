<template>
  <li @mouseenter="enter" @mouseleave="leave" >
    <label>
      <input type="checkbox" v-model="comSelect" />
      <span>{{person.name}}</span>
    </label>
    <button v-if="isShow" @click="removePerson" class="btn btn-danger" :style="{backgroundColor:isShow?'color':'white',color:isShow?'cyan':'black'}">删除</button>
  </li>
</template>

<script lang='ts'>
import { defineComponent, computed,inject,ref} from "vue";
export default defineComponent({
  name: "Item",
  props: {
    person: {
      type: Object
    },
    idx: {
      type: Number
    }
  },
  setup (props)  {
    const isShow = ref(false)
    const changeSelectF :any = inject("changeSelect")
    const removeItem :any = inject("removeItem")
    const comSelect = computed({
      get() {
        if (props.person) {
          return props.person.isSelected
        } else {
          return false
        }
      },
      set()  {
        // console.log(changeSelectF,"func");
        // console.log(props.idx,"idx","modify");
        changeSelectF(props.idx)
        return true
      }
    })
    const removePerson = function () {
      removeItem(props.idx)
    }
    const enter = function () {
      isShow.value = true
    }
    const leave = function () {
      isShow.value = false
    }
    return {
      comSelect,
      isShow,
      enter,
      leave,
      removePerson
    }
  }
});
</script>
<style>
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
</style>