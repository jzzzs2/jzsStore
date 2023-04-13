/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-05 16:51:30
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-01-05 17:28:59
 */
const NodeRSA = require("node-rsa")
const path = require("path")
const fs = require("fs")
const pathName = path.join(process.cwd(), "/auth")
function geneKeys() {
  const newkey = new NodeRSA({ b: 512 })
  newkey.setOptions({ encryptionScheme: "pkcs1" })
  let public_key = newkey.exportKey("pkcs8-public")
  let private_key = newkey.exportKey("pkcs8-private")
  console.log(public_key, "public");
  console.log(private_key, "private");
  fs.writeFileSync(path.join(pathName, "public.cer"), public_key)
  fs.writeFileSync(path.join(pathName, "private.cer"), private_key)
}
// geneKeys()
async function encrypt(cont) {
  // console.log(path.join(pathName,"public.cer"),"path");
    let publicKey = fs.readFileSync(path.join(pathName, 'public.cer'), 'utf8');
    // let privateKey = await fs.readFile(path.join(pathName, "private.cer"))
    let nodersa = new NodeRSA(publicKey)
    nodersa.setOptions({
      encryptionScheme: "pkcs1"
    })
    const result = nodersa.encrypt(cont, "base64")
    return result

}
// console.log(encrypt("fdsfs"));
// encrypt("fdsfs343").then(function (data) {
//   console.log(data);
// })
async function decrypt(code) {
  let privateKey = fs.readFileSync(path.join(pathName, 'private.cer'), 'utf8')
  let nodersa = new NodeRSA(privateKey)
  nodersa.setOptions({
    encryptionScheme: "pkcs1"
  })
  let result = nodersa.decrypt(code,"utf8")
  return result
}
// encrypt("可爱捏").then(function (data) {
//   console.log(data);
//   decrypt(data).then(function (data) {
//     console.log(data,"解码");
//   })
// })
// console.log(result);
module.exports = {
  encrypt,
  decrypt
}