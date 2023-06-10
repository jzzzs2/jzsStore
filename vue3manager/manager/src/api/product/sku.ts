import request from "@/util/request"
enum API {
  skuList = "/admin/product/list/",
  // {page}/{limit}
  skuOff = "/admin/product/cancelSale/",
  skuOn = "/admin/product/onSale/",
  deleteSku = "/admin/product/deleteSku/",
  skuInfo = "/admin/product/getSkuInfo/"
}
export const getSkusList = (page:number,limit:number) => {
  return request.get(`${API["skuList"]}${page}/${limit}`)
}
export const setSkuOn = (id:number) => {
  return request.get(`${API["skuOn"] + id}`)
}
export const setSkuOff = (id:number) => {
  return request.get(`${API["skuOff"] + id}`)
}
export const deleteOneSku = (id:number) => {
  return request.delete(`${API["deleteSku"] + id}`)
}
export const getSkuInfo = (id:number) => {
  return request.get(`${API["skuInfo"] + id}`)
}
