/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-09-20 18:04:26
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-09-20 19:05:19
 */
function $(select) {
  return document.querySelector(select);
}

function $$(select) {
  return document.querySelectorAll(select);
}

function createElement(tag) {
  return document.createElement(tag);
}