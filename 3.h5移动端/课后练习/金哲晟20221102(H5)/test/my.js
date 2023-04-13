/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-09-23 21:18:50
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-10-29 18:40:57
 */
function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return document.querySelectorAll(selector);
}

function getIndexInParent(ele) {
  var children = ele.parentElement.children;
  for (var i = 0; i < children.length; i++) {
    if (children[i] === ele) {
      return i;
    }
  }
}
function eventListen(element, event, callback, capture) {
  capture = capture || false;
  if (element.addEventListener) {
    element.addEventListener(event, callback, capture);
  } else {
    element.attachEvent("on" + event, callback);
  }
  return {
    "remove": function () {
      if (element.removeEventListener) {
        element.removeEventListener(event, callback, capture);
      } else {
        element.detachEvent("on" + event, callback);
      }
    }
  }
}

function getPosition(element) {
  var pos = {
    left: 0,
    top: 0
  }
  while (element.offsetParent) {
    pos.left += element.offsetLeft;
    pos.top += element.offsetTop;
    element = element.offsetParent;
  }
  return pos;
}

function setStyle(dom, css) {
  for (var key in css) {
    dom["style"][key] = css[key];
  }
}

function getStyle(obj, attr) {
  return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, false)[attr];
}

function animate(ele, css, time, speed, callback) {
  speed = speed || "linear";
  ele.style.transition = `${time}ms ${speed}`;
  setStyle(ele, css);
  ele.addEventListener("transitionend", end, false)
  function end() {
    callback && callback();
    ele.removeEventListener("transitionend", end);
    ele.style.transition = "";
  }
}

// function animate(ele, css, time, speed) {
//   speed = speed || "linear";
//   ele.style.transition = `${time}ms ${speed}`;
//   setStyle(ele, css);
//   ele.addEventListener("transitionend", end, false)
//   function end() {
//     ele.style.transition = "0";
//   }
// }
// function animate(ele, json, callback) {
//   // clearInterval(ele.intervalOut);
//   ele.intervalOut = setInterval(function () {
//     var toggle = true;
//     for (var key in json) {
//       var startValue = parseInt(getStyle(ele, key));
//       var endValue = parseInt(json[key]);
//       var speed = (endValue - startValue) / 10;
//       speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
//       console.log(speed,"speed");
//       console.log(ele.style[key],"ele");
//       ele.style[key] = startValue + speed + "px";
//       if (parseInt(ele.style[key]) !== endValue) {
//         toggle = false;
//       }
//     }
//     if (toggle) {
//       clearInterval(ele.intervalOut);
//       callback && callback();
//     }
//   }, 1000 / 60)
// }