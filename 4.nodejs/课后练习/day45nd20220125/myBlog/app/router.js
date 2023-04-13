/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-18 19:48:02
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-01-25 15:23:48
 */
import Http from "./http.js"
import TemplateHTML from "./template.js"
import Router from  "sme-router"
import wangEditor from "wangeditor"
// const Router = window["sme-router"].default
const bodyRouter = new Router("bd")
let containMap = {
  "user": ".blog-header-user",
  "content": ".blog-main-content .wrap"
}
function setReqType(req) {
  console.log(req?.body?.routerType, "type");
  if (req?.body?.routerType) {
    bodyRouter["_mount"] = document.querySelector(containMap[req.body.routerType])
    req.routerType = req.body.routerType
  }
}
function userDom() {
  bodyRouter["_mount"] = document.querySelector(".blog-header-user")
  // new template({ele: $(".blog-header-user"),data: {isUser: true},name: "user"})
  let html = TemplateHTML.templateModal("user")({ isUser: true })
  return html
}
bodyRouter.use(setReqType)
bodyRouter.route("/user", function (req, res, next) {
  if (req.routerType === "user") {
    let html = TemplateHTML.templateModal("user")({ isUser: true })
    res.render(html)
  } else {
    bodyRouter.go("/index")
  }
  // bodyRouter["_mount"] = document.querySelector(".blog-header-user")
  // // new template({ele: $(".blog-header-user"),data: {isUser: true},name: "user"})
  // let html = TemplateHTML.templateModal(data)({ isUser: true })
  // console.log(html);
  // res.render(html)
  //展示框
  // router.go("/index",{routerType: "index"})
})
bodyRouter.route("/index", async function (req, res, next) {
  console.log("flash http");
  let result = await new Http({})
  console.log(result,"result");

  if (result?.data?.status === 200) {
    bodyRouter.go("/user", { routerType: "user" })
  } 
})
bodyRouter.route("/content", function (req, res, next) {
  let data = req.routerType
  console.log(data, "datafasdgfsadgasdgas");
  if (req.routerType === "content") {
    // bodyRouter["_mount"] = document.querySelector(".blog-main-content .wrap")
    let html = TemplateHTML.templateModal(data)()
    console.log(html);
    res.render(html)
    let editor = new wangEditor(".blog-edit")
    editor.create()
    console.log("结束content");
  } else {
    bodyRouter.go("/index")
  }
  // dataMap[data]()
  //进行编辑

})
bodyRouter.route("*", function (req, res, next) {
  console.log("进入校验", req.body?.routerType);
  if (!req.routerType) {
    bodyRouter.go("/index")
  }
})

export default bodyRouter