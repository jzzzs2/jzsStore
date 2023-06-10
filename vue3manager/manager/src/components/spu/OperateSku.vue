<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-05-31 18:00:32
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-06-02 18:02:32
-->
<template>
  <el-form label-width="100px">
    <el-form-item label="SKU名称">
      <el-input placeholder="SKU名称" v-model="skuData.skuName"></el-input>
    </el-form-item>
    <el-form-item label="价格(元)" placeholder="价格(元)">
      <el-input
        placeholder="价格(元)"
        v-model="skuData.price"
        type="number"
      ></el-input>
    </el-form-item>
    <el-form-item label="重量(g)">
      <el-input placeholder="重量(g)" v-model="skuData.weight"></el-input>
    </el-form-item>
    <el-form-item label="SKU描述">
      <el-input
        type="textarea"
        placeholder="SKU描述"
        v-model="skuData.skuDesc"
      ></el-input>
    </el-form-item>
    <el-form-item label="平台属性">
      <el-form :inline="true" label-width="70px">
        <el-form-item
          :label="item.attrName"
          v-for="(item, idx) in spuAttrs"
          :key="item.id"
        >
          <el-select placeholder="请选择" v-model="item.addParamsData">
            <el-option
              v-for="(item1, idx) in item.attrValueList"
              :key="item1.id"
              :value="`${item1.attrId}:${item1.id}`"
              :label="item1.valueName"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="销售属性">
      <el-form :inline="true" label-width="70px">
        <el-form-item
          :label="item.saleAttrName"
          v-for="(item, idx) in spuSaleAttrs"
          :key="item.id"
        >
          <el-select placeholder="请选择" v-model="item.addSaleParam">
            <el-option
              v-for="(item1, idx) in item.spuSaleAttrValueList"
              :key="item1.id"
              :value="`${item1.baseSaleAttrId}:${item1.id}`"
              :label="item1.saleAttrValueName"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-form-item>
    <el-form-item label="图片名称">
      <el-table border :data="imgList" ref="imgTable">
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="图片">
          <template #default="{ row, $index }">
            <img :src="row.imgUrl" alt="" style="width: 50px; height: 50px" />
          </template>
        </el-table-column>
        <el-table-column label="名称" prop="imgName"></el-table-column>
        <el-table-column label="操作">
          <template #default="{ row, $index }">
            <el-button type="primary" @click="setDefaultImg(row)">
              设为默认图片
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="addSku">保存</el-button>
      <el-button type="primary" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang='ts' setup>
import { addSkuInfo } from "@/api/product/spu.ts"
import { getAttrs } from "@/api/product/prop.ts"
import { getSpuSaleAttr, getSpuImages } from "@/api/product/spu.ts"
import { ref } from "vue"
import { ElMessage } from "element-plus"
let $emit = defineEmits(["toList", "open"])
let skuData = ref({
  category3Id: "",
  spuId: "",
  tmId: "",
  skuName: "",
  price: "",
  weight: "",
  skuDesc: "",
  skuAttrValueList: [
    // {
    // attrId: "",
    // valueId: ""
    // }
  ],
  skuSaleAttrValueList: [
    // {
    //   saleAttrId: "",
    //   saleAttrValueId: ""
    // }
  ],
  skuDefaultImg: "",
})
//所有属性
let spuAttrs = ref([])
//售卖属性
let spuSaleAttrs = ref([])
//图片地址
let imgList = ref([])
let initSku = async (c1Id: number, c2Id: number, row: any) => {
  console.log(row, "row")
  //获取初始化数据
  skuData.value.spuId = row.id
  skuData.value.tmId = row.tmId
  skuData.value.category3Id = row.category3Id
  let r1 = await getAttrs(c1Id, c2Id, row.category3Id)
  let r2 = await getSpuSaleAttr(row.id)
  let r3 = await getSpuImages(row.id)
  spuAttrs.value = r1.data
  spuSaleAttrs.value = r2.data
  imgList.value = r3.data
}
//设置默认图片回调
let imgTable = ref(null)
let setDefaultImg = (row: any) => {
  imgList.value.forEach((item) => {
    imgTable.value.toggleRowSelection(item, false)
  })
  imgTable.value.toggleRowSelection(row, true)
  skuData.value.skuDefaultImg = row.imgUrl
}
//addSku 提交请求
let addSku = async () => {
  //数据处理
  skuData.value.skuAttrValueList = spuAttrs.value.reduce(
    (acc: any, item: any) => {
      if (item.addParamsData) {
        let [attrId, valueId] = item.addParamsData.split(":")
        acc.push({
          attrId,
          valueId,
        })
      }
      return acc
    },
    [],
  )
  skuData.value.skuSaleAttrValueList = spuSaleAttrs.value.reduce(
    (acc, item) => {
      if (item.addSaleParam) {
        let [saleAttrId, saleAttrValueId] = item.addSaleParam.split(":")
        acc.push({
          saleAttrId,
          saleAttrValueId,
        })
      }
      return acc
    },
    [],
  )
  //提交请求
  let result = await addSkuInfo(skuData.value)
  if (result.code === 200) {
    ElMessage({
      type: "success",
      message: "添加成功",
    })
    $emit("toList", { place: 0 })
    $emit("open")
  } else {
    ElMessage({
      type: "success",
      message: "添加失败",
    })
  }
}
let cancel = () => {
  $emit("toList", { place: 0,page: "update" })
  $emit("open")
}
defineExpose({
  initSku,
})
</script>
<style scoped lang='stylus'></style>