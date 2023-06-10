/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-05-31 19:09:39
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-05-31 19:23:16
 */
interface responseType {
  code: number
  message: string
  ok: boolean
}
export interface saleAttr {
  id?: number
  name: string
}
export interface saleAttrArr extends responseType{
  data: saleAttr[]
}
export interface spuImg {
  id?: number
  imgName: string
  imgUrl: string
  spuId: number
}
export interface spuImgs extends responseType{
  data: spuImg []
}
export interface spuInfo {
  id: number
  logoUrl: string
  tmName: string
}
export interface spuInfoList extends responseType{
  data: spuInfo [] 
}
export interface spuSaleAttr {
  id: number
  baseSaleAttrId: number
  saleAttrName: string,
  saleAttrValueName: string,
  spuId: number
}
export interface spuSaleAttrArr extends responseType{
  data: spuSaleAttr [] 
}