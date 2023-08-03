<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-07-28 15:15:06
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-08-01 14:30:34
-->
<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-07-28 15:14:42
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-07-28 16:00:41
-->
<template>
  <div class="header">
    <h1 class="logo">
      <a href="#"></a>
    </h1>
    <div class="types">
      <router-link active-class="active" v-for="item in cateStore?.cateList" :key="item.id" :to="`/category/${item.id}`">{{ item.name }}</router-link>
      <!-- <a href="#" v-for="item in cateStore?.cateList" :key="item.id">{{ item.name }}</a> -->
    </div>
    <div class="good">
      <el-input class="w-50 m-2" placeholder="搜一搜">
        <template #prefix>
          <el-icon class="el-input__icon">
            <search />
          </el-icon>
        </template>
      </el-input>
      <el-icon :size="22">
        <ShoppingCart />
      </el-icon>
    </div>

  </div>
</template>

<script setup>
// import { onMounted, ref } from 'vue';
import cateStoreFnc from "@/stores/category"
// import {reqCategory} from "@/api/layout.js"
// 所有分类的数据存放
// let cateList = ref([])
// let getCategoryList = async () => {
//   let result = await  reqCategory()
//   if (result.code == 1) {
//     cateList.value = result.result
//   }

// }
let cateStore = cateStoreFnc()
// onMounted(() => {
//   console.log("son",cateStore.cateList);
//   cateList.value = cateStore.cateList
// })


</script>
<style scoped lang='scss'>
.header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100px;
  background-color: white;

  & .logo {
    width: 200px;
    height: 80px;

    & a {
      display: block;
      width: 100%;
      height: 80px;
      background: url('@/assets/images/logo.png') no-repeat center 18px / contain;
    }
  }

  & .types {
    display: flex;
    justify-content: space-around;
    align-items: center;

    & a {
      padding: 0px 10px;
    }
  }

  & .good {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.active {
  color: $xtxColor;
  border-bottom: 1px solid $xtxColor;
}
</style>