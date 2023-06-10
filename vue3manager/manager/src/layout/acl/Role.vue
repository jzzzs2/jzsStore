<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-05-25 15:01:09
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-06-09 18:21:43
-->
<template>
  <el-card>
    <el-form :inline="true">
      <el-form-item label="角色名称">
        <el-input placeholder="角色名称" v-model="roleName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchRole">搜索</el-button>
        <el-button @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card stlye="margin:10px 0px">
    <el-button icon="Plus" type="primary" @click="addRole" v-has="'btn.Role.add'">添加角色</el-button>
    <el-table :data="roles" border style="margin: 10px 0px">
      <el-table-column label="#" type="index"></el-table-column>
      <el-table-column label="Id" prop="id"></el-table-column>
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="创建时间" prop="createTime"></el-table-column>
      <el-table-column label="更新时间" prop="updateTime"></el-table-column>
      <el-table-column label="操作" width="300px">
        <template #default="{ row, $index }">
          <el-button type="success" @click="setRoleRight(row)" v-has="'btn.Role.assgin'">分配权限</el-button>
          <el-button type="primary" @click="updateRole(row)" v-has="'btn.Role.update'">编辑</el-button>
          <el-button type="danger" v-has="'btn.Role.remove'">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      v-model:current-page="pageNum"
      v-model:page-size="pageSize"
      :page-sizes="[8, 10, 12]"
      :background="true"
      layout="prev, pager, next, jumper,->, sizes, total"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="getList"
    />
  </el-card>
  <!-- 添加或者编辑 信息 -->
  <el-dialog
    v-model="isShowDialog"
    :title="roleParam.id ? '修改' : '添加'"
    width="600px"
  >
    <el-form :model="roleParam" :rules="rules" ref="roleForm">
      <el-form-item label="角色名称" prop="roleName">
        <el-input
          placeholder="请填写角色名称"
          v-model="roleParam.roleName"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancelRole">取消</el-button>
        <el-button type="primary" @click="submitRole">确定</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 分配权限 抽屉 -->
  <el-drawer v-model="isShowRight">
    <template #header>
      <h4>权限分配</h4>
    </template>
    <template #default>
      <el-tree
        ref="tree"
        :data="rightList"
        show-checkbox
        node-key="id"
        :default-checked-keys="checkedRight"
        :props="defaultProps"
        default-expand-all
      />
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelRight">取消</el-button>
        <el-button type="primary" @click="submitRight">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script lang='ts' setup>
import { Role } from "@/api/acl/roleType.ts"
import { nextTick, onMounted, reactive, ref } from "vue"
import { getRolesList, addOrUpdateRole } from "@/api/acl/role.ts"
import navStoreFnc from "@/store/nav/show.ts"
import { ElMessage } from "element-plus"
import {getRolePermissionList,getOneRolePermission,setRolePermission} from "@/api/acl/permission.ts"
import {Permisstion,PermissionRes} from '@/api/acl/permissionType.ts'
let navStoreObj = navStoreFnc()
//分页组件数据
let pageSize = ref(8)
let pageNum = ref(1)
let total = ref(0)
let handleSizeChange = () => {
  getList()
}
onMounted(() => {
  getList()
})
// 存放rules数据
let roles = ref<Role[]>([])
// 搜索内容
let roleName = ref("")
// 获取roles 数据列表
let getList = async (page = 1) => {
  pageNum.value = page
  let result = await getRolesList(pageNum.value, pageSize.value, roleName.value)
  // console.log(result,"result")
  total.value = result.data.total
  roles.value = result.data.records
}
// 添加或更新Dialog
let isShowDialog = ref(false)
//添加 更新 参数
let roleParam = reactive<Role>({
  roleName: "",
})
//表单的验证rules
let roleNameValid = (role: any, value: any, callback: any) => {
  if (value?.trim().length > 2) {
    callback()
  } else {
    callback(new Error("名字长度要大于2哦"))
  }
}
let rules = {
  roleName: [{ required: true, trigger: "blur", validator: roleNameValid }],
}
//添加和更新回调
let addRole = () => {
  isShowDialog.value = true
  Object.assign(roleParam, {
    roleName: "",
    id: 0,
  })
  nextTick(() => {
    roleForm.value.clearValidate("roleName")
  })
}
let updateRole = (row: Role) => {
  isShowDialog.value = true
  Object.assign(roleParam, row)
  nextTick(() => {
    roleForm.value.clearValidate("roleName")
  })
}
// 获取Form元素
let roleForm = ref(null)
//添加更新 提交和取消按钮
let submitRole = async () => {
  await roleForm.value.validate()
  let result = await addOrUpdateRole(roleParam)
  console.log(result,"rrrrrrrRole");
  if (result.code === 200) {
    ElMessage({
      type: "success",
      message: roleParam.id ? "修改成功" : "添加成功",
    })
    isShowDialog.value = false
    getList(roleParam.id ? pageNum.value : 1)
  } else {
    ElMessage({
      type: "error",
      message: roleParam.id ? "修改失败" : "添加失败",
    })
  }
}
let cancelRole = () => {
  isShowDialog.value = false
}
// 搜索按钮回调
let searchRole = () => {
  getList()
  roleName.value = ""
}
let reset = () => {
  navStoreObj.isFresh = false
  nextTick(() => {
    navStoreObj.isFresh = true
  })
}
//权限分配 配置值
const defaultProps = {
  children: 'children',
  label: 'name'
}
//  tree数据源
let rightList = ref<Permisstion[]>([])
// 选中的数据源
let checkedRight = ref([])
// 是否显示 分配权限抽屉
let isShowRight = ref(false)
// 分配角色按钮回调
let setRoleRight = async (row:any) => {
  // console.log(row,"row")
  Object.assign(roleParam,row)
  isShowRight.value = true
  //获取所有权限
  let result: PermissionRes = await getRolePermissionList()
  rightList.value = result.data
  //获得该用户原有的权限
  let r1 :PermissionRes = await getOneRolePermission(row.id)
  // 获取已经选中的四级权限
  checkedRight.value = getIdList(r1.data,[])
  
}
// 收集所有本来存在的权限Id到数组中
let getIdList = (arr:Permisstion[],store:number[]) => {
  arr.forEach(item => {
    if (item.level==4 && item.select) {
      store.push(item.id)
    }
    if (item.children && item.children.length > 0) {
      getIdList(item.children,store)
    }
  })
  return store
}
let tree = ref(null)
// 抽屉确定取消按钮 回调
let submitRight = async () => {
  let id = roleParam.id
  // tree 获取所有选中的选项
  let arr1 = tree.value.getCheckedKeys()
  let arr2 = tree.value.getHalfCheckedKeys()
  // console.log(arr1)
  // console.log(arr2)
  let result = await setRolePermission(id,arr1.concat(arr2))
  if (result.code == 200) {
    isShowRight.value = false
    ElMessage({
      type: "success",
      message: "修改成功"
    })
    getList(pageNum.value)
  }
}
let cancelRight = () => {
  isShowRight.value = false
}
</script>
<style scoped lang='stylus'></style>