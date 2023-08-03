import { reqSwiperList } from "@/api/layout.js"
import { onMounted, ref } from "vue"
export function useSwiper() {
  let swiperList = ref([])

  onMounted(async () => {
    let result = await reqSwiperList("2")
    if (result.code == 1) {
      swiperList.value = result.result
    }
  })
  return {
    swiperList
  }
}