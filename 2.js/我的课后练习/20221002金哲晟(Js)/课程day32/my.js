/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-09-23 21:18:50
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-10-02 17:11:20
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
    ele.style.transition = "0";
  }
}