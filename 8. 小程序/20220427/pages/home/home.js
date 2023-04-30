// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log("只在页面开始加载时执行一次,类比created");
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    console.log("只在页面初次渲染完成时执行一次 类比mounted");
    wx.setNavigationBarTitle({
      title: 'test keainie',
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    console.log("页面显示");
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    console.log("页面隐藏");
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  
  onUnload() {
    console.log("只在页面卸载时执行一次");
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  
  onReachBottom () {
    console.log("滚动条快拉至底部 触发");
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})