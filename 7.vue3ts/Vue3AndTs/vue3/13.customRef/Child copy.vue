<template>
  <h2>子组件</h2>
  <p>{{ age }}</p>
  <p>{{ length }}</p>
</template>

<script lang='ts'>
import { computed, defineComponent,toRef,Ref } from "vue";
function useFeatureX(foo: Ref) {
  const lenth = computed(() => foo.value.toString().length);
  return lenth;
}
export default defineComponent({
  name: "",
  props: {
    age: {
      type: Number,
    },
  },
  setup(props: any) {
    console.log(props,"xx props");
    const age = toRef(props,"age")
    const length = useFeatureX(age)
    return {
      length,
    };
  },
});
</script>
<style scoped lang='stylus'></style>