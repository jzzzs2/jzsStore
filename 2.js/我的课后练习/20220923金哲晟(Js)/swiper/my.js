/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-09-23 21:18:50
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-09-23 21:35:55
 */
function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return document.querySelectorAll(selector);
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