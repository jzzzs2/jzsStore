/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-05-27 18:22:46
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-06-03 15:19:00
 */
import request from "@/util/request"
import { spuSaleAttrArr, spuInfoList, spuImgs, saleAttrArr } from "./spuType.ts"
enum API {
  spuList = "/admin/product/",
  saleArr = "/admin/product/baseSaleAttrList",
  spuImage = "/admin/product/spuImageList/",
  spuExistSaleAttr = "/admin/product/spuSaleAttrList/",
  allSpus = "/admin/product/baseTrademark/getTrademarkList",
  addSpu = "/admin/product/saveSpuInfo",
  updateSpu = "/admin/product/updateSpuInfo",
  addSku = "/admin/product/saveSkuInfo",
  skuList = "/admin/product/findBySpuId/",
  deleteSpu = "/admin/product/deleteSpu/"
  // {page}/{limit}
}
export const getAllSpu = (page: number, limit: number, id: number | string) => {
  return request.get(`${API["spuList"]}${page + '/' + limit + '?category3Id=' + id}`)
}
export const getSpuNames = () => {
  return request.get<any, spuInfoList>(API["allSpus"])
}
export const getSaleAttrs = () => {
  return request.get<any, saleAttrArr>(API["saleArr"])
}
export const getSpuImages = (id: string | number) => {
  return request.get<any, spuImgs>(`${API["spuImage"] + id}`)
}
export const getSpuSaleAttr = (id: string | number) => {
  return request.get<any, spuSaleAttrArr>(`${API["spuExistSaleAttr"] + id}`)
}
export const updateOrAddSpu = (data: any) => {
  if (data.id) {
    return request.post<any, any>(API["updateSpu"], data)
  } else {
    return request.post<any, any>(API["addSpu"], data)
  }
}
export const addSkuInfo = (data: any) => {
  return request.post<any,any>(API["addSku"],data)
}
export const pickSkuList = (id:number) => {
  return request.get<any,any>(`${API["skuList"] + id}`)
}
export const deleteOneSpu = (id:number) => {
  return request.delete<any,any>(`${API["deleteSpu"]+id}`)
}