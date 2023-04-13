/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2023-01-05 20:24:17
 * @LastEditors: sueRimn
 * @LastEditTime: 2023-01-05 22:32:59
 */
// let reg = /[\d\s]/
// let reg = /[\n]/
// let reg = /[\\]/
// let reg = /[\\p]/
let reg = /\\\\/
// console.log(reg.test(2));
// console.log(reg.test(" 2"));
// console.log(reg.test("a"));
// console.log(reg.test("n"));
// console.log(reg.test("\\"));
// console.log(reg.test("p"));
// console.log(reg.test("\\p"));
console.log(reg.test("\\\\"));
// console.log(reg.test(" "));
// console.log(reg.test(`
// `));