/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-05 16:51:30
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-02-07 18:27:08
 */
const NodeRSA = require("node-rsa")
const path = require("path")
const fs = require("fs")
// console.log(process.cwd());
const pathName = path.join(process.cwd(), "/auth")
function geneKeys() {
  const newkey = new NodeRSA({ b: 512 })
  newkey.setOptions({ encryptionScheme: "pkcs1" })
  let public_key = newkey.exportKey("pkcs8-public")
  let private_key = newkey.exportKey("pkcs8-private")
  // let public_key2 = newkey.exportKey("pkcs8-public")
  // console.log(public_key2);
  // console.log(public_key, "public");
  // console.log(private_key, "private");
  fs.writeFileSync(path.join(pathName, "public.cer"), public_key)
  fs.writeFileSync(path.join(pathName, "private.cer"), private_key)
}
// geneKeys()
function encrypt(cont) {
  // console.log(path.join(pathName,"public.cer"),"path");
    let publicKey = fs.readFileSync(path.join(pathName, 'public.cer'), 'utf8');
    // let privateKey = await fs.readFile(path.join(pathName, "private.cer"))
    let nodersa = new NodeRSA(publicKey)
    nodersa.setOptions({
      encryptionScheme: "pkcs1"
    })
    const result = nodersa.encrypt(cont, "base64")
    console.log("result en",result);
    return result

}
// console.log(decrypt("D2TJ+cojACDGm+zGuxYL6OB4FUSUvfC3JaPuVQCUDR67PIoJwcmFvGUgyTM4u7RdOSJZrW8190JC39G3K7WcjQ=="));
// console.log(encrypt("fdsfs"));
// encrypt("fdsfs343").then(function (data) {
//   console.log(data);
// })
function decrypt(code) {
  let privateKey = fs.readFileSync(path.join(pathName, 'private.cer'), 'utf8')
  let nodersa = new NodeRSA(privateKey)
  nodersa.setOptions({
    encryptionScheme: "pkcs1"
  })
  let result = nodersa.decrypt(code,"utf8")
  console.log("result de",result);
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
  geneKeys,
  encrypt,
  decrypt
}