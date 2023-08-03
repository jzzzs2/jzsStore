/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-07-31 18:59:35
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-07-31 19:07:02
 */
import {useIntersectionObserver} from "@vueuse/core"
export default {
  install: (app) => {
    app.directive("img-lazy",(el,binding) => {
      const { stop } = useIntersectionObserver(
        el,
        ([{ isIntersecting }]) => {
          // console.log(binding.value,isIntersecting);
          if (isIntersecting) {
            el.src = binding.value
            stop()
          }
        },
      )
    })
    
  }
}