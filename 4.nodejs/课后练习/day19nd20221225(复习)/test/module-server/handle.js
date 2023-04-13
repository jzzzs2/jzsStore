/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-23 19:44:32
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-25 17:52:20
 */
let { path, fs, url, http, querystr } = require("./module")
let { MIME_TYPE } = require("./data/mine")
function handleRes(req, res) {
  console.log("处理图片数据");
  let pathName = path.parse(req.url)
  let filePath = path.join(process.cwd(), `${pathName.dir}/${pathName.base}`)
  console.log(filePath);
  console.log(pathName);
  let suffix = pathName.ext.replace(".", "")
  let type = MIME_TYPE[suffix]
  console.log(type, "类型");
  res.setHeader("content-type", type)
  // res.setHeader("content-type", "image/jpg")
  fs.readFile(filePath, (error, data) =>{
    if (data) {
      // res.write(data,"binary")
      res.write(data, "binary")
      res.end()

    }
    return false
    // res.end()
  })
}
function toMain(req, res) {
  res.setHeader("content-type", "text/html;charset=utf-8")
  res.write('<!DOCTYPE html><html lang="en"><head><title>Document</title></head><body>欢迎来到主页</body></html>')
  res.end()
}
function getMovie(req, res) {
  //start  num
  res.setHeader("content-type", "application/json")
  // res.setHeader("content-type","text/plain;charset=utf8;charset=utf8")
  let reqObj = url.parse(req.url)
  let query = reqObj.query
  console.log(query);
  let queryObj = querystr.parse(query)
  fs.readFile("./data/dbMovie.json", function (err, data) {
    // console.log(JSON.parse(data.toString("utf8")))
    let arr = JSON.parse(data.toString("utf8"))
    // console.log(arr,typeof arr);
    // console.log(queryObj.start,typeof queryObj.start);
    console.log(Number(queryObj.start), Number(queryObj.num), "params");
    arr = arr.slice(Number(queryObj.start), Number(queryObj.start) + Number(queryObj.num))
    // console.log(newArr);
    // console.log(arr);
    // console.log(arr,typeof arr);
    // res.write(JSON.parse(arr))
    // let str = arr.reduce((acc,item) => {
    //   acc += JSON.stringify(item)
    //   return acc
    // },"")
    // console.log(arr,"Arr");

    res.write(JSON.stringify(arr))
    // res.write("keainie")
    res.end()
  })
}
module.exports = {
  handleRes,
  toMain,
  getMovie
}