/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-05-27 18:22:59
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-05-30 15:50:01
 */
import request from "@/util/request"
import {responseType,responseAttr,Attr} from "@/api/product/propType"
enum API {
  c1 = "/admin/product/getCategory1",
  c2 = "/admin/product/getCategory2/",
  c3 = "/admin/product/getCategory3/",
  attr = "/admin/product/attrInfoList/",
  addOrUpdate = "/admin/product/saveAttrInfo",
  delete = "/admin/product/deleteAttr/"
}
export const getC1 = () => {
  return request.get<any,responseType>(API["c1"])
}
export const getC2 = (id:number|string) => {
  return request.get<any,responseType>(`${API["c2"]}${id}`)
}
export const getC3 = (id:number|string) => {
  return request.get<any,responseType>(`${API["c3"]}${id}`)
}
export const getAttrs = (c1 :number|string,c2:number|string,c3:number|string) => {
  return request.get<any,responseAttr>(`${API["attr"]}${c1}/${c2}/${c3}`)
}
export const updateOrAddAttr = (data: Attr) => {
  return request.post<any,any>(API["addOrUpdate"],data)
}
export const deleteAttr = (attrId:number) => {
  return request.delete<any,any>(`${API["delete"] + attrId}`)
}