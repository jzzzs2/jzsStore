/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-12 18:15:27
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-01-12 18:38:19
 */
const { exec } = require("child_process")
const fs = require("fs")
const path = require("path")
const basePath = process.cwd()
fs.readdir("./view",function (err,files) {
  console.log(files,"files");
  files.map(function (item,idx) {
    let {ext, name, base} = path.parse(item)
    if (ext === ".hbs") {
      exec(`handlebars ./view/${name}.hbs -f ./viewJs/${name}.template.js`)
    }
  })
})