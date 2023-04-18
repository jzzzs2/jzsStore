<template>
  <h2>首页</h2>
  <p>count: {{count}}</p>
  <p>count1: {{count1}}</p>
  <button @click="add">add</button>
  <button @click="add2">add2</button>
  <Child :msg="count" msg1="keainie" @reduce="count--" />
</template>

<script lang="ts">
import { defineComponent, ref} from "vue";
import Child from "@/components/child.vue"
// 父组件引入子组件的正确写法:
// const Child = () => import("./components/Child.vue"); //加上[.vue]这个后缀!!!
export default defineComponent({
  name: "App",
  components: {
    Child
  },
  beforeCreate () {
    console.log("beforeCreate",this);
  },
  created () {
    console.log(this,"created");
  },
  mounted() {
    console.log(this,"mounted");
  },
  data() {
    return {
      count1: 10
    }
  },
  methods: {
    add2 () {
      console.log(this,"");
      this.count+=2
      // this.count1+=2
      this.add()
    }
  },
  setup() {
    let count = ref(0)
    function add () {
      count.value++
    }
    return {
      count,
      add
    }
  }
});

</script>

