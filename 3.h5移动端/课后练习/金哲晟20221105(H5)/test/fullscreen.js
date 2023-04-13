/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-11-05 19:39:00
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-11-05 20:01:18
 */
(function(){
  const requestFullScreenArr = ["requestFullscreen","webkitRequestFullScreen","mozRequestFullScreen","msRequestFullscreen"];
  const exitFullScreenArr = ["exitFullscreen","webkitExitFullScreen","mozExitFullScreen","msExitFullscreen"];
  // const isFullScreenArr = ["fullscreenElement","webkitFullscreenElement","mozFullScreenElement","msFullscreenElement"];
  let isFullScreen = false;

  const changeFullScreen = function(element){
    let arr = isFullScreen?exitFullScreenArr:requestFullScreenArr;
    for(const item of arr){
      if(item in element){
        element[item]()
        break;
      }
    }
  }

  const keyDown = function(event){
    event = event || window.event;
    if (event.keyCode === 122) {
      // 禁用f11
      event.returnValue = false;
      changeFullScreen(document.documentElement);
    }
  }

  // 关闭全屏调用者必须是document,开启全屏调用者可以是普通元素
  const changeIsFullScreen = function(e){
    isFullScreen = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement
    fullscreenElementEvent(isFullScreen)
  }
  
  window.addEventListener('keydown', keyDown, true);
  window.addEventListener('resize', changeIsFullScreen, false);

  window.changeFullScreen = changeFullScreen;
})()