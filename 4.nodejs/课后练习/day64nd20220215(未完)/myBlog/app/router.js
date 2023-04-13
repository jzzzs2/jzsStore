/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-02-14 10:40:56
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-02-20 16:05:07
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
import Comment from "./comment"
import MessageTip from "./message"
// import Scroll from "./scroll.js"
import $ from "jquery"
import Editor from "./wangEditor"
import getData from "./contentData"
import dataMap from "./data"
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
  "classify": ".blog-main-content .wrap",
  "toolbar": ".blog-toolbar",
  "info": ".blog-main-content .wrap",
  "userInfo": ".blog-main-intro",
  "photo": ".blog-main-content .wrap"
}
let tempMap = {
  "edit/article": "page",
  "articles": "article",
  "article": "page",
  "index": "user",
  "classify": "classify",
  "toolbar": "toolbar",
  "info": "info",
  "userInfo": "mainInfo",
  "photo": "photo"
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
  bodyRouter.render({ dom: getTempHtml("toolbar", {}) })
}

bodyRouter.use(setReqType)
bodyRouter.route("/index", async function (req, res, next) {
  bodyRouter.go("/articles", { classify: req.body.classify })
  //直接进入write
  // bodyRouter.go(`/content`, { routerType: "content"})
  try {
    //权限校验
    console.log("权限校验", req.routerType);
    let routerName = "index"
    if (req.body.isUser) {
      console.log("通过登录注册进入");
      let result = await Http({ type: "info"})
      console.log(result.data.data,"testZZZ");
      res.render({ dom: getTempHtml(routerName, { isUser: true,...result.data.data}) })
    } else {
      console.log("通过自动登录进行");
      let respon = await Http({ type: routerName, auto: true })
      console.log(respon, "resres0");
      if (respon) {
        res.render({ dom: getTempHtml(routerName, { isUser: true,...respon.data.data }) })
      }
    }
  } catch (error) {
    console.log(error);
  }
  console.log(req.body.classify, "从 index 跳转到文章");
  let result = await Http({ type: "info" })
  console.log(result,"result");
  store.set("info",result.data.data)
  res.render({ dom: getTempHtml("userInfo", store.get("info")) })
  
  //获取个人信息存储到本地
})
bodyRouter.route("/articles", async function (req, res, next) {
  res.render({
    dom: getTempHtml("toolbar", {
      list: [{
        icon: "edit",
        content: "写文章"
      }]
    }
    )
  })

  try {
    //文章获取
    console.log("直接进入user");
    let type = req.routerType
    type = "articles"
    let columnId = req.body.classify
    let search = req.body.search
    console.log(columnId, "分类ID", search, "搜索内容");
    let result = await Http({
      type: "articles", data: {
        query: qs.stringify({ classify: columnId, search })
      }
    })
    let resData = result.data.data
    resData.columnId = columnId
    console.log(resData, "查询到的捏");
    resData.list.map((item, idx) => {
      // resData.list[idx].createtime = formatDate(new Date(item.createtime))
      resData.list[idx].content = `${$(resData.list[idx].content).text().slice(0, 50)}...`
      return
    })
    let data = getTempHtml(type, resData)
    res.render({ dom: data })
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
  res.render({
    dom: getTempHtml("toolbar", {
      list: [
        {
          icon: "eye-open",
          content: result.data.data.clicks_num
        },
        {
          icon: "heart-empty",
          content: result.data.data.hits_num
        },
        {
          icon: "comment",
          content: result.data.data.comments_num
        }
      ]
    }
    )
  })
  // result.data.data.content = decodeURIComponent(result.data.data.content)
  // result.data.data.createtime = formatDate(new Date(result.data.data.createtime))
  // result.data.data.comments = result.data.data.comments.map((item,idx) => {
  //   item.createtime = formatDate(new Date(item.createtime))
  //   return item
  // })
  let html = getTempHtml(routerName, result.data.data)
  console.log(html, "html", $(html).html(), $(html).text());
  // html = $(document.createElement("div").innerHTML=html).html()
  res.render({ dom: html })
  //评论初始化
  new Comment({
    inputEle: ".blog-article-comment-area textarea", subEle: ".blog-article-comment-area input", data: { articleId: data.id }, cb: async function (inData) {
      console.log(data, "adatatatatata_____________________", inData, "inData");
      let result = await Http({ type: "commentAdd", data: inData })
      console.log(result, "result.....");
      bodyRouter.go("/random")
      console.log("data.id", data.id, "==============================");
      bodyRouter.go("/article", { routerType: "article", id: data.id })
      $(".blog-article-comment-area textarea").val("")
    }
  })
})
bodyRouter.route("/classify", async function (req, res, next) {
  let data = req.routerType
  let result = await Http({
    type: "classify"
  })
  let html = getTempHtml(req.body.routerType, result.data.data)
  res.render({ dom: html })
  new Packery(".blog-classify-container", {
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
    result.data.data.list = result.data.data.list.map((curr, idx) => {
      if (curr._id == req.body.classify) {
        curr.selected = true
      }
      return curr
    })
    console.log(result.data.data.list, "list");
    console.log(req.body.column, "XXXX");
    let html = getTempHtml(req.body.routerType, result.data.data)
    res.render({ dom: html })
    editor.init()
    editor.create()
  } else {
    bodyRouter.go("/index")
  }
})
bodyRouter.route("/edit/:type", async function (req, res, next) {
  console.log(req.body, req.routerType, "+++");
  if (req.routerType === "edit/article") {
    let content = editor.editor.txt.html()
    console.log(content, "Content");
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
bodyRouter.route("/info", async function (req, res, next) {
  try {
    let result = await Http({ type: "info" })
    console.log(result, "result nie");
    let data = dataMap["info"]
    data.formData = data.formData.map(item => {
      item.value = result.data.data[item.inputName]
      return item
    })
    let html = getTempHtml("info", data)
    res.render({ dom: html })
  } catch (error) {
    next(error)
  }
})
bodyRouter.route("/photo", async function (req, res, next) {
  try {
    let html = getTempHtml("photo")
    res.render({ dom: html })
  } catch (error) {
    next(error)
  }
})
bodyRouter.route("*", function (req, res, next) {
  console.log("进入校验", req.body?.routerType);
  if (!req.routerType) {
    bodyRouter.go("/index")
  }
})

export default bodyRouter