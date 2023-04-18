/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-04-18 16:44:32
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-04-18 16:46:04
 */
import {  ref, onMounted} from "vue";
export default function getPosition() {
  const x = ref(-1)
  const y = ref(-1)
  const showPosition = function (e: MouseEvent) {
    // console.log(e,"e");
    x.value = e.pageX
    y.value = e.pageY
  }
  onMounted(() => {
    document.addEventListener("click", showPosition)
  })
  return {
    x,
    y
  }
}