/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-13 20:00:10
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-01-18 00:26:37
 */
export default class Modal {
  constructor ({template = Handlebars.templates["modal.hbs"], data, targetEle = $(".blog-modal")}) {
    this.template = template
    this.data = data
    this.targetEle = targetEle
    this.html = ""
  }
  init () {
    this.html = this.template(this.data[this.type])
    this.draw()
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
  }
  confirm () {
    console.log("提交数据校验");
  }
}