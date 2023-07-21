<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-07-18 19:21:42
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-07-19 20:56:14
-->
<template>
  <div class="content">
    <Swiper></Swiper>
    <Search></Search>
    <div class="hospital">
      <el-row>
        <el-col :span="20">
          <Level></Level>
          <Area></Area>
          <div class="hospital-list">
            <Hos v-for="item in hospitalList" :key="item.id" class="m10"  :hosInfo="item"></Hos>
          </div>
          <el-pagination v-model:current-page="pageNum" v-model:page-size="limit" :page-sizes="[6, 10, 20, 30]"
            :background="true" layout=" prev, pager, next, jumper,->, sizes,total" :total="total" @size-change="sizeChange" @current-change="pageChange" />
        </el-col>
        <el-col :span="4">
          right
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang='ts' setup>
import Swiper from "./swiper/index.vue"
import Search from "./search/index.vue"
import Level from "./level/index.vue"
import Area from "./area/index.vue"
import Hos from "./hos/index.vue"
import { onMounted, ref } from "vue"
import {reqHospitalList} from "@/api/api"
let pageNum = ref(1)
let limit = ref(6)
let total = ref(10)
let hospitalList = ref<any>([])
let getCurrentHospital = async (page = 1,limit = 6) => {
  let result :any = await reqHospitalList(page,limit)
  if (result.code == 200) {
    hospitalList.value = result.data.content
    total.value = result.data.totalElements
  }
}
let sizeChange = () => {
  getCurrentHospital(pageNum.value,limit.value)
}
let pageChange = () => {
  getCurrentHospital(pageNum.value,limit.value)
}
onMounted(() => {
  getCurrentHospital(pageNum.value,limit.value)
})

</script>
<style scoped lang='scss'>
.hospital {
  margin-top: 20px;
}

.hospital-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.m10 {
  margin-bottom: 10px;
}
</style>