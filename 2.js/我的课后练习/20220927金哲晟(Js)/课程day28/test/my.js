/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-09-23 21:18:50
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-09-24 16:58:22
 */
function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return document.querySelectorAll(selector);
}

function getIndexInParent (ele) {
  var children = ele.parentElement.children;
  for(var i = 0; i < children.length; i++) {
    if (children[i] === ele) {
      return i;
    }
  }
}
function eventListen (element, event, callback, capture) {
  capture = capture || false;
  if (element.addEventListener) {
    element.addEventListener(event, callback, capture);
  } else {
    element.attachEvent("on" + event, callback);
  }
  return {
    "remove" : function () {
      if (element.removeEventListener) {
        element.removeEventListener(event, callback, capture);
      } else {
        element.detachEvent("on"+event, callback);
      }
    }
  }
} 