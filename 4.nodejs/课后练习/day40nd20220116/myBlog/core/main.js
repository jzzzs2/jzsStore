/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-13 18:59:21
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-01-16 23:13:36
 */
import Http from "./http.js"
import Modal from "./modal.js"
import validate from "./validate.js"
import {getFormJson} from "../core/formObj.js"
// import Validator from "../node_modules/validator.tool/dist/validator.js"
// let http = new Http({})
// console.log(http);
console.log(Modal);
let data = {
  login: {
    title: "登录",
    formData: [
      {
        inputName: "username",
        name: "用户名",
        inputType: "text",
        placeHolder: "请输入用户名"
      },
      {
        inputName: "pwd",
        name: "密码",
        inputType: "text",
        placeHolder: "请输入密码"
      }
    ],
    btns: [
      {
        pageType: "login",
        type: "close",
        resName: "取消"
      },
      {
        pageType: "login",
        type: "confirm",
        resName: "确定"
      }
    ]

  },
  regis: {
    title: "注册",
    formData: [
      {
        inputName: "username",
        name: "用户名",
        inputType: "text",
        placeHolder: "请输入用户名"
      },
      {
        inputName: "pwd",
        name: "密码",
        inputType: "text",
        placeHolder: "请输入密码"
      }
    ],
    btns: [
      {
        pageType: "regis",
        type: "close",
        resName: "取消"
      },
      {
        pageType: "regis",
        type: "confirm",
        resName: "确定"
      }
    ]
  }
}
let modal = new Modal({
  data,
  template: Handlebars.templates["modal.hbs"],
  drawAfter() {
    this.targetEle.find("input").on("blur",function (e) {
      //清除提示文本
      console.log("clear");
      $("#test input").parent().removeClass("tip-info")
    })
    console.log(this.type,"type");
    modal.validator = new validate({type: this.type,failValidCallback (msgData) {
      console.log(msgData,"returnMsg");
      console.log($("#test input").parent());
      let length = $("#test input").parent().addClass("tip-info").length
      for (let i = 0; i < length; i++) {
        $("#test input").parent()[i].dataset["tip"] = msgData[i]?.["detailMsg"]
      }
      $("#test input").parent().addClass("tip-info")
      $("#test input")[0].focus()
    },succValidCallback (type) {
      // $(".blog-modal").html("")
      // $(".blog-modal").attr("hidden","true")
      //jq 快速生成form对象
      console.log("发送http请求");
      let data = getFormJson(document.querySelector("#test"))
      console.log(data,"formdata");
      // let http = new Http({type: "regis",data})
      // let http = new Http({type: "login",data})
      console.log(type,"type");
      let http = new Http({type,data,successCallback: function (data) {
        // console.log(data,"kankan");
        $(".blog-modal").attr("hidden",true)
        // if (data) {
        //   console.log("成功");
        // }
      }})
    }})
    console.log(modal.validator,"obj");
  }
})