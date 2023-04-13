/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-02 17:29:48
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-01-02 17:52:30
 */
const fs = require("fs").promises
const http = require("http")
async function test() {
  let arr = []
  // fs.readFile("./data/a.txt","utf8").then(data=>{
  //   console.log(data);
  //   fs.readFile(data,"utf8").then(data=>{
  //     console.log(data);
  //     fs.readFile(data,"utf8").then(data => {
  //       console.log("data",data);
  //     })
  //   })
  // })
  try {
    let r1 = await fs.readFile("./data/fdsfsdfdsfsd.txt", "utf8")
    let r2 = await fs.readFile("./data/b.txt", "utf8")
    let r3 = await fs.readFile("./data/c.txt", "utf8")
    console.log(r1, r2, r3);
  } catch (error) {
    console.log(error);
  }
  // arr.push(r1)
  // arr.push(r2)
  // arr.push(r3)
  // console.log(arr);
  return arr
  // return new Error("404")
}
let result = test()
result.then(data => {
  console.log(data, "---data");
}).catch(err => {
  console.log(err);
})