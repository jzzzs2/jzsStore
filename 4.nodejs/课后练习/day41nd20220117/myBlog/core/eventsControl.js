/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-17 18:37:11
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-01-18 00:19:42
 */
import Modal from "./modal.js"
import data from "./data.js"
import validate from "./validate.js"
import Http from "./http.js"
import {getFormJson} from "../core/formObj.js"
import template from "../core/template.js"
export default class Actions {
  constructor() {
    this.data = data
    this.modalAgency()
    this.pageAgency()
  }
  pageAgency() {
    $(document).on("click","i.glyphicon-pencil",function () {
      new template({ele: $(".blog-main-content .wrap"),name: "content"})
      let editor =  new wangEditor(".blog-edit")
      editor.create()
    })
  }
  modalAgency() {
    $(".blog-header-user a").on("click", (e) => {
      let data = this.data
      let modal = new Modal({ data })
      this.modal = modal
      modal.targetEle.removeAttr("hidden")
      let type = $(e.target).data("type")
      modal.type = type
      modal.init(type)
      modal.draw()
      this.formAgency()
      //
      modal.targetEle.find("input").on("blur", function (e) {
        //清除提示文本
        console.log("clear");
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
          new template({ele: $(".blog-header-user"),data: {isUser: true},name: "user"})
        } else {
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
}