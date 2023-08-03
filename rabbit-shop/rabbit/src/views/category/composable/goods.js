/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-08-01 15:28:37
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-08-01 15:33:48
 */
import { onMounted, ref } from "vue"

import { useRoute, onBeforeRouteUpdate } from "vue-router"
import { reqCategoryTwo } from "@/api/layout.js"
export function useGoods() {
  let $route = useRoute()
  let typeData = ref({})
  let getCategoryTwo = async (id) => {
    let result = await reqCategoryTwo(id)
    if (result.code == 1) {
      typeData.value = result.result
    }
  }
  //路由改变时修改分类数据 
  onBeforeRouteUpdate((to) => {
    getCategoryTwo(to.params.id)
  })
  onMounted(async () => {
    getCategoryTwo($route.params.id)
  })
  return {
    typeData
  }
}