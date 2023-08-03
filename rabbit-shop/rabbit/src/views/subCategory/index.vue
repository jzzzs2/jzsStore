<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-08-01 15:45:13
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-08-02 15:52:08
-->
<template>
  <div class="container ">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${categoryData.parentId}` }">{{ categoryData.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/sub/${categoryData.id}` }">{{ categoryData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs v-model="filterData.sortField" @tab-change="tabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body" v-infinite-scroll="load"
      :infinite-scroll-disabled="loadDisabled"
      >
        <!-- 商品列表-->
        <GoodItem v-for="item in goodList" :key="item.id" :good="item"></GoodItem>
      </div>
    </div>
  </div>
</template>

<script  setup>
import GoodItem from "@/views/home/components/item/index.vue"
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import { reqCategoryTwo, reqCategoryGoodsFilterd } from "@/api/secCategory.js"
let $route = useRoute()
// 标签栏的值绑定
//filter params
let filterData = ref({
  categoryId: $route.params.id,
  page: 1,
  pageSize: 20,
  sortField: "publishTime"
  // sortField: 'publishTime' | 'orderNum' | 'evaluateNum'
})
//二级分类数据
let categoryData = ref({})
//商品数据列表
let goodList = ref([])
//tab栏切换
let loadDisabled = ref(false)
let tabChange = async () => {
  loadDisabled.value = false
  getAllFilterGoods(filterData.value)
}
//无限滚动得到更多数据
let load = async () => {
  // console.log("loading");
  filterData.value.page++
  // console.log(name,"name");
  let result =  await reqCategoryGoodsFilterd(filterData.value)
  console.log(result,"loading");
  if (filterData.value.page>result.result.pages) {
    console.log("disabled");
    loadDisabled.value = true
    return 
  }
  goodList.value = [...goodList.value,...result.result.items]
}
// 渲染完成获取二级分类数据
onMounted(() => {
  //得到面包屑数据
  getCategoryList($route.params.id)
  // 得到所有商品数据
  getAllFilterGoods(filterData.value)
})
let getAllFilterGoods = async (data) => {
  let result = await reqCategoryGoodsFilterd(data)
  if (result.code == 1) {
    console.log(result,"resultxddd");
    goodList.value = result.result.items
  }
}
let getCategoryList = async (id) => {
  let result = await reqCategoryTwo(id)
  if (result.code == 1) {
    // console.log(result,"result");
    categoryData.value = result.result
  }
}

</script>
<style scoped lang='scss'>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }

}
</style>