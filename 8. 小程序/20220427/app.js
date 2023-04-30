// app.js
App({
  onLaunch(options) {
    console.log("小程序初始化 执行一次",options,"options代表小程序当前页的一些信息");
  },
  onShow(options) {
    console.log("小程序显示",options);
  },
  onHide() {
    console.log("小程序隐藏");
  },

})
