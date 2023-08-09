import request from "@/util/request.js"
let reqMap = {
  "info" : "/member/order/pre",
  "pay": "/member/order",
  "payInfo": "/member/order/"
}
export const reqInfo = () => {
  return request.get(reqMap["info"])
}
export const reqPay = (data) => {
  return request.post(reqMap["pay"],data)
}
export const reqPayInfo = (id) => {
  return request.get(`${reqMap["payInfo"] + id}`)
}