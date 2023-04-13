/**
        *  from addHeader.js
        *  reated by jzs on 2048
        */
let fs = require("fs")
let path = require("path")
let str = `/**
*  from homework.js
*  reated by 海牙 on 2020年10月30日
*/`
fs.readdir("../homework", function (err, data) {
  console.log(data);
  for (let i = 0; i < data.length; i++) {
    let url = __dirname + "\\" + data[i]
    fs.stat(url, function (err, innerdata) {
      // console.log(data);
      if (innerdata.isFile() && /js/.test(data[i])) {
        let fileName = data[i]
        let name = "jzs"
        let time = new Date().getFullYear() + (new Date().getMonth() + 1) + new Date().getDate()
        let str = `/**
        *  from ${fileName}
        *  reated by ${name} on ${time}
        */`
        let buffer = Buffer.from(str)
        let result = fs.readFileSync(url)
        let reg = /\/\*\*(.|\n)*\*\//
        // console.log(result.toString());
        console.log(reg,result.toString().trim());
        console.log(reg.test(result.toString().trim()));
        if (reg.test(result.toString())) {
          console.log("have header");
        } else {
          let all = Buffer.concat([buffer, result])
          fs.writeFileSync(url, all)
        }

      }
    })
  }
})
let reg = /\/\*\*.+\*\//
console.log(reg.test(`/**
*  from b.js
*  reated by jzs on 2048
*
*  from b.js
*  reated by jzs on 2048
*
*  from b.js
*  reated by jzs on 2048
*/`),222)
