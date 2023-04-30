// components/comunicate/comunicate.js
const behavior = require("../../behavior/behavior")
Component({
  behaviors: [behavior],
  /**
   * 组件的属性列表
   */
  properties: {
    count: {
      type: Number,
      value: 10
    }
  },
  
  /**
   * 组件的初始数据
   */
  data: {
    name: 'zjc',
    age: 99,
    obj: {
      name: "jzs"
    }
  },
  lifetimes: {
    ready() {
      console.log(this,"this");
      this.getName()
    },
    created() {
      console.log("created inner");
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    test() {
      console.log("test");
    },
    getName () {
      console.log("commnicate");
    },
    add () {
      this.setData({
        count: this.properties.count + 1
      })
      this.triggerEvent("sync",{value: this.properties.count,test: this.test})
    }
  }
})
