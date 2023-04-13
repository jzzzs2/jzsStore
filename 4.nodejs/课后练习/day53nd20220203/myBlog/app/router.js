/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-18 19:48:02
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-01-27 21:02:13
 */
import Http from "./http.js"
import TemplateHTML from "./template.js"
import Router from  "sme-router"
import wangEditor from "wangeditor"
// const Router = window["sme-router"].default
const bodyRouter = new Router("bd")
let containMap = {
  "user": ".blog-header-user",
  "content": ".blog-main-content .wrap",
  "edit/submit": ".blog-main-content .wrap"
}
let tempMap = {
  "edit/submit" : "editor"
}
function getTempHtml (reqType,data) {
  if (!tempMap[reqType]) {
    return TemplateHTML.templateModal(reqType)(data)
  }
  return TemplateHTML.templateModal(tempMap[reqType])(data)
}
let editor;
function setReqType(req) {
  console.log(req?.body?.routerType, "type");
  if (req?.body?.routerType) {
    bodyRouter["_mount"] = document.querySelector(containMap[req.body.routerType])
    req.routerType = req.body.routerType
  }
}
// function userDom() {
//   bodyRouter["_mount"] = document.querySelector(".blog-header-user")
//   // new template({ele: $(".blog-header-user"),data: {isUser: true},name: "user"})
//   let html = getTempHtml("user",{isUser: true})
//   return html
// }

bodyRouter.use(setReqType)
bodyRouter.route("/edit/submit", function (req, res, next) {
  console.log(req.body);
  if (req.routerType === "edit/submit") {
    let content = editor.txt.html()
    // console.log(html,"html");
    let name = tempMap[req["routerType"]]
    console.log(name,"name");
    let html = getTempHtml(req.routerType,{ body: content })
    console.log(html,"html");
    res.render(html)
  } else {
    bodyRouter.go("/index")
  }
})
bodyRouter.route("/user", function (req, res, next) {
  if (req.routerType === "user") {
    let html = getTempHtml(req.routerType,{isUser: true})
    res.render(html)
  } else {
    bodyRouter.go("/index")
  }
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
    let html = getTempHtml(req.body.routerType)
    console.log(html);
    res.render(html)
    editor = new wangEditor(".blog-edit--wrap")
    editor.create()
    console.log("结束content");
  } else {
    bodyRouter.go("/index")
  }
})
bodyRouter.route("*", function (req, res, next) {
  console.log("进入校验", req.body?.routerType);
  if (!req.routerType) {
    bodyRouter.go("/index")
  }
})

export default bodyRouter
// bodyRouter["_mount"] = document.querySelector(".blog-header-user")
  // // new template({ele: $(".blog-header-user"),data: {isUser: true},name: "user"})
  // let html = TemplateHTML.templateModal(data)({ isUser: true })
  // console.log(html);
  // res.render(html)
  //展示框
  // router.go("/index",{routerType: "index"})