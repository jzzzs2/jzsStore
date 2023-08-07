<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-07-18 20:05:52
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-07-24 22:27:09
-->
<template>
  <div class="area">
    <span>地区: </span>
    <ul class="list">
      <li :class="{active: !currentIdx&&currentIdx!==0 ? true:false}" @click="areaHandle('','')">全部</li>
      <li v-for="(item,idx) in areaList" :key="item.id" @click="areaHandle(idx,item)" :class="{active: currentIdx === idx}">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script lang='ts' setup>
import {onMounted,ref} from "vue"
import {reqAreaList} from "@/api/api.ts"
import {AreaAndLevelOne} from "@/api/type.ts"
// 接收自定义事件
let $emit = defineEmits(["areaHandler"])
// 地区列表
let areaList = ref<AreaAndLevelOne[]>([])
// 当前点击的区域位置索引
let currentIdx = ref("")
onMounted(() => {
  getAreaList()
})
// 
let areaHandle = (idx :any,item :any) => {
  currentIdx.value = idx
  console.log(item.value,"districtCode");
  $emit("areaHandler",item.value)
}
let getAreaList = async () => {
  let result = await reqAreaList()
  if (result.code == 200) {
    areaList.value = result.data
  }
}
</script>
<style scoped lang='scss'>
.area {
  display: flex;
  color: #666;
  margin-top: 10px;
  &>span {
    width: 40px;
    margin-right: 6px;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    li {
      margin-left: 6px;
      margin-bottom: 10px;
    }
    li.active {
      color: #4490f1;
    }
    li:hover {
      color: #4490f1;
    }
  }
}
</style>