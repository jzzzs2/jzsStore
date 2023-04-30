// components/test/test.js
Component({
  /**
   * 组件的属性列表
   */
  // options: {
  //   styleIsolation: "shared"
  // },
  options: {
    pureDataPattern: /^_/
  },
  pageLifetimes: {
    show () {
      console.log("show");
      this.randomColor()
    },
    hide () {
      console.log("hide");
    },
    resize (resize) {
      console.log("resize");
    }
  },
  lifetimes: {
    created() {
      console.log("created 组件初始化 结构未添加到页面内");
    },
    attached() {
      console.log("attached 组件结构添加到页面内 数据完成初始化 但未渲染");
    },
    ready() {
      console.log("ready 组件完成渲染");
    },
    moved() {
      console.log("moved 组件位置发生改变");
    },
    detached() {
      console.log("detached 组件被删除");
    },
    error() {
      console.log("error 组件抛错执行");
    }
  },
  created() {
    console.log("old created");
  },
  attached() {
    console.log("old attached");
  },
  properties: {
    "max": {
      type: Number,
      value: 12
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    count: 0,
    one: 0,
    two: 0,
    total: 0,
    obj: {
      name: "jzs",
      age: 22,
      addr: "lanxi"
    },
    _rgb: {
      r: 0,
      g: 0,
      b: 0
    },
    fullColor: "0,0,0"
  },
  observers: {
    // "one, two": function (one,two) {
    //   console.log(one,two,"params");
    //   this.setData({
    //     total: one + two
    //   })
    // }
    // "obj.name, obj.age": function (name,age) {
    //   console.log(name,age,"监听到了对象改变");
    // }
    // "obj.**": function (options) {
    //   console.log(options,"options");
    //   console.log(this,"this");
    // }
    "_rgb.**": function (options) {
      console.log("触发监听");
      this.setData({
        fullColor: `${options.r},${options.g},${options.b}`
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    randomColor () {
      this.setData({
        _rgb: {
          r: Math.floor(Math.random()*256),
          g: Math.floor(Math.random()*256),
          b: Math.floor(Math.random()*256)
        }
      })
    },
    addR() {
      this.setData({
        "_rgb.r": this.data._rgb.r + 5 >= 255? 255: this.data._rgb.r + 5
      })
    },
    addG() {
      this.setData({
        "_rgb.g": this.data._rgb.g + 5 >= 255? 255: this.data._rgb.g + 5
      })
    },
    addB() {
      this.setData({
        "_rgb.b": this.data._rgb.b + 5 >= 255? 255: this.data._rgb.b + 5
      })
    },
    changeName () {
      this.setData({
        "obj.name": "zjc"
      })
    },
    changeAge () {
      this.setData({
        "obj.age": 999
      })
    },
    changeAddr () {
      this.setData({
        "obj.addr": "hangzhou"
      })
    },
    changeObj () {
      this.setData({
        // "obj": {}
        "obj": {
          name: "jzs",
          age: 22
        }
      })
    },
    addOne () {
      this.setData({
        one: this.data.one + 1
      })
    },
    addTwo () {
      this.setData({
        two: this.data.two + 1
      })
    },
    add () {
      console.log(this,"this");
      if (this.data.count >= this.properties.max) return
      this.setData({
        count: this.data.count + 1
      })
      this._showToast()
    },
    _showToast () {
      wx.showToast({
        title: `count = ${this.data.count}`,
      })
    },
    change () {
      this.setData({
        max: 99
      })
    }
  }
})
