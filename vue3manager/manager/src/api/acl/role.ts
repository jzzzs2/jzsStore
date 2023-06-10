/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-06-05 17:08:19
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-06-06 15:14:13
 */
import request from "@/util/request"
import {setRoleParam,RoleAdminRes,Role} from "./roleType.ts"
enum API {
  setRole = "/admin/acl/user/doAssignRole",
  getRoles = "/admin/acl/user/toAssign/",
  deleteUser = "/admin/acl/user/remove/",
  // adminId path
  deleteUsers = "/admin/acl/user/batchRemove",
  getAllRoles = "/admin/acl/role/",
  // query : roleName  page limit
  addRole = "/admin/acl/role/save",
  updateRole = "/admin/acl/role/update",
}
export const getAdminRoles = (id:number) => {
  return request.get<any,RoleAdminRes>(API["getRoles"] + id)
}
export const updateAdminRole = (data:setRoleParam) => {
  return request.post<any,any>(API["setRole"],data)
}
export const deleteOneAdmin = (id: number) => {
  return request.delete<any,any>(API["deleteUser"] + id)
}
export const deleteManyAdmin =  (arr:any) => {
  return request.delete<any,any>(API["deleteUsers"],{
    data: arr
  })
}
export const getRolesList = (page:number,limit:number,roleName: string="") => {
  return request.get<any,any>(API["getAllRoles"] + `${page}/${limit}?roleName=${roleName}`)
}
export const addOrUpdateRole = (data:Role) => {
  if (data.id) {
    return request.put<any,any>(API["updateRole"],data)
  } else {
    return request.post<any,any>(API["addRole"],data)
  }
}
