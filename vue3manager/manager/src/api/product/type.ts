/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-05-28 12:35:53
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-05-28 12:40:53
 */
export interface goodAddOrMod {
  id ?: number
  tmName: string
  logoUrl: string
}
export interface goodOperateRes {
  code: number
  data: any
  message: string
  ok: boolean
}