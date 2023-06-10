/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-06-09 17:35:43
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-06-09 18:23:47
 */
import userStore from "@/store/user.ts"
import pinia from "@/store/pinia"
let userStoreObj = userStore(pinia)
export default (app:any)  => {
  app.directive('Has', {
    mounted(el:any,option:any) {
      let arr = userStoreObj.btnRoles
      // @ts-ignore
      if (!arr.includes(option.value)) {
        el.parentNode.removeChild(el)
      }
    }
  });
}