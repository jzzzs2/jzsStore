<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-05-25 14:58:35
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-06-09 17:56:05
-->
<template>
  <el-card class="box-card">
    <el-button type="primary" icon="Plus" @click="addBrand" v-has="'btn.Trademark.add'">添加品牌</el-button>
    <!-- 表格展示数据 -->
    <el-table border :data="goodsArr">
      <el-table-column label="序号" width="100px" align="center" type="index" />
      <el-table-column label="商品名称" prop="tmName" align="center" />
      <el-table-column label="商品Logo" align="center">
        <template #default="{ row, $index }">
          <img
            :src="row.logoUrl"
            alt="图片不见惹"
            style="width: 120px; height: 120px"
          />
        </template>
      </el-table-column>
      <el-table-column label="商品操作" align="center">
        <template #default="{ row, $index }">
          <el-button
            type="primary"
            icon="Edit"
            size="small"
            @click="updateBrand(row)"
            v-has="'btn.Trademark.update'"
          ></el-button>
          <el-popconfirm title="真的要这样么?" @confirm="deleteBrand(row.id)">
            <template #reference>
              <el-button type="primary" icon="Delete" size="small" v-has="'btn.Trademark.remove'"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      v-model:current-page="pageNum"
      v-model:page-size="pageSize"
      :page-sizes="[3, 5, 7]"
      :small="false"
      :background="true"
      layout="prev, pager, next, jumper,->,sizes, total"
      :total="totalNum"
      @current-change="getGoodsList"
      @size-change="sizeChange"
    />
  </el-card>
  <el-dialog v-model="isShow" :title="brandData.id ? '修改品牌' : '添加品牌'">
    <el-form style="width: 70%" :model="brandData" :rules="rules" ref="form">
      <el-form-item label="品牌名称" prop="tmName">
        <el-input v-model="brandData.tmName"></el-input>
      </el-form-item>
      <el-form-item label="品牌Logo" prop="logoUrl">
        <el-upload
          class="avatar-uploader"
          action="api/admin/product/fileUpload"
          :show-file-list="false"
          :before-upload="beforeUpload"
          :on-success="uploadRes"
        >
          <img
            v-if="brandData.logoUrl"
            :src="brandData.logoUrl"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang='ts' setup>
import { ref, onMounted, reactive, nextTick } from "vue"
import { getGoods, updateOrAddGood, removeBrand } from "@/api/product/brand.ts"
import { ElMessage } from "element-plus"
import type { goodAddOrMod, goodOperateRes } from "@/api/product/type.ts"
let pageNum = ref(1)
let pageSize = ref(3)
let totalNum = ref(0)
let goodsArr = ref([])
// 添加框是否展示
let isShow = ref(false)
//添加品牌存储的数据
let brandData = reactive<goodAddOrMod>({
  tmName: "",
  logoUrl: "",
})
//获取表单元素
let form = ref()
//表单校验
let nameValid = (rule: any, value: any, callback: any) => {
  if (value.length <= 2) {
    callback(new Error("品牌名字长度要大于2哦"))
  } else {
    callback()
  }
}
let logoValid = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error("请先选择图片"))
    return
  }
  callback()
}
let rules = reactive({
  tmName: [{ required: true, trigger: "blur", validator: nameValid }],
  logoUrl: [{ required: true, validator: logoValid }],
})
//图片上传前回调
let beforeUpload = (file) => {
  // console.log(file,"file xxx")
  if (file.type.includes("image")) {
    if (file.size < 1024 * 1024 * 4) {
      return true
    } else {
      ElMessage({
        message: "文件大小不能超过4MB",
        type: "error",
      })
      return false
    }
  } else {
    ElMessage({
      message: "文件需要是图片类型",
      type: "error",
    })
    return false
  }
}
//图片上传成功回调
let uploadRes = (res: goodOperateRes) => {
  // console.log(res,"res")aaaaaaaaaaaaaaaaaaaaaaaaaaa
  brandData.logoUrl = res.data
}
//分页 得到当前页数据
let getGoodsList = async () => {
  let result = await getGoods(pageNum.value, pageSize.value)
  if (result.code === 200) {
    totalNum.value = result.data.total
    goodsArr.value = result.data.records
  }
}
let sizeChange = async () => {
  pageNum.value = 1
  getGoodsList()
}
onMounted(async () => {
  getGoodsList()
})
//打开模态框方法
let addBrand = () => {
  isShow.value = true
  brandData.id = ""
  //清除基本信息
  brandData.tmName = ""
  brandData.logoUrl = ""
  form.value.clearValidate("tmName")
  form.value.clearValidate("logoUrl")
}
//关闭模态框
let cancel = () => {
  isShow.value = false
}
//进行表单提交 添加品牌
let confirm = async () => {
  await form.value.validate()
  //先进行表单校验
  let result = await updateOrAddGood(brandData)
  // console.log(result, "result")
  if (result.code === 200) {
    //添加成功
    ElMessage({
      message: brandData.id ? "修改成功" : "添加成功",
      type: "success",
    })
    isShow.value = false
    getGoodsList()
  } else {
    //添加失败
    ElMessage({
      message: brandData.id ? "修改失败" : "添加失败",
      type: "error",
    })
  }
}
//更新brand
let updateBrand = async (row: any) => {
  isShow.value = true
  brandData.id = row.id
  brandData.tmName = row.tmName
  brandData.logoUrl = row.logoUrl
  nextTick(() => {
    //清除校验消息
    form.value.clearValidate("tmName")
    form.value.clearValidate("logoUrl")
  })
}
//删除brand
let deleteBrand = async (id: number) => {
  let result = await removeBrand(id)
  if (result.code === 200) {
    ElMessage({
      message: "删除成功",
      type: "success",
    })
    if (goodsArr.value.length < 2) {
      pageNum.value -= 1
    }
    getGoodsList()
  } else {
    ElMessage({
      message: "删除失败",
      type: "error",
    })
  }
}
</script>
<style scoped lang='scss'>
.box-card {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  & * {
    margin-top: 8px;
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>