/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-05-27 18:22:53
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-05-29 13:30:36
 */
import request from "@/util/request"
import type {goodAddOrMod,goodOperateRes} from "@/api/product/type.ts"
enum API {
  pagenation = "/admin/product/baseTrademark/",
  addBrand = "/admin/product/baseTrademark/save",
  modiBrand = "/admin/product/baseTrademark/update",
  deleteBrand = "/admin/product/baseTrademark/remove/"
  // GET /admin/product/fileUpload 图片上传接口
}
export const getGoods = (page:number,size:number) => {
  return request.get(`${API["pagenation"]}${page}/${size}`)
}
export const updateOrAddGood = (data :goodAddOrMod) => {
  if (data.id) {
    return request.put<any,goodOperateRes>(API["modiBrand"],data)
  } else {
    return request.post<any,goodOperateRes>(API["addBrand"],data)
  }
}
export const removeBrand = (id:number) => {
  return request.delete(`${API["deleteBrand"] + id}`)
}