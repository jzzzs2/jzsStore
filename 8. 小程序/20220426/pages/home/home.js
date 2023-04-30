// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperList: [],
    btnList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getSwipers() {
    wx.request({
      url: "https://www.escook.cn/slides",
      method: "GET",
      success: (res) => {
        // console.log(res.data,"data");
        this.setData({
          swiperList: res.data
        })
      }
    })
  },
  getBtns() {
    wx.request({
      url: "https://www.escook.cn/categories",
      method: "GET",
      success: (res) => {
        // console.log(res.data,"data");
        this.setData({
          btnList: res.data
        })
      }
    })
  },
  jumpContact() {
    wx.switchTab({
      url: "/pages/contact/contact",
      success: () => {
        console.log("jump success");
      },
      complete: () => {
        console.log("jump compelete");
      },
      fail: () => {
        console.log("jump fail");
      }
    })
  },
  jumpInfo () {
    wx.navigateTo({
      url: "/pages/info/info"
    })
  },
  jumpInfoSec () {
    wx.navigateTo({
      url: "/pages/info/info?name=jzs&age=22"
    })
  },
  jumpMessage () {
    wx.reLaunch({
      url: '/pages/message/message?name=jzs&age=22',
    })
  },
  onLoad(options) {
    this.getSwipers()
    this.getBtns()
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