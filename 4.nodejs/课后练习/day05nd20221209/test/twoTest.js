/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-09 17:59:43
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-09 17:59:48
 */
setImmediate(function (){
  setImmediate(function A() {
    console.log(1);
    setImmediate(function B(){
        console.log(2);
    });
  });

  setTimeout(function timeout() {
    console.log('TIMEOUT FIRED');
  }, 0);
});