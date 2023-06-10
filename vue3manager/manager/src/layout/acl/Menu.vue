<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-05-25 15:01:35
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-06-09 17:57:07
-->
<template>
  <el-table :data="tableRights" style="width: 90%" row-key="id" border>
    <el-table-column prop="name" label="名称" />
    <el-table-column prop="code" label="权限值" />
    <el-table-column prop="updateTime" label="修改时间" />
    <el-table-column prop="address" label="操作">
      <template #default="{ row, $index }">
        <el-button
          size="small"
          type="primary"
          :disabled="row?.level == 4"
          @click="addMenu(row)"
          v-has="'btn.Permission.add'"
        >
          {{ row.level == 3 ? "添加功能" : "添加菜单" }}
        </el-button>
        <el-button
          size="small"
          type="primary"
          :disabled="row.level == 1"
          @click="updateMenu(row)"
          v-has="'btn.Permission.update'"
        >
          编辑
        </el-button>
        <el-popconfirm title="确定要删除我么" @confirm="removeMenu(row)">
          <template #reference>
            <el-button
          size="small"
          type="danger"
          :disabled="row.level == 1"
          v-has="'btn.Permission.remove'"
        >
          删除
        </el-button>
          </template>
        </el-popconfirm>
        
      </template>
    </el-table-column>
  </el-table>
  <!-- 修改 新增 框 -->
  <el-dialog v-model="isShowMenuDig" :title="menuParam.id ? '修改' : '添加'">
    <el-form :model="menuParam">
      <el-form-item label="名称">
        <el-input placeholder="请填写名称" v-model="menuParam.name"></el-input>
      </el-form-item>
      <el-form-item label="权限值">
        <el-input
          placeholder="请填写权限值"
          v-model="menuParam.code"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelMenu">取消</el-button>
        <el-button type="primary" @click="submitMenu">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang='ts' setup>
import { onMounted, reactive, ref } from "vue"
import {
  getRolePermissionList,
  addOrUpdateMenu,
  deleteMenu,
} from "@/api/acl/permission.ts"
import { menuParams } from "@/api/acl/permisstionType.ts"
import { ElMessage } from "element-plus"
// 表格所需要的数据
let tableRights = ref([])
onMounted(async () => {
  getPermissions()
})
let getPermissions = async () => {
  let result = await getRolePermissionList()
  // console.log(result,"xx")
  tableRights.value = result.data
}
// 新增 修改 Dialog 显示数据
let isShowMenuDig = ref(false)
// 新增 修改菜单 按钮回调
let addMenu = (row: any) => {
  Object.assign(menuParam, {
    pid: 0,
    level: "",
    code: "",
    name: "",
    id: 0,
  })
  menuParam.pid = row.id
  menuParam.level = row.level + 1
  isShowMenuDig.value = true
}
let updateMenu = (row: any) => {
  Object.assign(menuParam, row)
  isShowMenuDig.value = true
}
// 新增修改 数据结构
let menuParam = reactive<menuParams>({
  pid: 0,
  level: "",
  code: "",
  name: "",
})
// 新增修改 按钮 回调
let submitMenu = async () => {
  let result = await addOrUpdateMenu(menuParam)
  console.log(result, "resultxxx")
  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: menuParam.id ? "修改成功" : "添加成功",
    })
    isShowMenuDig.value = false
    // 获取新数据
    getPermissions()
  } else {
    ElMessage({
      type: "success",
      message: menuParam.id ? "修改失败" : "添加失败",
    })
  }
}
let cancelMenu = () => {
  isShowMenuDig.value = false
}
// 删除menu 按钮回调
let removeMenu = async (row: any) => {
  // console.log(row,"row")
  let result = await deleteMenu(row.id)
  // console.log(result,"xxx")
  if (result.code == 200) {
    ElMessage({
      message: "删除成功",
      type: "success",
    })
    getPermissions()
    // window.location.reload()
  } else {
    ElMessage({
      message: "删除失败",
      type: "error",
    })
  }
}
</script>
<style scoped lang='stylus'></style>