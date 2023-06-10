/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-06-05 17:08:34
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-06-05 17:20:25
 */
interface roleRes {
  code: number
  message: string
  ok: boolean
}
export interface Role {
  id?: number
  createTime?: string
  updateTime?: string
  roleName: string
  remark: null
}
export interface RoleAdminRes extends roleRes{
  data: {
    assignRoles: Role [],
    allRolesList: Role []
  }
}
export interface setRoleParam {
  roleIdList: number[]
  userId: number
}