/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-17 18:37:11
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-02-20 19:06:35
 */
import Modal from "./modal.js"
import data from "./data.js"
import Validate from "./validate.js"
import Http from "./http.js"
import { getFormJson } from "./formObj.js"
import RouterObj from "./router.js"
import Message from "./message"
import $ from "jquery"
import store from "store"
export default class Actions {
  constructor() {
    this.data = data
    this.modalAgency()
    this.pageAgency()
    this.init()
    this.RouterAgency()
    this.classifyAgency()
    this.searchAgency()
  }
  init() {
    let cropper
    RouterObj.go("/index", { routerType: "index" })
    // RouterObj.go("/classify", { routerType: "classify" })
    // new Http({type:"articles"})
    $(document).on("submit", "form#info", (e) => {
      e.preventDefault()
      console.log("执行验证222");
      //执行验证
      new Validate({
        type: "infoModify",
      }).then(async (type) => {
        console.log("验证结果", type);
        let data = getFormJson(document.querySelector("#info"))
        console.log(data, "data");
        $(".blog-modal").html("")
        $(".blog-modal").attr("hidden", "true")
        console.log(data, type, "检测=+++++++=");
        let result = await Http({ data, type })
        if (result) {
          let wrap = document.querySelector("#tips")
          new Message(wrap, { message: result.data.message, type: "success" })
          RouterObj.go("/index", { routerType: "index" })
        }
        console.log(result, "result");
      }).catch(error => {
        console.log(error);
      })
    })
    $(document).on("click", ".btn-submit", async (e) => {
      try {
        e.preventDefault()
        let position = cropper.getCroppedCanvas();
        position.toBlob(async (blob) => {
          //初始化剪裁工具
          // let test = URL.createObjectURL(blob)
          let formData = new FormData()
          formData.append("file", blob)
          let result = await Http({ type: "photo", data: formData })
          if (result) {
            new Message(document.querySelector("#tips"), { message: "上传成功", type: "success" })
            RouterObj.go("/index", { routerType: "index" })
          }
        })
      } catch (error) {
        console.log(error);
      }
    })
    $(document).on("click", ".blog-photo-show", async (e) => {
      document.querySelector("#photo").click()
    })
    $(document).on("click", "#firstView", async (e) => {
      let data = document.querySelector("#photo").files[0]
      console.log(data);
      let blob = URL.createObjectURL(data)
      console.log(blob);
      document.querySelector("#imgTest").src = blob
      //初始化剪裁工具
      const image = document.getElementById('imgTest');
      cropper = new Cropper(image, {
        aspectRatio: 16 / 9,
        crop(event) {
          console.log("moving");
        }
      });
    })
  }
  pageAgency() {
    $(document).on("click", "i.glyphicon-pencil", function (e) {
      e.stopPropagation();
      e.preventDefault();
      console.log("我是page绑定的i", e.target);
      // new template({ele: $(".blog-main-content .wrap"),name: "content"})
      let routerType = $(e.target).data("router")
      console.log(e.target, routerType);
      RouterObj.go("/info", { routerType })
    })
  }
  modalAgency() {
    $(document).on("click", "a[data-type]", (e) => {
      console.log("验证");
      e.preventDefault()
      // e.stopPropagation();
      console.log("diaoyong", this.data);
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
      console.log("提交数据");
      e.preventDefault()
      console.log("执行验证222");
      //执行验证
      console.log(this.modal.type, "type");
      new Validate({
        type: this.modal.type,
      }).then(async (type) => {
        console.log("验证结果", type);
        let data = getFormJson(document.querySelector("#test"))
        console.log(data, "data");
        $(".blog-modal").html("")
        $(".blog-modal").attr("hidden", "true")
        console.log(data, type, "检测=+++++++=");
        if (type === "classifyAdd") {
          data = { ...data, uid: store.get("uid") }
        }
        console.log(data, "final");
        let result = await Http({ data, type })
        console.log(result, "result");
        console.log(result.data.data.token, "result");
        if (result.data.data.token) {
          //成功登录 / 成功注册
          localStorage.setItem("token", `Bearer ${result.data.data.token}`)
          // RouterObj.go("/user",{routerType: "user"})
          RouterObj.go("/random")
          RouterObj.go("/index", { routerType: "index", isUser: true, userId: result.data.data.userId })
          // new template({ele: $(".blog-header-user"),data: {isUser: true},name: "user"})
        } else {
          //返回首页
          console.log(result.config.url, "URL23232323");
          if (/classify/.test(result.config.url)) {
            console.log("刷新");
            RouterObj.go("/random")
            RouterObj.go("/classify", { routerType: "classify" })
          } else {
            RouterObj.go("/index")
            console.log("失败了捏");
          }
        }
      }).catch(error => {
        for (let i = 0; i < error.length; i++) {
          let name = error[i].name
          $("[name=" + name + "]").parent().addClass("tip-info")
          $("[name=" + name + "]").parent()[0].dataset["tip"] = error[i]?.msg
        }
      })

    })
    $()
  }
  RouterAgency() {
    $(document).on("click", "a[data-router]", function (e) {
      let type = $(this).data("router")
      console.log("绑定成功", type, "是否带了分类", $(this).data("classify"));
      RouterObj.go(`/${type}`, { routerType: type, id: $(this).data("id"), classify: $(this).data("classify") })
    })
  }
  classifyAgency() {
    $(document).on("click", ".blog-classify-wrap>li", function (e) {
      $(this).addClass("selected").siblings("li").removeClass("selected")
    })
  }
  searchAgency() {
    console.log("执行搜索绑定s");
    function searchOperate(e) {
      console.log("键盘按下");
      if (e.keyCode == 13) {
        console.log("回车触发");
        $(document).off("keypress", searchOperate)
        //submit
        let search = $(e.target).val()
        let routerName = $(e.target).data("input")
        console.log(search, "search1", routerName);
        RouterObj.go("/random")
        RouterObj.go(`/${routerName}`, { routerType: routerName, search })
        $("input[data-input]").val("").trigger("blur")

      }
    }
    $(document).on("focus", "input[data-input]", function (e) {
      console.log("focus");
      $(document).on("keypress", searchOperate)
    })
    $(document).on("blur", "input[data-input]", function (e) {
      console.log("blur");
      $(document).off("keypress", searchOperate)
    })
    $(document).on("click", "i[data-submit]", function (e) {
      let search = $("input[data-input]").val()
      let routerType = $(this).data("submit")
      RouterObj.go("/random")
      RouterObj.go(`/${routerType}`, { routerType: routerType, search })
      $("input[data-input]").val("").trigger("blur")
      //提交
    })
    // $(document).on("keypress","input[data-input]",function (e) {
    //   console.log($(e.target).val(),"值");
    // })
    // let time
    // $(document).on("input", "input[data-input]", function (e) {
    //   if (time) {
    //     clearTimeout(time)
    //   }
    //   time = setTimeout(() => {
    //     console.log($(e.target).val(), "值");
    //   }, 1000);
    // })
  }
}