<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-07-18 19:21:42
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-07-24 22:26:11
-->
<template>
  <div class="content">
    <Swiper></Swiper>
    <Search></Search>
    <div class="hospital">
      <el-row>
        <el-col :span="20">
          <Level @typeHandler="typeHandler"></Level>
          <Area @areaHandler="areaHandler"></Area>
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
import {HospitalList,Content} from "@/api/type.ts"
let pageNum = ref(1)
let limit = ref(6)
let total = ref(10)
let hospitalList = ref<Content[]>([])
// 地区代码
let areaCode = ref("")
// 医院类型
let areaType = ref("")
// 改变地区参数和等级参数
let areaHandler = (area :any) => {
  areaCode.value = area
}
let typeHandler = (type :any) => {
  areaType.value = type
}
let getCurrentHospital = async (page = 1,limit = 6,areaCode = "",areaType = "") => {
  let result :HospitalList = await reqHospitalList(page,limit,areaCode,areaType)
  if (result.code == 200) {
    hospitalList.value = result.data.content
    total.value = result.data.totalElements
  }
}
let sizeChange = () => {
  getCurrentHospital(pageNum.value,limit.value,areaCode.value,areaType.value)
}
let pageChange = () => {
  getCurrentHospital(pageNum.value,limit.value,areaCode.value,areaType.value)
}
onMounted(() => {
  getCurrentHospital(pageNum.value,limit.value,areaCode.value,areaType.value)
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