// pages/message/message.js
import {createStoreBindings} from "mobx-miniprogram-bindings"
import {store} from "../../store/store"
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  addCountOne (e) {
    const step = e.target.dataset.step
    this.updateOne(step)
  },
  addCountTwo (e) {
    const step = e.target.dataset.step
    this.updateTwo(step)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    this.storeBindsObj = createStoreBindings(this,{
      store,
      fields: ["name","age","addr","info","count1","count2"],
      actions: ["updateOne","updateTwo"]
    })  
    // const res = await wx.p.request({
    //   url: "https://www.escook.cn/api/get",
    //   method: "GET",
    //   data: {
    //     name: "jzs",
    //     age: 999
    //   }
    // })
    // console.log(res.data,"res");
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    this.storeBindsObj.destroyStoreBindings()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})