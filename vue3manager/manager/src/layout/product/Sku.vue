<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-05-25 14:59:29
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-06-03 16:36:15
-->
<template>
  <el-card>
    <el-table border :data="skusArr">
      <el-table-column
        type="index"
        label="序号"
        width="100px"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="名称"
        prop="skuName"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="描述"
        prop="skuDesc"
      ></el-table-column>
      <el-table-column label="默认图片">
        <template #default="{ row, $index }">
          <img :src="row.skuDefaultImg" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column label="重量(g)" prop="weight"></el-table-column>
      <el-table-column label="价格(元)" prop="price"></el-table-column>
      <el-table-column label="操作" width="240px">
        <template #default="{ row, $index }">
          <el-button
            :icon="row.isSale ? 'Bottom' : 'Top'"
            @click="upSku(row)"
            size="small"
            type="success"
            v-has="'btn.Sku.updown'"
          ></el-button>
          <el-button
            icon="Edit"
            @click="notDesign"
            size="small"
            type="primary"
            v-has="'btn.Sku.update'"
          ></el-button>
          <el-button
            icon="InfoFilled"
            type="warning"
            @click="showSkuInfo(row)"
            size="small"
            v-has="'btn.Sku.detail'"
          ></el-button>
          <el-button
            icon="Delete"
            type="danger"
            @click="deleteSku(row)"
            size="small"
            v-has="'btn.Sku.remove'"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageNum"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      :background="background"
      layout="prev, pager, next, jumper,->, sizes, total "
      :total="total"
      @size-change="handleSizeChange"
      @current-change="getAllSkus"
    />
  </el-card>
  <!-- 展示sku信息 -->
  <el-drawer v-model="isShowSkuInfo" :direction="rtl">
    <template #header>
      <h4>查看商品详情</h4>
    </template>
    <template #default>
      <el-row class="m10">
        <el-col :span="6">名称</el-col>
        <el-col :span="18">
          {{ skuInfo.skuName }}
        </el-col>
      </el-row>
      <el-row class="m10">
        <el-col :span="6">描述</el-col>
        <el-col :span="18">
          {{ skuInfo.skuDesc }}
        </el-col>
      </el-row>
      <el-row class="m10">
        <el-col :span="6">价格</el-col>
        <el-col :span="18">
          {{ skuInfo.price }}
        </el-col>
      </el-row>
      <el-row class="m10">
        <el-col :span="6">平台属性</el-col>
        <el-col :span="18">
          <el-tag
            class="m4"
            type="success"
            v-for="item in skuInfo.skuAttrValueList"
          >
            {{ item.attrName }}
          </el-tag>
        </el-col>
      </el-row>
      <el-row class="m10">
        <el-col :span="6">销售属性</el-col>
        <el-col :span="18">
          <el-tag
            class="m4"
            type="success"
            v-for="item in skuInfo.skuSaleAttrValueList"
          >
            {{ item.saleAttrName }}
          </el-tag>
        </el-col>
      </el-row>
      <el-row class="m10">
        <el-col :span="6">商品图片</el-col>
        <el-col :span="18">
          <el-carousel :interval="2000" type="card" height="200px" indicator-position="outside">
            <el-carousel-item
              v-for="(item, idx) in skuInfo.skuImageList"
              :key="idx"
            >
              <img
                :src="item.imgUrl"
                alt=""
                style="width: 100%; height: 100%"
              />
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </template>
  </el-drawer>
</template>

<script lang='ts' setup>
import {
  getSkusList,
  setSkuOn,
  setSkuOff,
  deleteOneSku,
  getSkuInfo,
} from "@/api/product/sku.ts"
import { ElMessage } from "element-plus"
import { onMounted, ref } from "vue"
let skusArr = ref([])
let pageNum = ref(1)
let pageSize = ref(10)
let total = ref(0)
//获取所有skuInfo信息
let getAllSkus = async (page = 1) => {
  pageNum.value = page
  let result = await getSkusList(pageNum.value, pageSize.value)
  // console.log(result, "rs")
  skusArr.value = result.data.records
  total.value = result.data.total
}
//上架下架操作
let upSku = async (row: any) => {
  let id = row.id
  if (row.isSale) {
    //下架
    await setSkuOff(id)
  } else {
    //上架
    await setSkuOn(id)
  }
  ElMessage({
    type: "success",
    message: row.isSale ? "下架成功" : "上架成功",
  })
  getAllSkus(pageNum.value)
}
//第二个按钮 未设计
let notDesign = () => {
  ElMessage({
    type: "success",
    message: "待开发捏",
  })
}
//删除按钮
let deleteSku = async (row: any) => {
  let result = await deleteOneSku(row.id)
  if (result.code === 200) {
    ElMessage({
      type: "success",
      message: "删除成功",
    })
    getAllSkus(skusArr.value.length > 1 ? pageNum.value : pageNum.value - 1)
  } else {
    ElMessage({
      type: "error",
      message: "系统数据不可删除",
    })
  }
}
//size改变的回调
let handleSizeChange = () => {
  getAllSkus()
}
//展示sku具体信息
let skuInfo = ref({})
let isShowSkuInfo = ref(false)
let showSkuInfo = async (row: any) => {
  isShowSkuInfo.value = true
  let result = await getSkuInfo(row.id)
  // console.log(result,"resutlxx")
  skuInfo.value = result.data
}
onMounted(() => {
  getAllSkus()
})
</script>
<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.m10 {
  margin: 10px 0;
}
.m4 {
  margin: 4px;
}
</style>