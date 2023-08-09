import {ref,computed} from "vue"
import dayjs from "dayjs"
export default () => {
  let time = ref(0)
  let timeFormat = computed(() => {
    return dayjs.unix(time.value).format("mm分ss秒")
  })
  function start (begin) {
    time.value = begin
    setInterval( () => {
      time.value = time.value - 1
    },1000)
  }
  return {
    start,
    time,
    timeFormat
  }
}