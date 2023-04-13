/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-17 22:02:14
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-01-25 16:09:41
 */
import index from "../src/views/index.hbs"
import modal from "../src/views/modal.hbs"
import content from "../src/views/content.hbs"
import user from "../src/views/user.hbs"
const tempMap = {
  index,
  modal,
  content,
  user
}
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
    this.template = tempMap[name]
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
  static templateModal (name) {
    return tempMap[name]
  }
}