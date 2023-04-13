/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-17 18:37:11
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-01-19 13:05:12
 */
import Modal from "./modal.js"
import data from "./data.js"
import validate from "./validate.js"
import Http from "./http.js"
import {getFormJson} from "../core/formObj.js"
import template from "../core/template.js"
import RouterObj from "../core/router.js"
export default class Actions {
  constructor() {
    this.data = data
    this.modalAgency()
    this.pageAgency()
    this.init()
  }
  init () {
    RouterObj.go("/index",{routerType: "index"})
  }
  pageAgency() {
    $(document).on("click","i.glyphicon-pencil",function (e) {
      e.stopPropagation();
      e.preventDefault();
      console.log("我是page绑定的i",e.target);
      // new template({ele: $(".blog-main-content .wrap"),name: "content"})
      let routerType = $(e.target).data("router")
      console.log(e.target,routerType);
      RouterObj.go("/content",{routerType})
    })
  }
  modalAgency() {
    $(document).on("click","a[data-type]",(e) => {
      // e.preventDefault()
      // e.stopPropagation();
      console.log("diaoyong");
      let data = this.data
      let modal = new Modal({ data })
      this.modal = modal
      modal.targetEle.removeAttr("hidden")
      let type = $(e.target).data("type")
      modal.type = type
      modal.init()
      this.formAgency()
      modal.targetEle.find("input").on("blur", function (e) {
        //清除提示文本
        $("#test input").parent().removeClass("tip-info")
      })
    })
  }
  formAgency() {
    $(".blog-modal-wrap").find("[data-btn-type]").on("click", (e) => {
      let type = $(e.target).data("btn-type")
      this.modal[type] && this.modal[type]()
    })
    $("form").on("submit", async (e) => {
      //执行验证
      new validate({
        type: this.modal.type,
      }).then(async (type) => {
        let data = getFormJson(document.querySelector("#test"))
        $(".blog-modal").html("")
        $(".blog-modal").attr("hidden", "true")
        let result = await new Http({data,type})
        if (/^2.+/.test(result.data.status)) {
          //成功登录 / 成功注册
          RouterObj.go("/user",{routerType: "user"})
          // new template({ele: $(".blog-header-user"),data: {isUser: true},name: "user"})
        } else {
          //返回首页
          RouterObj.go("/index")
          console.log("失败了捏");
        }
      }).catch(error => {
        for (let i = 0; i < error.length; i++) {
          let name = error[i].name
          $("[name=" + name + "]").parent().addClass("tip-info")
          $("[name=" + name + "]").parent()[0].dataset["tip"] = error[i]?.msg
        }
      })

    })
  }
  RouterAgency() {
    // $("[data-router]").on("click", function (e) {
    //   let type = $(this).data("router")
    // })
    
  }
}