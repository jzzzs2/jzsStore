/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-02-14 10:40:56
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-02-15 20:40:46
 */
/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-18 19:48:02
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-02-14 17:47:28
 */
import Http from "./http.js"
import TemplateHTML from "./template.js"
import Router from "./route"
import wangEditor from "wangeditor"
import { formatDate } from "./util.js"
import Packery from "packery"
// import Scroll from "./scroll.js"
import $ from "jquery"
import Editor from "./wangEditor"
import getData from "./contentData"
let qs = require("qs")
const store = require("store")
// const Router = window["sme-router"].default
const bodyRouter = new Router("bd")
let containMap = {
  // "user": ".blog-header-user",
  "content": ".blog-main-content .wrap",
  "edit/article": ".blog-main-content .wrap",
  "articles": ".blog-main-content .wrap",
  "index": ".blog-header-user",
  "article": ".blog-main-content .wrap",
  "classify": ".blog-main-content .wrap"
}
let tempMap = {
  "edit/article": "page",
  "articles": "article",
  "article": "page",
  "index": "user",
  "classify": "classify"
}
function getTempHtml(reqType, data) {
  let type = reqType
  if (type in containMap) {
    bodyRouter["_mount"] = document.querySelector(containMap[type])
  }
  if (!tempMap[reqType]) {
    return TemplateHTML.templateModal(reqType)(data)
  }
  return TemplateHTML.templateModal(tempMap[reqType])(data)
}
let editor = new Editor();
function setReqType(req) {
  // console.log(req?.body?.routerType, "type");
  if (req?.body?.routerType) {
    req.routerType = req.body.routerType
  }
}

bodyRouter.use(setReqType)

bodyRouter.route("/index", async function (req, res, next) {
  try {
    //文章获取
    console.log("直接进入user");
    let type = req.routerType
    type = "articles"
    let columnId = req.body.classify
    console.log(columnId,"分类ID");
    let result = await Http({ type: "articles",data: {
      query: qs.stringify({ classify: columnId })
    }})
    let resData = result.data.data
    resData.columnId = columnId
    console.log(resData, "查询到的捏");
    resData.list.map((item, idx) => {
      resData.list[idx].createtime = formatDate(new Date(item.createtime))
      resData.list[idx].content = `${$(resData.list[idx].content).text().slice(0, 50)}...`
      return
    })
    // console.log(resData, "res");
    let data = getTempHtml(type, resData)
    // console.log(data, "data");
    res.render({ dom: data })
  } catch (error) {
    console.log(error);
  }
  //直接进入write
  // bodyRouter.go(`/content`, { routerType: "content"})
  try {
    //权限校验
    console.log("权限校验");
    let routerName = "index"
    if (req.body.isUser) {
      console.log("通过登录注册进入");
      res.render({ dom: getTempHtml(routerName, { isUser: true }) })
      return
    }
    console.log("通过自动登录进行");
    let respon = await Http({ type: routerName,auto: true})
    console.log(respon, "resres0");
    if (respon) {
      res.render({ dom: getTempHtml(routerName, { isUser: true }) })
    }
  } catch (error) {
    console.log(error);
  }
})
// bodyRouter.route("/user", function (req, res, next) {
//   if (req.routerType === "user") {
//     let html = getTempHtml(req.routerType, { isUser: true })
//     res.render(html)
//   } else {
//     bodyRouter.go("/index")
//   }
// })
bodyRouter.route("/article", async function (req, res, next) {
  //
  let data = req.body
  console.log(data, "data");
  // console.log(req.body);
  console.log("dataType", data.routerType, "IDIDIDIDIDI", data.id);
  let result = await Http({ type: data.routerType, data: { id: data.id } })
  console.log(result.data.data, "!!!!!!!!!!!!!!!!!!!!");
  let routerName = "article"
  console.log('result', result);
  console.log(result.data.data, "==++++++++++++++++");
  // result.data.data.content = decodeURIComponent(result.data.data.content)
  result.data.data.createtime = formatDate(new Date(result.data.data.createtime))
  let html = getTempHtml(routerName, result.data.data)
  console.log(html, "html", $(html).html(), $(html).text());
  // html = $(document.createElement("div").innerHTML=html).html()
  res.render({ dom: html })
})
bodyRouter.route("/classify", async function (req, res, next) {
  let data = req.routerType
    let result = await Http({
      type: "classify"
    })
    console.log(result, "data2323232323232323");
    let html = getTempHtml(req.body.routerType, result.data.data)
    // console.log(html);
    // res.render(html)
    res.render({ dom: html })
    new Packery(".blog-classify-container",{
      gutter: 10
    })
})
bodyRouter.route("/content", async function (req, res, next) {
  let data = req.routerType
  if (req.routerType === "content") {
    let result = await Http({
      type: "classify", data: {
        query: qs.stringify({ uid: store.get("uid") })
      }
    })
    console.log(result, "data2323232323232323");
    // result.data.data.columnId = req.body.column
    result.data.data.list = result.data.data.list.map((curr,idx) => {
      if (curr._id == req.body.classify) {
        curr.selected = true
      }
      return curr
    })
    console.log(result.data.data.list,"list");
    console.log(req.body.column,"XXXX");
    let html = getTempHtml(req.body.routerType, result.data.data)
    // console.log(html);
    // res.render(html)
    res.render({ dom: html })
    editor.init()
    editor.create()
    console.log("结束content");
    //渲染分类

  } else {
    bodyRouter.go("/index")
  }
})
bodyRouter.route("/edit/:type", async function (req, res, next) {
  console.log(req.body, req.routerType, "+++");
  if (req.routerType === "edit/article") {
    let content = editor.editor.txt.html()
    console.log(content, "Content");
    // let title = $(content).first()[0].innerText
    let data = getData(content)
    console.log(data, "datatatatatatatata");
    try {
      console.log(req["_id"], "req req req", req);
      let result = await Http({ type: "articleAdd", data })
      console.log("idididid", result?.data?.data["_id"]);
      bodyRouter.go(`/article`, { routerType: "article", id: result.data.data["_id"] })
    } catch (error) {
      console.log(error, "ERR");
    }
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
  // new TemplateHTML({ele:$(wrap),name: pattern,data:result.data.data})
  // console.log(result, "hoxiii");
  // let result = await new Http({})

  // if (result?.data?.status === 200) {
  //   bodyRouter.go("/user", { routerType: "user" })
  // }
  // bodyRouter.go("/user", { routerType: "user" })
  // function userDom() {
//   bodyRouter["_mount"] = document.querySelector(".blog-header-user")
//   // new template({ele: $(".blog-header-user"),data: {isUser: true},name: "user"})
//   let html = getTempHtml("user",{isUser: true})
//   return html
// }