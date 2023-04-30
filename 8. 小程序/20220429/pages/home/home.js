// pages/home/home.js
Page({
  // options: {
  //   multipleSlots: true
  // },
  /**
   * 页面的初始数据
   */
  data: {
    transportData: 10,
    count:  1
  },
  add () {
    this.setData({
      count: this.data.count + 1
    })
  },
  addByChild () {
    const child = this.selectComponent(".test")
    // child.setData({
    //   count: child.data.count + 1 
    // })
    child.add()
  },
  addChild () {
    this.setData({
      count: this.data.count + 1
    })
    console.log(this.selectComponent("#test"));
    console.log(this.selectComponent(".test"));
  },
  addSync (e) {
    console.log(e,"addSync");
    this.setData({
      count: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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