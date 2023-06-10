import request from "@/util/request"
import {userListRes,userParams} from "./userType"
enum API {
  userInfo = "/admin/acl/user/",
  addUser = "/admin/acl/user/save",
  updateUser = "/admin/acl/user/update"
}
export const getUserList = (pageNum:number,pageSize:number,username:string="") => {
  return request.get<any,userListRes>(API["userInfo"] + `${pageNum}/${pageSize}?username=${username}`)
}
export const updateOrAddUser = (data: userParams) => {
  if (data.id) {
    return request.put<any,any>(API["updateUser"],data)
  } else {
    return request.post<any,any>(API["addUser"],data)
  }
}