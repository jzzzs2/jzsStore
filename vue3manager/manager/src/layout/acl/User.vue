<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-05-25 15:00:53
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-06-09 17:48:43
-->
<!--
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-05-25 15:00:53
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-06-05 17:53:26
-->
<template>
  <el-card>
    <el-form :inline="true" class="formsearch">
      <el-form-item label="用户名:">
        <el-input placeholder="请输入用户名" v-model="searchValue"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchHandle">搜索</el-button>
        <el-button type="info" @click="reset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <!--  -->
  <el-card style="margin: 10px 0px">
    <el-button type="primary" @click="addUser">添加</el-button>
    <el-button type="danger" @click="deleteSelected">批量删除</el-button>
    <el-table border style="margin: 6px 0px" :data="userArr" @selection-change="tableChange">
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="#" type="index"></el-table-column>
      <el-table-column label="Id" prop="id" align="center"></el-table-column>
      <el-table-column
        label="用户名字"
        show-overflow-tooltip
        prop="username"
        align="center"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="用户名称"
        prop="name"
        align="center"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="用户角色"
        prop="roleName"
        align="center"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="创建时间"
        prop="createTime"
        align="center"
      ></el-table-column>
      <el-table-column
        show-overflow-tooltip
        label="更新时间"
        prop="updateTime"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" width="320px">
        <template #default="{ row, $index }">
          <el-button icon="User" type="primary" @click="setRole(row)" v-has="'btn.User.add'">
            分配角色
          </el-button>
          <el-button icon="Edit" type="primary" @click="updateUser(row)" v-has="'btn.Role.update'">
            编辑
          </el-button>
          <el-popconfirm @confirm="deleteOneRole(row)" title="确定要删除我么?">
            <template #reference>
              <el-button
                icon="Delete"
                type="danger"
                v-has="'btn.Role.remove'"
              >
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      v-model:current-page="pageNum"
      v-model:page-size="pageSize"
      :page-sizes="[5, 7, 9, 11]"
      :background="true"
      layout="prev, pager, next, jumper,->, sizes,total"
      :total="total"
      @current-change="getUsers"
      @size-change="sizeHandle"
    />
  </el-card>
  <!-- 抽屉栏目 -->
  <el-drawer v-model="isShowDrawer">
    <template #header>
      <h4>{{ userInfo.id ? "修改用户" : "添加用户" }}</h4>
    </template>
    <template #default>
      <el-form :model="userInfo" :rules="rules" ref="formDrawer">
        <el-form-item label="用户姓名" prop="username">
          <el-input
            placeholder="请填写用户名字"
            v-model="userInfo.username"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="name">
          <el-input
            placeholder="请填写用户昵称"
            v-model="userInfo.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password" v-if="!userInfo.id">
          <el-input
            placeholder="请填写用户密码"
            v-model="userInfo.password"
          ></el-input>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelUser">取消</el-button>
        <el-button type="primary" @click="submitUser">确定</el-button>
      </div>
    </template>
  </el-drawer>
  <!-- 抽屉 分配角色 -->
  <el-drawer v-model="roleDrawer" :direction="direction">
    <template #header>
      <h4>分配职位</h4>
    </template>
    <template #default>
      <el-form>
        <el-form-item label="用户姓名">
          <el-input :disabled="true" v-model="userInfo.username"></el-input>
        </el-form-item>
        <el-form-item label="职位列表">
          <el-checkbox
            v-model="isCheckAll"
            :indeterminate="isIndeterminate"
            @change="changeAll"
          >
            全选
          </el-checkbox>
          <el-checkbox-group v-model="ownRole" @change="changeOne">
            <el-checkbox v-for="role in allRole" :key="role.id" :label="role">
              {{ role.roleName }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelRole">取消</el-button>
        <el-button type="primary" @click="submitRole">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script lang='ts' setup>
import { Role } from "@/api/acl/roleType.ts"
import { nextTick, onMounted, reactive, ref } from "vue"
import { userList, userListRes, User, userParams } from "@/api/acl/userType.ts"
import { getUserList, updateOrAddUser } from "@/api/acl/user.ts"
import {
  updateAdminRole,
  getAdminRoles,
  deleteOneAdmin,
  deleteManyAdmin
} from "@/api/acl/role.ts"
import { ElMessage } from "element-plus"
import navStoreFnc from "@/store/nav/show.ts"
let navStoreObj = navStoreFnc()
//分页 页数
let pageNum = ref(1)
//分页 每页数量
let pageSize = ref(5)
//数量总量
let total = ref(0)
//usersList
let userArr = ref<userList>([])
onMounted(() => {
  //发送请求
  getUsers()
})
//获取某个分页的数据方法
let getUsers = async (page = 1) => {
  pageNum.value = page
  let result: userListRes = await getUserList(pageNum.value, pageSize.value,  searchValue.value)
  // 获取数据
  userArr.value = result.data.records
  total.value = result.data.total
}
//每页数量发生变化
let sizeHandle = () => {
  getUsers()
}
//修改和新增表单数据结构
let userInfo = reactive<userParams>({
  username: "",
  name: "",
  password: "",
})
// 校验规则函数
let userNameValid = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 5) {
    callback()
  } else {
    callback(new Error("用户名长度不小于5哦"))
  }
}
let nameValid = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 5) {
    callback()
  } else {
    callback(new Error("昵称长度不小于5哦"))
  }
}
let pwdValid = (rule: any, value: any, callback: any) => {
  if (value.trim().length >= 6) {
    callback()
  } else {
    callback(new Error("密码长度不小于6哦"))
  }
}
//校验规则对象
let rules = {
  username: [{ required: true, trigger: "blur", validator: userNameValid }],
  name: [{ required: true, trigger: "blur", validator: nameValid }],
  password: [{ required: true, trigger: "blur", validator: pwdValid }],
}
//抽屉是否显示
let isShowDrawer = ref(false)
//新增User 按钮回调
//更新User 按钮回调
let addUser = () => {
  isShowDrawer.value = true
  Object.assign(userInfo, {
    username: "",
    name: "",
    password: "",
    id: 0,
  })
  nextTick(() => {
    formDrawer.value.clearValidate("username")
    formDrawer.value.clearValidate("name")
    formDrawer.value.clearValidate("password")
  })
}
let updateUser = (row: User) => {
  isShowDrawer.value = true
  //复制信息
  console.log(row, "row")
  Object.assign(userInfo, row)
  nextTick(() => {
    formDrawer.value.clearValidate("username")
    formDrawer.value.clearValidate("name")
  })
}
//获取抽屉中表单元素
let formDrawer = ref(null)
//抽屉提交按钮回调
let submitUser = async () => {
  await formDrawer.value.validate()
  console.log("校验成功")
  //发送请求
  let result = await updateOrAddUser(userInfo)
  // console.log(result,"xxxxx")
  if (result.code === 200) {
    ElMessage({
      type: "success",
      message: userInfo.id ? "修改成功" : "添加成功",
    })
    isShowDrawer.value = false
    if (userInfo.id) {
      window.location.reload()
      return
    }
    getUsers()
  } else {
    ElMessage({
      type: "error",
      message: userInfo.id ? "修改失败" : "添加失败",
    })
  }
}
//抽屉取消按钮回调
let cancelUser = () => {
  isShowDrawer.value = false
}
//分配角色 复选框数据
let allRole = ref<Role[]>([])
let ownRole = ref<Role[]>([])
//分配角色 抽屉
let roleDrawer = ref(false)
//全选 是否
let isCheckAll = ref(false)
//是否显示不稳定状态
let isIndeterminate = ref(true)
//分配角色 按钮 回调
let setRole = async (row: any) => {
  roleDrawer.value = true
  // console.log(row,"row")
  //保存用户Id等数据
  Object.assign(userInfo, row)
  let result = await getAdminRoles(row.id)
  console.log(result, "result")
  allRole.value = result.data.allRolesList
  ownRole.value = result.data.assignRoles
}
//分配角色 全选
let changeAll = (value: any) => {
  // console.log(value,"value")
  isIndeterminate.value = false
  value ? (ownRole.value = allRole.value) : (ownRole.value = [])
}
let changeOne = () => {
  if (allRole.value.length === ownRole.value.length) {
    isIndeterminate.value = false
    isCheckAll.value = true
  } else {
    isIndeterminate.value = true
  }
}
//分配角色 提交取消
let cancelRole = () => {
  roleDrawer.value = false
}
let updateParam = reactive({
  userId: 0,
  roleIdList: [],
})
let submitRole = async () => {
  updateParam.userId = userInfo.id
  updateParam.roleIdList = ownRole.value.map((item) => {
    return item.id
  })
  let result = await updateAdminRole(updateParam)
  console.log(result, "result")
  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: "修改成功",
    })
    roleDrawer.value = false
    getUsers(pageNum.value)
  } else {
    ElMessage({
      type: "success",
      message: "修改失败",
    })
  }
}
//删除一个user
let deleteOneRole = async (row: any) => {
  let result = await deleteOneAdmin(row.id)
  if (result.code === 200) {
    ElMessage({
      type: "success",
      message: "删除成功",
    })
    //
    getUsers(userArr.value.length > 1 ? pageNum.value : pageNum.value - 1)
  } else {
    ElMessage({
      type: "error",
      message: "系统数据不能删除",
    })
  }
}
let deleteArr = ref([])
// 删除选中的所有
let deleteSelected = async () => {
  let list = deleteArr.value.map(item => {
    return item.id
  })
  let result = await deleteManyAdmin(list)
  if (result.code === 200) {
    ElMessage({
      type: "success",
      message: "删除成功"
    })
    getUsers(userArr.value.length - list.length > 0 ? pageNum.value : pageNum.value - 1)
  } else {
    ElMessage({
      type: "success",
      message: "删除失败"
    })
  }  
}
//表格选中项 改变回调
let tableChange = (arr:any) => {
  // console.log(arr,"arr");
  deleteArr.value = arr
}
//搜索框 内容
let searchValue = ref()
//搜索按钮回调
let searchHandle = () => {
  getUsers()
  searchValue.value = ""
}
let reset = () => {
  searchValue.value = ""
  navStoreObj.isFresh = false
  nextTick(() => {
    navStoreObj.isFresh = true
  })
}
</script>
<style scoped lang='scss'>
.formsearch {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>