/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-22 15:12:23
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-23 17:00:45
 */
(function (win) {
  function myAjax({ method = "POST", url = "http://127.0.0.1:3001", data = {}, reqType = "application/json;charset=utf8", backType = "json", success = function (data) { console.log(data); }, error = function (err) { console.log(err) },root = false }) {
    
    console.log(data);
    let xhr = new XMLHttpRequest()
    // if (root) {
    //   xhr.withCredentials = true
    // }
    method = method.toUpperCase()
    if (backType === "jsonp") {
      let funcName = "fn" + Date.now()
      let sc = document.createElement("script")
      // src = url + `?${formatQuery(data)}` + `&callback=${funcName}`
      src = url  + `?callback=${funcName}`
      console.log(src);
      sc.src = src 
      document.querySelector("head").append(sc)
      window[funcName] = function (data) {
        // console.log(data);
        success(data)
        delete window[funcName]
        sc.remove()
      }
      return false
    }
    if (method === "GET") {
      url = url + "?" + formatData(data)
      data = null
    }
    if (/json/.test(reqType)) {
      data = JSON.stringify(data)
    }
    if (/application\/x-www-form-urlencoded/.test(reqType)) {
      data = formatQuery(data)
      console.log(data,"value");
    }
    xhr.open(method, url, true)
    if (!/multipart\/form-data/.test(reqType)) {
      xhr.setRequestHeader("Content-Type", reqType)
    }

    xhr.responseType = backType
    // xhr.responseType = "html"
    xhr.send(data)
    xhr.onreadystatechange = function (res) {
      if (xhr.readyState === 4) {
        console.log(xhr.response,"返回值");
        success(xhr.response)
      }
    }
  }
  function formatData(dataArr) {
    return Object.fromEntries(dataArr.map(({ name, value }) => {
      return [name, value]
    }))
  }
  function formatQuery(dataObj) {
    return Object.entries(dataObj).map(([key, value]) => {
      return `${key}=${value}`
    }).join("&")
  }
  win.myAjax = myAjax
})(window)