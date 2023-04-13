/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-18 18:08:18
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-18 18:17:50
 */
let bf = Buffer.from("金哲晟")
console.log(bf);
bf = Buffer.alloc(10)
console.log(bf);
bf = Buffer.alloc(6,'a')
console.log(bf);
console.log(bf.toString("utf8"));
console.log(bf.toString("utf8",1,3));
console.log(bf.toJSON()); //{type:"buffer",data: []}
let bf2 = Buffer.from("你好")
console.log(Buffer.concat([bf2,bf]).toString()); //你好aaaaaa
console.log(Buffer.compare(bf,bf2)); // -1
console.log(Buffer.compare(bf,bf)); // 0
console.log(bf2.slice(0,3).toString());
//copy a.copy(b,bStart,aStart,aEnd)
let c = Buffer.from("可爱捏")
let food = Buffer.from("面")
console.log(food.copy(c,0,0,3));
console.log(c.toString());
console.log(food.toString());

