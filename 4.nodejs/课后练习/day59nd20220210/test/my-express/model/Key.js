/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-02-02 16:07:59
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-02-04 14:47:22
 */
let mongoose = require("./mongoose")
const pattern = mongoose.Schema({
  content: {
    type: String
  },
  createtime: {
    type: mongoose.SchemaTypes.Date,
    default: Date.now
  }
})
const model = mongoose.model("Key",pattern)
// model.create({"content":`-----BEGIN PUBLIC KEY-----
// MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAJOANHTD6x+0LCLWx4dCDQk/iPoWhXuv
// 1fFT6rrdDxroMXMP6F4p4+YNm8fe7SaDNGKQH0LbxFJllixV58kmAx0CAwEAAQ==
// -----END PUBLIC KEY-----`}).then(data => {
//   console.log(data);
// })
module.exports = model