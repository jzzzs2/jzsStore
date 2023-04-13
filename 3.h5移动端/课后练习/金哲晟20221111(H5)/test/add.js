/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-11-11 20:14:23
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-11-11 20:22:14
 */
function fb(idx) {
  if (idx === 0) {
    return 0;
  }
  if (idx === 2 || idx === 1) {
    return 1;
  }
  return fb(idx - 1) + fb(idx - 2) + fb(idx - 3);
}