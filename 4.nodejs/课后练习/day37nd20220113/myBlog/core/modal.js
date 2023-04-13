/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-13 20:00:10
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-01-13 21:44:36
 */
export default class Modal {
  constructor ({template = Handlebars.templates["modal.hbs"], data, targetEle = $(".blog-modal"),successCallback = function () {console.log("success")},faultCallback = function () {console.log("fail")}}) {
    this.template = template
    this.data = data
    this.targetEle = targetEle
    this.html = ""
    this.successCallback = successCallback
    this.faultCallback = faultCallback
    this.event()
  }
  event() {
    $(".blog-header-user a").on("click",(e) => {
      console.log("111");
      this.targetEle.removeAttr("hidden")
      let type = $(e.target).data("type")
      console.log(type,"type");
      this.init(type)
      this.draw()
      this.targetEle.find("button").on("click",(e) => {
        console.log("btnbtn",e.target);
        let  type = $(e.target).data("btn-type")
        this[type] && this[type]()
      })
    })
  }
  init (type) {
    
    // console.log(this.data[type],"data");
    this.html = this.template(this.data[type])
    // console.log(this.html,"html");
  }
  draw () {
    this.targetEle.html(this.html)
  }
  clear () {
    this.targetEle.html("")
  }
  close() {
    this.clear()
    this.targetEle.attr("hidden","true")
    this.faultCallback()
  }
  confirm () {
    this.clear()
    this.targetEle.attr("hidden","true")
    this.successCallback()
  }
}