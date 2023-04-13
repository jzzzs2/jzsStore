/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-17 18:37:11
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-02-15 18:28:55
 */
import Modal from "./modal.js"
import data from "./data.js"
import Validate from "./validate.js"
import Http from "./http.js"
import {getFormJson} from "./formObj.js"
import RouterObj from "./router.js"
import $ from "jquery"
export default class Actions {
  constructor() {
    this.data = data
    this.modalAgency()
    this.pageAgency()
    this.init()
    this.RouterAgency()
    this.classifyAgency()
  }
  init () {
    RouterObj.go("/index",{routerType: "index"})
    // new Http({type:"articles"})
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
      console.log("验证");
      e.preventDefault()
      // e.stopPropagation();
      console.log("diaoyong",this.data);
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
      e.preventDefault()
      console.log("执行验证222");
      //执行验证
      console.log(this.modal.type,"type");
      new Validate({
        type: this.modal.type,
      }).then(async (type) => {
        console.log("验证结果",type);
        let data = getFormJson(document.querySelector("#test"))
        console.log(data,"data");
        $(".blog-modal").html("")
        $(".blog-modal").attr("hidden", "true")
        console.log(data,type,"检测=+++++++=");
        let result = await Http({data,type})
        console.log(result.data.data.token,"result");
        if (result.data.data.token) {
          //成功登录 / 成功注册
          localStorage.setItem("token",`Bearer ${result.data.data.token}`)
          // RouterObj.go("/user",{routerType: "user"})
          RouterObj.go("/random")
          RouterObj.go("/index",{routerType: "index",isUser: true})
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
    $(document).on("click","a[data-router]",function (e) {
      let type = $(this).data("router")
      console.log("绑定成功",type);
      RouterObj.go(`/${type}`,{routerType: type,id: $(this).data("id"),classify:$(this).data("classify")})
    })
  }
  classifyAgency() {
    $(document).on("click",".blog-classify-wrap>li",function (e) {
      $(this).addClass("selected").siblings("li").removeClass("selected")
    })
  }
}