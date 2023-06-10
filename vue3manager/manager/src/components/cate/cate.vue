<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-05-29 16:09:30
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-05-31 17:19:31
-->
<template>
  <el-form :inline="true">
    <el-form-item label="一级分类">
      <el-select v-model="cateStoreObj.c1Id" @change="c1Change" :disabled="abled">
        <el-option v-for="(item,idx) in cateStoreObj.c1Arr" :key="item.id" :value="item.id" :label="item.name"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="二级分类">
      <el-select v-model="cateStoreObj.c2Id" @change="c2Change" :disabled="abled">
        <el-option v-for="(item,idx) in cateStoreObj.c2Arr" :key="item.id" :value="item.id" :label="item.name">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="三级分类">
      <el-select v-model="cateStoreObj.c3Id" :disabled="abled">
        <el-option v-for="(item,idx) in cateStoreObj.c3Arr" :key="item.id" :value="item.id" :label="item.name">
        </el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script lang='ts' setup>
import { onMounted, ref } from "vue"
import cateStore from "@/store/cate/cate.ts"
let cateStoreObj = cateStore()
defineProps(["abled"])
//分类1数据
onMounted(() => {
  //获取一级分类数据并存储
  cateStoreObj.getC1AndStore()
})
//分类1变化回调
let c1Change = () => {
  cateStoreObj.getC2AndStore()
}
let c2Change = () => {
  cateStoreObj.getC3AndStore()
}
</script>
<style scoped lang='scss'>
</style>