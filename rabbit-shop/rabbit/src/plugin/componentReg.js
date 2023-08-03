import preview from "@/components/previewGood/index.vue"
import sku from "@/components/sku/index.vue"
export default {
  install(app) {
    app.component("XtxPreviewImage",preview)
    app.component("XtxSkuInfo",sku)
  }
}