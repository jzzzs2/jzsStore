// pages/contact/contact.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    colorsList: [],
    isLoading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getColors()
  },
  getColors () {
    this.data.isLoading = true
    wx.showLoading({
      title: '在加载捏',
    })
    wx.request({
      url: "https://www.escook.cn/api/color",
      method: "GET",
      success: (res) => {
        this.setData({
          colorsList: [...this.data.colorsList,...res.data.data]
        })
      },
      complete: () => {
        wx.hideLoading()
        this.data.isLoading = false
      }
    })
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
    if (!this.data.isLoading) {
      console.log("chufa");
      this.getColors()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})