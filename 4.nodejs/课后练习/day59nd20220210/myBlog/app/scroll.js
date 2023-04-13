/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-02-10 17:13:28
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-02-13 11:29:29
 */
let IScroll = require("iscroll")
let Cont = document.querySelector(".blog-main-content")
Cont.addEventListener("touchmove", function (e) {
  e.preventDefault()
})
let myScroll = new IScroll(Cont, {
  scrollbars: true,
  preventDefault: true,
  disablePointer: true
});
myScroll.reset = function () {
  myScroll.refresh();
  myScroll.scroller.style.transform = 'translate(0px, 0px) translateZ(0px)'
  myScroll.absStartY = 0
  myScroll.startY = 0
  myScroll.y = 0
}
export default myScroll