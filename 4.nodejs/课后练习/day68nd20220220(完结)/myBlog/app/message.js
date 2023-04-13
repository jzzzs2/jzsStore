/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-02-10 18:23:43
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-02-10 19:29:15
 */
import templateObj from "../app/template"
import $ from "jquery"
export default class Message {
  constructor(wrap,msg) {
    this.wrap = $(wrap)
    this.msg = msg
    this.init()
  }
  init () {
    let html = templateObj.templateHtml("msg",this.msg)
    console.log(html,"html");
    // console.log(this.wrap.append(html).children(),"back");
    this.wrap.append(html).children().addClass("enter").addClass("leave").delay(3000).queue(function (next) {
      console.log(this,"this");
      $(this).remove()
      next()
    })
  }
  // {{!-- <div class="alert alert-success" role="alert">...</div> --}}
// {{!-- <div class="alert alert-info" role="alert">...</div> --}}
// {{!-- <div class="alert alert-warning" role="alert">...</div> --}}
// {{!-- <div class="alert alert-danger" role="alert">...</div> --}}
}