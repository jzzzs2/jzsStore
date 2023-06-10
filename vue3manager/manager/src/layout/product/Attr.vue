<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-05-25 14:59:06
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-06-03 15:34:55
-->
<template>
  <el-card>
    <Cate :abled="abled"></Cate>
  </el-card>
  <el-card>
    <div v-if="isList">
      <el-button
        icon="Plus"
        type="primary"
        :disabled="!cateStoreObj.c3Id"
        @click="addProp"
        v-has="'btn.Attr.add'"
      >
        添加属性
      </el-button>
      <el-table
        :data="attrs"
        style="width: 100%"
        border
        :style="{ marginTop: '8px' }"
      >
        <el-table-column label="序号" width="120" align="center" type="index" />
        <el-table-column
          label="属性名称"
          width="220"
          align="center"
          prop="attrName"
        />
        <el-table-column label="属性值名称">
          <template #default="{ row, $index }">
            <el-tag
              class="ml-2"
              type="success"
              v-for="(item, idx) in row.attrValueList"
              :key="idx"
              :style="{ marginLeft: '4px' }"
            >
              {{ item.valueName }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220" align="center">
          <template #default="{ row, $index }">
            <el-button
              icon="Edit"
              type="primary"
              @click="updatePropAndValue(row)"
              v-has="'btn.Attr.update'"
            ></el-button>
            <el-popconfirm title="真的要删除我么" @confirm="deleteProp(row)" width="170px">
              <template #reference>
                <el-button
                  icon="Delete"
                  type="primary"
                  v-has="'btn.Attr.remove'"
                ></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-else>
      <el-form>
        <el-form-item label="属性名称">
          <el-input
            style="width: 300px"
            placeholder="请输入属性名称"
            v-model="propAddOrUpdate.attrName"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button
        icon="Plus"
        type="primary"
        :disabled="!propAddOrUpdate.attrName.trim()"
        @click="addPropValue"
      >
        添加属性值
      </el-button>
      <el-button type="primary" @click="back">取消</el-button>
      <el-table
        :data="propAddOrUpdate.attrValueList"
        style="width: 100%; margin: 10px 0"
        border
      >
        <el-table-column type="index" label="序号" width="180" />
        <el-table-column label="属性值名称">
          <template #default="{ row, $index }">
            <el-input
              v-model="row.valueName"
              v-if="row.isEdit"
              @blur="showDiv(row)"
              :ref="autoFocu"
            ></el-input>
            <div v-else @click="clickDiv(row)">
              {{ row.valueName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="属性值操作">
          <template #default="{ $index }">
            <el-button
              icon="DeleteFilled"
              type="info"
              @click="deleteValue($index)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button
        type="primary"
        :disabled="propAddOrUpdate.attrValueList.length > 0 ? false : true"
        @click="save"
      >
        保存
      </el-button>
      <el-button type="primary" @click="back">取消</el-button>
    </div>
  </el-card>
</template>

<script lang='ts' setup>
import { Attr } from "@/api/product/propType.ts"
import { getAttrs, updateOrAddAttr, deleteAttr } from "@/api/product/prop.ts"
import Cate from "@/components/cate/cate.vue"
//分类数据仓库
import cateStore from "@/store/cate/cate.ts"
import { ElMessage } from "element-plus"
import { onUnmounted, reactive, ref, watch } from "vue"
let cateStoreObj = cateStore()
let abled = ref(false)
//监听仓库中c3Id,改变就获取数据
watch(
  () => cateStoreObj.c3Id,
  (newV, oldV) => {
    // console.log(newV,oldV,"xx")
    if (cateStoreObj.c3Id) {
      getAttr()
    }
  },
)

//存储更新或新增属性的数据结构
let propAddOrUpdate = reactive<Attr>({
  attrName: "",
  attrValueList: [],
  categoryId: "",
  categoryLevel: 3,
})
// {
//   "attrId": 0, none
//   "id": 0, none
//   "valueName": "string"
// }

//存储所有属性列表数据
let attrs = ref([])
//新增属性按钮事件
let addProp = () => {
  isList.value = false
  Object.assign(propAddOrUpdate, {
    attrName: "",
    attrValueList: [],
    categoryId: "",
    categoryLevel: 3,
  })
  abled.value = true
}
//更新属性 属性值 按钮的回调
let updatePropAndValue = (row: Attr) => {
  isList.value = false
  console.log(JSON.stringify(row), "str")
  Object.assign(propAddOrUpdate, JSON.parse(JSON.stringify(row)))
  abled.value = true
}
//新增属性 属性值的事件回调
let addPropValue = () => {
  propAddOrUpdate.attrValueList.push({
    valueName: "",
    isEdit: true,
  })
}
//删除一条属性
let deleteProp = async (row: Attr) => {
  let result = await deleteAttr(row.id)
  if (result.code === 200) {
    ElMessage({
      type: "success",
      message: "删除成功",
    })
    getAttr()
  } else {
    ElMessage({
      type: "error",
      message: "删除失败",
    })
  }
}
// 修改属性值后 blur事件回调
let showDiv = (row: Attr) => {
  if (row.valueName.trim().length === 0) {
    return
  }
  row.isEdit = false
}
//自动聚焦
let autoFocu = (vc: any) => {
  console.log(vc, "xxx")
  if (vc) {
    vc.focus()
  }
}
//点击div后 显示修改属性值的input
let clickDiv = (row: any) => {
  row.isEdit = true
}
//取消按钮回调 返回属性列表页面
let back = () => {
  isList.value = true
  abled.value = false
}
//是否显示属性列表|修改新增属性
let isList = ref(true)
let getAttr = async () => {
  let result = await getAttrs(
    cateStoreObj.c1Id,
    cateStoreObj.c2Id,
    cateStoreObj.c3Id,
  )
  // console.log(result,"resultxxx")
  if (result.code === 200) {
    //获取属性和属性值成功
    attrs.value = result.data
  }
}
//删除一条属性值
let deleteValue = (index: number) => {
  propAddOrUpdate.attrValueList.splice(index, 1)
}
//提交新的属性信息
let save = async () => {
  propAddOrUpdate.categoryId = cateStoreObj.c3Id
  let result = await updateOrAddAttr(propAddOrUpdate)
  console.log(result, "resultxxxx")
  if (result.code === 200) {
    ElMessage({
      message: propAddOrUpdate.id ? "修改成功" : "添加成功",
      type: "success",
    })
    getAttr()
    isList.value = true
    abled.value = false
  } else {
    ElMessage({
      message: propAddOrUpdate.id ? "修改失败" : "添加失败",
      type: "error",
    })
  }
}
onUnmounted(() => {
  cateStoreObj.$reset()
  // console.log(cateStoreObj.$reset,"reset")
})
</script>
<style scoped lang='scss'>
</style>