/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-05-19 18:13:29
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-05-19 18:24:59
 */
class Food {
  wrap :HTMLElement = document.querySelector("#food") as HTMLElement
  size :number
  constructor(size = 30) {
    this.size = size
    this.changePosition()
  }
  changePosition() {
    let top = Math.floor(Math.random() * this.size) * 10
    let left = Math.floor(Math.random() * this.size) * 10
    console.log(this.wrap)
    this.wrap.style.top = top + "px"
    this.wrap.style.left = left + "px"
  }
}
export default Food