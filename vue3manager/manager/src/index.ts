import SvgIcon from "@/components/SvgIcon.vue"
const arr = {SvgIcon}
export default {
  install(app :any) {
    Object.keys(arr).forEach((key) => {
      app.component(key,(arr as any)[key])
    })
  }
}