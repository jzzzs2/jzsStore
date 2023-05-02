// component/test/test.js
import {storeBindingsBehavior} from "mobx-miniprogram-bindings"
import {store} from "../../store/store"
Component({
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store,
    fields: {
      // count1: "count1",
      count1: () => store.count1,
      // count2: "count2"
      count2: (store) => store.count2
    },
    actions: {
      updateOne: "updateOne",
      updateTwo: "updateTwo"
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    addOne() {
      this.updateOne(1)
    },
    addTwo() {
      this.updateTwo(1)
    }
  }
})
