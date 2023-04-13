/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-02-16 17:15:42
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-02-16 18:00:54
 */
import $ from "jquery"
import store from "store"
export default class Commend  {
  constructor ({inputEle,subEle,data,cb}) {
    this.inputEle = inputEle
    this.subEle = subEle
    this.data = data
    this.cb = cb
    this.init()
  }
  init () {
    let ele = this.subEle
    let inEle = this.inputEle
    $(document).on("click",ele,(e) =>{
      let content = $(inEle).val()
      let uid = store.get("uid")
      this.data = {content,uid,...this.data}
      console.log(this.data,"data Test ++++++++++++++++++++++++++++");
      this.cb(this.data)
    })
  }
}