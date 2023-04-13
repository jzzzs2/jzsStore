/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-17 22:02:14
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-01-17 22:37:15
 */
export default class template {
  constructor({ele, data, name}) {
    this.ele = ele;
    this.data = data;
    this.name = name
    this.init()
  }
  init() {
    console.log("init");
    this.addTemplate()
  }
  addTemplate () {
    let name = this.name
    this.template = Handlebars.templates[`${name}.hbs`]
    console.log("template");
    this.getHTML()
  }
  getHTML () {
    this.html = this.template(this.data)
    console.log("html");
    this.appendHTML()
  }
  appendHTML () {
    this.ele.html(this.html)
  }
  static templateModal () {
    return Handlebars.templates["modal.hbs"]
  }
}