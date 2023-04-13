/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-02-13 14:49:09
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-02-13 16:55:35
 */
import wangEditor from "wangeditor"
const URL = "http://127.0.0.1:3000/upload/article"
const key = "token"
const store = require("store")
export default class Editor {
  constructor() {
    this.editor = null
  }
  init() {
    this.editor = new wangEditor(".blog-edit--wrap")
    this.editor.config.uploadImgServer = URL
    this.editor.config.uploadImgMaxSize = 10 * 1024 * 1024
    this.editor.config.uploadImgAccept = ['jpg', 'jpeg', 'png', 'gif', 'bmp']
    this.editor.config.uploadImgMaxLength = 1 // 一次最多上传 5 个图片
    this.editor.config.uploadFileName = 'file'
    this.editor.config.focus = false
    this.editor.config.uploadImgHeaders = {
      Authorization: store.get(key)
    }
  }
  create() {
    this.editor.create()
  }
}