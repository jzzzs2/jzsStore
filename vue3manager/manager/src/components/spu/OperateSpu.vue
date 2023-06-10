<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-05-31 17:59:55
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-06-01 19:57:39
-->
<template>
  <el-form label-width="120px">
    <el-form-item label="spu名称">
      <el-input
        placeholder="请你输入SPU名称"
        v-model="requestData.spuName"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU品牌">
      <el-select v-model="requestData.tmId">
        <el-option
          v-for="(item, idx) in spuList"
          :key="idx"
          :label="item.tmName"
          :value="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="SPU描述">
      <el-input
        type="textarea"
        placeholder="请你输入描述"
        v-model="requestData.description"
      ></el-input>
    </el-form-item>
    <el-form-item label="SPU照片">
      <el-upload
        v-model:file-list="spuImgs"
        action="/api/admin/product/fileUpload"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :before-upload="validFile"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>
      <el-dialog v-model="dialogVisible">
        <img w-full :src="dialogImageUrl" alt="Preview Image" />
      </el-dialog>
    </el-form-item>
    <el-form-item label="SPU销售属性">
      <el-select
        :placeholder="
          notExistSaleAttrArr.length > 0
            ? `可选${notExistSaleAttrArr.length}个属性`
            : '無'
        "
        v-model="selectedAttr"
      >
        <el-option
          :label="item.name"
          v-for="(item, idx) in notExistSaleAttrArr"
          :key="item.id"
          :value="`${item.id}:${item.name}`"
        ></el-option>
      </el-select>
      <el-button
        icon="Plus"
        type="primary"
        :disabled="!selectedAttr"
        @click="addUnExistAttr"
      >
        添加销售属性
      </el-button>
      <el-table :data="spuExistAttr">
        <el-table-column
          width="100px"
          label="序号"
          type="index"
        ></el-table-column>
        <el-table-column label="属性名" prop="saleAttrName"></el-table-column>
        <el-table-column label="属性值">
          <template #default="{ row, $index }">
            <el-tag
              style="margin: 4px 6px"
              v-for="(item, idx) in row.spuSaleAttrValueList"
              :key="item.id"
              closable
              @close="row.spuSaleAttrValueList.splice(idx, 1)"
            >
              {{ item.saleAttrValueName }}
            </el-tag>
            <el-input
              v-model="addAttrValue"
              v-if="row.isEdit"
              @blur="addToValueList(row)"
              size="small"
              :input-style="{ width: '60px', display: 'inline' }"
            ></el-input>
            <el-button
              icon="Plus"
              type="primary"
              size="small"
              v-else
              @click="addValue(row)"
            ></el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="{ row, $index }">
            <el-button
              icon="Delete"
              type="error"
              size="small"
              @click="spuExistAttr.splice($index, 1)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="saveAndUpdate"
        :disabled="!spuExistAttr.length"
      >
        保存
      </el-button>
      <el-button type="primary" @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang='ts' setup>
import {
  spuSaleAttrArr,
  spuInfoList,
  spuImgs,
  saleAttrArr,
  spuImg,
  saleAttr,
  spuInfo,
  spuSaleAttr,
} from "@/api/product/spuType.ts"
import { computed, reactive, ref } from "vue"
import {
  getSpuNames,
  getSaleAttrs,
  getSpuImages,
  getSpuSaleAttr,
  updateOrAddSpu,
} from "@/api/product/spu.ts"
import { ElMessage } from "element-plus"
let $emit = defineEmits(["toList", "open"])
//校验文件类型
let validFile = (file: any) => {
  if (!file.type.includes("image")) {
    ElMessage({
      type: "error",
      message: "需要是图片文件",
    })
    return false
  }
  if (file.size > 1024 * 1024 * 4) {
    ElMessage({
      type: "error",
      message: "图片大小要小于4M",
    })
    return false
  }
  ElMessage({
    type: "success",
    message: "上传图片成功",
  })
}
//tag input的输入值
let addAttrValue = ref("")
//預覽圖死否顯示 預覽圖地址
let dialogVisible = ref(false)
let dialogImageUrl = ref("")
//表单松开回调
let addToValueList = (row: any) => {
  if (addAttrValue.value.trim().length === 0) {
    ElMessage({
      type: "error",
      message: "属性值不能为空",
    })
    return
  }
  row.spuSaleAttrValueList.push({
    saleAttrName: row.saleAttrName,
    baseSaleAttrId: row.baseSaleAttrId,
    saleAttrValueName: addAttrValue.value,
  })
  addAttrValue.value = ""
  row.isEdit = false
}
//預覽圖片的回調
let handlePictureCardPreview = (file) => {
  console.log(file, "file")
  dialogVisible.value = true
  dialogImageUrl.value = file.url
}
//返回 SPU展示页
let cancel = () => {
  $emit("toList", {place: 0,page: "update"})
  $emit("open")
  //cancel
}
//选择的属性
let selectedAttr = ref("")
//spuList
let spuList = ref<spuInfo[]>([])
//existSaleAttr
let spuExistAttr = ref<spuSaleAttr[]>([])
//all saleAttr
let saleAttr = ref<saleAttr[]>([])
//imgs
let spuImgs = ref<spuImg[]>([])
//显示输入框 输入新属性值
let addValue = (row: any) => {
  row.isEdit = true
}
//add requestData 存放發送請求的數據
let requestData = ref({
  category3Id: "",
  description: "",
  // id:372,
  spuImageList: null,
  spuName: "",
  spuSaleAttrList: null,
  tmId: "",
})
//添加属性
let addUnExistAttr = () => {
  let [id, name] = selectedAttr.value.split(":")
  spuExistAttr.value.push({
    saleAttrName: name,
    baseSaleAttrId: id,
    spuSaleAttrValueList: [],
  })
  selectedAttr.value = ""
}
//計算屬性：獲取不存在的售賣屬性
let notExistSaleAttrArr = computed(() => {
  return saleAttr.value.filter((item) => {
    return spuExistAttr.value.every((item1) => {
      return item1.saleAttrName !== item.name
    })
  })
})
let getSpuData = async (row: any) => {
  console.log(row, "发送请求")
  if (row) {
    requestData.value = row
  }
  let id = row.id
  //获得某个Spu的售卖属性
  let r0: spuSaleAttrArr = await getSpuSaleAttr(id)
  //获得Spu列表
  let r1: spuInfoList = await getSpuNames()
  //获得某个Spu的sku图组
  let r2: spuImgs = await getSpuImages(id)
  //获取Spu可选择的所有售卖属性
  let r3: saleAttrArr = await getSaleAttrs()
  spuList.value = r1.data
  spuExistAttr.value = r0.data
  saleAttr.value = r3.data
  spuImgs.value = r2.data.map((item) => {
    //  name: 'food.jpeg',
    // url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
    return {
      name: item.imgName,
      url: item.imgUrl,
    }
  })
  console.log(r0)
  console.log(r1)
  console.log(r2)
  console.log(r3)
  //
}
//提交数据
let saveAndUpdate = async (c3Id:number|string) => {
  requestData.value.spuImageList = spuImgs.value.map((item) => {
    return {
      imgUrl: item.response ? item.response.data : item.url,
      imgName: item.name,
    }
  })
  requestData.value.spuSaleAttrList = spuExistAttr.value
  let result = await updateOrAddSpu(requestData.value)
  console.log(result, "xxxx")
  if (result.code === 200) {
    ElMessage({
      type: "success",
      message: (requestData.value as any).id ? "修改成功" : "增加成功",
    })
    $emit("open")
    $emit("toList", {place: 0,page: (requestData.value as any).id?'update':'add'})
  } else {
    ElMessage({
      type: "success",
      message: (requestData.value as any).id ? "修改失败" : "增加失败",
    })
  }
}
//新增Spu初始化
let initSpuData = async (id:number) => {
  //清空老数据
  Object.assign(requestData.value, {
    category3Id: id,
    description: "",
    // id:372,
    spuImageList: null,
    spuName: "",
    spuSaleAttrList: null,
    tmId: "",
  })
  //imgList ExistAttr
  spuExistAttr.value = []
  spuImgs.value = []
  //获得Spu列表
  let r1: spuInfoList = await getSpuNames()
  //获取Spu可选择的所有售卖属性
  let r3: saleAttrArr = await getSaleAttrs()
  spuList.value = r1.data
  saleAttr.value = r3.data
}
defineExpose({
  getSpuData,
  initSpuData,
})
</script>
<style scoped lang='stylus'></style>


