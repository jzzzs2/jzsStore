/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-07-19 19:51:16
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-07-21 15:27:51
 */
import {HospitalList,areaAndLevelRes} from "@/api/type"
import request from "@/util/request"
enum API {
  hospitalList = "/hosp/hospital/",
  levelList = "/cmn/dict/findByDictCode/hostype",
  areaList = "/cmn/dict/findByDictCode/Beijin"
}
export let reqHospitalList = (page :number,limit :number) => {
  return request.get<any,HospitalList>(`${API["hospitalList"]}${page}/${limit}`)
}
export let reqLevelList = () =>  {
  return request.get<any,areaAndLevelRes>(`${API["levelList"]}`)
}
export let reqAreaList = () => {
  return request.get<any,areaAndLevelRes>(`${API["areaList"]}`)
}