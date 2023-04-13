/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-13 20:00:10
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-01-14 21:52:45
 */
export default class Modal {
  constructor ({template = Handlebars.templates["modal.hbs"], data, targetEle = $(".blog-modal"),successCallback = function () {console.log("success")},faultCallback = function () {console.log("fail")},drawAfter = function () {}}) {
    this.template = template
    this.data = data
    this.targetEle = targetEle
    this.html = ""
    this.successCallback = successCallback
    this.faultCallback = faultCallback
    this.drawAfter = drawAfter
    this.event()
    
  }
  event() {
    $(".blog-header-user a").on("click",(e) => {
      console.log("111");
      this.targetEle.removeAttr("hidden")
      let type = $(e.target).data("type")
      this.type = type
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
    this.drawAfter()
  }
  clear () {
    this.targetEle.html("")
  }
  close() {
    this.clear()
    this.targetEle.attr("hidden","true")
    // this.faultCallback()
  }
  confirm () {
    // this.clear()
    console.log("提交数据校验");
    console.log(this.validator,"validator");
    // this.targetEle.attr("hidden","true")
    this.validator.validate()
    // this.successCallback()
  }
}