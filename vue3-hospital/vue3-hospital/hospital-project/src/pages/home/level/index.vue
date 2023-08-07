<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-07-18 20:05:40
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-07-24 22:24:48
-->
<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-07-18 20:05:40
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-07-18 20:05:50
-->
<template>
  <div class="level">
    <h2>医院</h2>
    <div class="list">
      <span>等级:</span>
      <ul class="option">
        <li :class="{all: !currentIdx&&currentIdx!==0 ? true:false}">全部</li>
        <li v-for="(item,idx) in levelList" :key="item.id" @click="levelChoose(idx,item)" :class="{all: currentIdx === idx}">{{item.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { reqLevelList } from '@/api/api';
import { onMounted, ref } from 'vue';
import {areaAndLevelRes,AreaAndLevelOne} from "@/api/type.ts"
let levelList = ref<AreaAndLevelOne[]>([])
// 接收父组件的医院类型自定义函数
let $emit = defineEmits(["typeHandler"])
// 当前地区索引
let currentIdx = ref("")
// 按钮回调
let levelChoose = (idx :any,item :any) => {
  currentIdx.value = idx
  console.log(item.value,"hostype");
  $emit("typeHandler",item.value)
}
onMounted(() => {
  getLevelList()
})
let getLevelList = async () => {
  let result :areaAndLevelRes= await reqLevelList()
  if (result.code == 200) {
    levelList.value = result.data
  }
}
</script>
<style scoped lang='scss'>
.level {
  color: #666;
  h2 {
    margin: 10px 0;
    font-weight: 700;
  }
}
.list {
  display: flex;
  & span {
    margin-right: 6px;
  }
  ul.option {
    display: flex;
    li {
      margin-left: 6px;
    }
    li:hover {
      color: #4490f1;
    }
    li.all {
      color: #4490f1;
    }
  }
}
</style>