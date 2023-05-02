// custom-tab-bar/index.js
import { storeBindingsBehavior } from "mobx-miniprogram-bindings";
import { store } from "../store/store";

Component({
  behaviors: [storeBindingsBehavior],
  storeBindings: {
    store,
    fields: {
      active: "active",
      all: "allCount"
    },
    actions: {
      'changeActive': "changeActive"
    }
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },
  observers: {
    "all": function (all) {
      console.log("触发",all);
      console.log(this);
      this.setData({
        "list[1].info": all
      })
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    "list": [
      {
      "pagePath": "/pages/home/home",
      "text": "主页",
      "iconPath": "/images/home.png",
      "selectedIconPath": "/images/home-active.png"
      },
      {
        "pagePath": "/pages/message/message",
        "text": "信息",
        "iconPath": "/images/message.png",
        "selectedIconPath": "/images/message-active.png",
        "info": 0
      },
      {
          "pagePath": "/pages/contact/contact",
          "text": "联系我",
          "iconPath": "/images/contact.png",
          "selectedIconPath": "/images/contact-active.png"
      }
    ]
  },


  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event) {
      // event.detail 的值为当前选中项的索引
      // console.log(event,"event");
      // console.log(event);
      // this.setData({ active: event.detail });
      this.changeActive(event.detail)
      wx.switchTab({
        url: this.data.list[event.detail].pagePath
      })
    }
  }
})
