/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-02 13:30:25
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-02 20:45:50
 */
(function (win) {
  let $cont = $("#app");
  // let $down = $("");
  class PullDown {
    constructor(callback) {
      this.pulling = false;
      this.loading = false;
      this.startX = 0;
      this.startY = 0;
      this.diffY = 0;
      this.callback = callback;
      this.initEvent();
    }
    initEvent() {
      initEvents(this);
    }
  }
  let lock = false;
  let funcMap = {
    
    touchstart: function (e, target) {
      if (e.target.parentElement !== document.querySelector("ul")) {
        return false;
      }
      console.log("start");
      lock = true;
      target.startX = e.touches[0].pageX;
      target.startY = e.touches[0].pageY;
    },
    touchmove: function (e, target) {
      let diffX = e.touches[0].pageX - target.startX;
      let diffY = e.touches[0].pageY - target.startY;

      //判断是否是下滑 并且 需要在顶端时下滑
      let isTop = document.documentElement.scrollTop;
      if (isDown(e.touches[0].pageX, target.startX, e.touches[0].pageY, target.startY) && isTop === 0 && lock) {
        console.log("下滑了耶");
        target.pulling = true;
        target.diffY = diffY;
        translate(diffY);
      }
    },
    touchend: function (e, target) {
      if (target.diffY > 50 && lock) {
        console.log("可以执行了捏");
        target.callback();
      }
      lock = false;
    }
  }
  function initEvents(target) {
    $(window).on("touchstart touchmove touchend", function (e) {
      if (funcMap[e.type]) {
        funcMap[e.type](e, target);
      }
    })
  }
  function translate(y) {
    console.log("translate执行");
    if (y > 70) {
      y = 70;
    }
    console.log(y);
    // $cont.css({ "transform": `translate(0px,${y}px)` })
    // $(this.$content).css({
    //   transform: `translate(0,${diffY}px) translateZ(0)`
    // })
    // $cont.css("transform",`translate(0px,${y}px) translateZ(0)` );
  }
  function operateLoad(target) {
    setTimeout(() => {
      target.callback();
      target.loading = false;
      $(document.body).css("overflow", "auto");
    }, 500);
  }
  function isDown(x, oldX, y, oldY) {
    let diff = (y - oldY) - Math.abs((x - oldX));
    if (y - oldY > 0 && (diff > (Math.abs((x - oldX)) / 2))) {
      return true;
    }
    return false;
  }
  win.PullDown = PullDown;
})(window)
