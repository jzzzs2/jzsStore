<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-05-25 14:59:47
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-06-09 18:11:27
-->
<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-05-25 14:59:47
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-05-31 17:58:32
-->
<template>
  <el-card>
    <Cate :abled="abled" />
  </el-card>
  <el-card>
    <div v-show="view == 0">
      <el-button
        icon="Plus"
        type="primary"
        :disabled="!cateObj.c3Id"
        @click="addSpu"
        v-has="'btn.Spu.add'"
      >
        添加SPU
      </el-button>
      <el-table border style="margin: 10px 0" :data="records">
        <el-table-column
          label="序号"
          type="index"
          width="120px"
        ></el-table-column>
        <el-table-column label="SPU名称" prop="spuName"></el-table-column>
        <el-table-column
          show-overflow-tooltip
          label="SPU描述"
          prop="description"
        ></el-table-column>
        <el-table-column label="SPU操作">
          <template #default="{ row, $index }">
            <el-button
              icon="Plus"
              type="primary"
              size="small"
              @click="addSku(row)"
              v-has="'btn.Spu.addsku'"
            ></el-button>
            <el-button
              icon="Edit"
              v-has="'btn.Spu.update'"
              type="primary"
              size="small"
              @click="editCpu(row)"
            ></el-button>
            <el-button icon="View" type="primary" size="small" @click="selectSkus(row)" v-has="'btn.Spu.skus'"></el-button>
            <el-button icon="Delete" type="primary" size="small" @click="deleteSpu(row)" v-has="'btn.Sku.remove'"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="pageNum"
        v-model:page-size="size"
        :page-sizes="[3, 5, 7, 9]"
        :background="true"
        layout="prev, pager, next, jumper,->, sizes,total"
        :total="total"
        @size-change="sizeChange"
        @current-change="getAllSpus"
      />
    </div>
    <OpSpu v-show="view == 1" ref="spuUpdate" @toList="setView" @open="open" />
    <OpSku v-show="view == 2" ref="skuAdd" @open="open" @toList="setView" />
    <!-- 显示某个Spu 的sku列表 -->
    <el-dialog
      v-model="showSkuInfo"
      title="SKU列表"
      width="60%"
      align-center
    >
      <el-table border :data="skuList">
        <el-table-column label="sku名字" show-overflow-tooltip prop="skuName"></el-table-column>
        <el-table-column label="sku价格" prop="price"></el-table-column>
        <el-table-column label="sku重量" prop="weight"></el-table-column>
        <el-table-column label="sku图片">
          <template #default="{row,$index}">
            <img :src="row.skuDefaultImg" alt="" style="width:100px;height:100px">
          </template>
        </el-table-column>
      </el-table>      
    </el-dialog>
  </el-card>
</template>

<script lang='ts' setup>
import OpSpu from "@/components/spu/OperateSpu.vue"
import OpSku from "@/components/spu/OperateSku.vue"
import Cate from "@/components/cate/cate.vue"
import { getAllSpu,pickSkuList,deleteOneSpu } from "@/api/product/spu.ts"
import { onMounted, onUnmounted, ref, watch } from "vue"
import cateObjFnc from "@/store/cate/cate.ts"
import { ElMessage } from "element-plus"
let cateObj = cateObjFnc()
let size = ref(3)
let pageNum = ref(1)
let abled = ref(false)
let total = ref(0)
let records = ref<any>([])
//显示spu的skuInfo信息
let showSkuInfo = ref(false)
//skuList存放
let skuList = ref([])
//显示skuinfo信息 按钮回调
let selectSkus = async (row:any) => {
  showSkuInfo.value = true
  let result = await pickSkuList(row.id)
  // console.log(result,"resultx");
  skuList.value = result.data
}
//delete spu事件回调
let deleteSpu = async (row:any) => {
  let result = await deleteOneSpu(row.id)
  if (result.code === 200) {
    ElMessage({
      type: "success",
      message: "删除成功"
    })
    getAllSpus(records.value.length>1?pageNum.value:pageNum.value - 1)
  } else {
    ElMessage({
      type: "error",
      message: "系统数据不能删除捏"
    })
  }
}
//sku组件
let skuAdd = ref(null)
let getAllSpus = async (page = 1) => {
  pageNum.value = page
  let result = await getAllSpu(pageNum.value, size.value, cateObj.c3Id)
  // console.log(result, "resultxxx")
  if (result.code === 200) {
    records.value = result.data.records
    total.value = result.data.total
  }
}
let open = () => {
  abled.value = false
}
//显示那一块内容  场景值
let view = ref(0)
//getList
watch(
  () => cateObj.c3Id,
  (newV) => {
    getAllSpus()
  },
)
//
let sizeChange = () => {
  getAllSpus()
}
//获取SPU修改新增子组件
let spuUpdate = ref(null)
//修改SPU内容
let editCpu = (row: any) => {
  abled.value = true
  //获取子组件并执行获取请求的方法
  view.value = 1
  // console.log(spuUpdate,"xxx")
  spuUpdate.value.getSpuData(row)
}
//传入其他页面 子组件 取消按钮的 emit触发事件 回调
let setView = ({ place, page }) => {
  view.value = place
  if (page === "update") {
    getAllSpus(pageNum.value)
  } else {
    getAllSpus()
  }
}
//新增Spu 按钮回调
let addSpu = () => {
  abled.value = true
  view.value = 1
  spuUpdate.value.initSpuData(cateObj.c3Id)
}
//新增Sku
let addSku = (row: any) => {
  view.value = 2
  abled.value = true
  //sku界面初始化
  skuAdd.value.initSku(cateObj.c1Id, cateObj.c2Id, row)
}
onUnmounted(() => {
  cateObj.$reset()
})
</script>
<style scoped lang='scss'>
</style>