/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-18 19:48:02
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-01-19 01:08:40
 */
import Http from "./http.js"
import TemplateHTML from "./template.js"
const Router = window["sme-router"].default
const bodyRouter = new Router("bd")
// let dataMap = {
//   "login": function () {
//     bodyRouter.go("/user")
//   },
//   "regis": function () {
//     bodyRouter.go("/user")
//   },
//   "index": function () {
//     bodyRouter.go("/index")
//   },
//   "content": function () {
//     bodyRouter.go("/content", { routerType: "content" })
//   }
// }
function userDom() {
  bodyRouter["_mount"] = document.querySelector(".blog-header-user")
  // new template({ele: $(".blog-header-user"),data: {isUser: true},name: "user"})
  let html = TemplateHTML.templateModal("user")({ isUser: true })
  return html
}
bodyRouter.route("/user", function (req, res, next) {
  let data = req.body?.routerType
  console.log(req.body, "user");
  if (data) {
    let html = userDom()
    res.render(html)
    // bodyRouter["_mount"] = document.querySelector(".blog-header-user")
    // // new template({ele: $(".blog-header-user"),data: {isUser: true},name: "user"})
    // let html = TemplateHTML.templateModal(data)({ isUser: true })
    // console.log(html);
    // res.render(html)
    //展示框
    // router.go("/index",{routerType: "index"})
  }
})
bodyRouter.route("/index", async function (req, res, next) {
  console.log("flash http", req.body);
  let result = await new Http({}).then(function (result) {
    if (result.data.status === 200) {
      bodyRouter.go("/user", { routerType: "user" })
    }

  }).catch((error) => {
    new TemplateHTML({ ele: $(".blog-header-user"), data: { isUser: false }, name: "user" })
    console.log("error nie");
  })
})
// console.log(result);
//   if (result.data.status === 200) {
//     bodyRouter.go("/user", { routerType: "user" })
//     location.hash = "/content"
//     bodyRouter["_mount"] = document.querySelector(".blog-header-user")
//     // new template({ele: $(".blog-header-user"),data: {isUser: true},name: "user"})
//     let html = TemplateHTML.templateModal("user")({ isUser: true })
//     console.log(html);
//     res.render(html)
//     return false
//     } else {
//       new TemplateHTML({ ele: $(".blog-header-user"), data: { isUser: false }, name: "user" })
//       console.log("error nie");
//   }
// } catch (error) {
//   new TemplateHTML({ ele: $(".blog-header-user"), data: { isUser: false }, name: "user" })
//   console.log("error nie");
// }

//展示框
// })
bodyRouter.route("/content", function (req, res, next) {
  let data = req.body?.routerType
  console.log(data, "content");
  if (data) {
    // dataMap[data]()
    //进行编辑
    bodyRouter["_mount"] = document.querySelector(".blog-main-content .wrap")
    let html = TemplateHTML.templateModal(data)()
    console.log(html);
    res.render(html)
    let editor = new wangEditor(".blog-edit")
    editor.create()
    console.log("结束content");
  }
  return
})
bodyRouter.route("*", function (req, res, next) {
  console.log("test");
  if (!req.body?.routerType) {
    bodyRouter.go("/index", { routerType: "index" })
  }
})
export default bodyRouter