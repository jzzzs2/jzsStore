/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-07-19 19:51:16
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-07-19 20:29:11
 */
import request from "@/util/request"
enum API {
  hospitalList = "/hosp/hospital/"
}
export let reqHospitalList = (page :number,limit :number) => {
  return request.get(`${API["hospitalList"]}${page}/${limit}`)
}