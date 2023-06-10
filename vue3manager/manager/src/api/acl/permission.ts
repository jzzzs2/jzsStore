import request from "@/util/request"
import {PermissionRes,menuParams} from "./permissionType"
enum API {
  getRolePermissionList = "/admin/acl/permission",
  setRolePermission = "/admin/acl/permission/doAssign?",
  getOneRolePermission = "/admin/acl/permission/toAssign/",
  addMenu = "/admin/acl/permission/save",
  updateMenu = "/admin/acl/permission/update",
  deleteMenu = "/admin/acl/permission/remove/"
}
export const getRolePermissionList = () => {
  return request.get<any,PermissionRes>(API["getRolePermissionList"])
}
export const getOneRolePermission = (id:number) => {
  return request.get<any,PermissionRes>(API["getOneRolePermission"] + id)
}
export const setRolePermission = (roleId:number,permissionId:number[]) => {
  return request.post<any,any>(API["setRolePermission"] + `roleId=${roleId}&permissionId=${permissionId}`)
}
export const addOrUpdateMenu = (data:menuParams) => {
  if (data.id) {
    return request.put(API["updateMenu"],data)
  } else {
    return request.post(API["addMenu"],data)
  }
}
export const deleteMenu = (id:number) => {
  return request.delete(API["deleteMenu"] + id)
}
