/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-07 20:10:16
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-01-08 12:21:00
 */
const fs = require("fs")
const path = require("path")
module.exports = {
  getUserData () {
    let data = fs.readFileSync(path.join(__dirname,"/data/user.json"),"utf8")
    return JSON.parse(data)
  },
  getUsersLength () {
    let data = fs.readFileSync(path.join(__dirname,"/data/user.json"),"utf8")
    return JSON.parse(data).length
  },
  writeUsers (data) {
    fs.writeFileSync(path.join(__dirname,"/data/user.json"),JSON.stringify(data))
  },
  getUserByName (name) {
    console.log("name",name);
    let data = JSON.parse(fs.readFileSync(path.join(__dirname,"/data/user.json"),"utf8"))
    let ele = data.find(ele => {
      return ele.name == name
    })
    console.log(ele,"ele");
    return ele
  }
}