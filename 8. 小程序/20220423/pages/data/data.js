// pages/data/data.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg1: "i am msg1",
    msg2: "i am msg2",
    number: Math.random().toFixed(2),
    testNumber: 1,
    url: "/images/normal.jpg",
    count: 1,
    count2: 1,
    loop: 3,
    syncCount: 1,
    isRender: true,
    gender: "男",
    type: 0,
    listArr: ["zjc", "jzs", "keainie"]
  },
  changeRender () {
    this.setData({
      isRender: !this.data.isRender
    })
  },
  add (e) {
    console.log(this);
    this.setData({
      count: this.data.count + 1,
      count2: this.data.count2 + 2
    })
  },
  testTap(e) {
    // console.log(e,"触发Tap");
    console.log(e);
    console.log(e.detail);
    console.log(e.type,"e.type");
    console.log(e.target.dataset.info,"target");
    console.log(e.currentTarget.dataset.info,"current");
  },
  addDataset(e) {
    console.log(e,"e");
    const loop = e.target.dataset.info
    console.log(loop,"loop");
    
    this.setData({
      count: this.data.count + loop,
      count2: this.data.count2 + loop
    })
  },
  inputFnc (e) {
    console.log(e,"xxx",e.detail,"test input");
  },
  syncInputFunc (e) {
    const value = e.detail.value
    console.log(value);
    this.setData({
      syncCount: value
    })
  },
  test (e) {
    console.log(e);
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