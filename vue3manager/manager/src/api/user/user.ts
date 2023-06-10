import request from "@/util/request"
import { loginData,infoType } from "./type"

enum apiMap {
  login = "/admin/acl/index/login",
  info = "/admin/acl/index/info",
  logout = "/admin/acl/index/logout"
}
export const loginOperate = (data: loginData): any => {
  // return request({
  //   url: apiMap["login"],
  //   method: "post",
  //   data
  // })
  return request.post(apiMap["login"],data)
}
export const getUserInfo = () => {
  // return request({
  //   url: apiMap["info"],
  //   method: "get",
  //   // headers: {
  //   //   token: token
  //   // }
  // })
  return request.get<any,infoType>(apiMap["info"])
}
export const logoutUser = () => {
  return request.post(apiMap["logout"])
}
