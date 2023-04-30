// pages/shoplist/shoplist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    query: {},
    shopList: [],
    page: 1,
    size: 10,
    total: 0,
    isLoading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      query: options
    })
    this.getShopList()
  },
  getShopList() {
    this.data.isLoading = true
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: `https://www.escook.cn/categories/${this.data.query.id}/shops`,
      method: "GET",
      data: {
        _page: this.data.page,
        _limit: this.data.size
      },
      success: (res) => {
        console.log(res,"res");
        this.setData({
          shopList: [...this.data.shopList,...res.data],
          total: Number(res.header["X-Total-Count"])
        })
      },
      complete: (res) => {
        wx.hideLoading()
        this.data.isLoading = false
        wx.stopPullDownRefresh()
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wx.setNavigationBarTitle({
      title: this.data.query.title,
    })
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
    // console.log("refresh");
    this.setData({
      page: 1,
      total: 0,
      shopList: []
    })
    this.getShopList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    // console.log("bottom");
    if(this.data.page*this.data.size >= this.data.total) {
      wx.showToast({
        title: '已经没有数据了'
      })
      return
    }
    if(this.data.isLoading) return
    this.setData({
      page:  this.data.page + 1
    })
    this.getShopList()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})