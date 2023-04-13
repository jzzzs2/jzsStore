/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-02-14 17:51:28
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-02-14 19:56:30
 */

export default function getData(content) {
  let cover = $(".blog-edit--wrap").find("img")[0]?.src
  let classify = $(".blog-classify.selected").data("classify")
  let title = $("#title").val()
  return {
    content,cover,classify,title
  }
}