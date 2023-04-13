addEventListener('message', (e) => {
  console.log(e.data,"我是子线程接收数据");
  // console.log(window);
  // console.log(document);
  let arr = Object.keys(e.data);
  postMessage(arr);
  // close();
  // terminate(); 报错使用
}, false)
