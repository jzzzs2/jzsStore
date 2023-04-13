/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-13 17:16:19
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-13 18:22:41
 */
//Buffer.from(str)
let x = Buffer.from("nihao")
//Buffer实例对象 存放二进制的缓冲区
console.log(x)
//Buffer.alloc(byteNum,fill) 总字节数 普通字符一个字节 汉字3个字节 
let y = Buffer.alloc(4, 2)
console.log(y);
let z = Buffer.alloc(6, "eat")
console.log(z);
let t = Buffer.alloc(6,"你")
console.log(t);
let e = Buffer.alloc(6)
console.log(e);
//write(str,writeBegin,writeLength,encoding)
let test = Buffer.alloc(8,64)
let len = test.write("hello world", 3, 3,"utf8")
// console.log(test);
// console.log(test.toString());
// console.log(len);
test.write("eat",0,4)
console.log(test.toString());
for (let i = 0; i < test.length; i++) {
  console.log(test[i]);
}
//[2,6)
console.log(test.toString("utf-8", 2, 6));
console.log(test.toString("ascii", 2, 6));
//buffer => json  toJSON()
let jsonBuf = test.toJSON()
console.log(jsonBuf);
console.log(test.length);
console.log(jsonBuf.type);
console.log(jsonBuf.data);
// console.log(Buffer.from("^").length);
//Buffer.concat([bf1,bf2],allLength) 一个汉字占三个字节
let b1 = Buffer.from("我")
let b2 = Buffer.from("love")
let b3 = Buffer.from("you")
console.log(Buffer.concat([b1,b2,b3]));
console.log(Buffer.concat([b1,b2,b3],5));
//buffer.compare(buffer)
let b4 = Buffer.from("hello")
let b5 = Buffer.from("hello")
b5 = Buffer.from("hello2")
b5 = Buffer.from("hell")
console.log(b4.compare(b5));
//buf.copy(targetBuffer, targetStart, sourceStart,sourceEnd)
let b6 = Buffer.from("helloworld")
let b7 = Buffer.from("keainie")
let b8 = b6.copy(b7,4,5,8)
console.log(b7.toString());
console.log(b8.toString());
//buff.slice(start,end) [,)
let b9 = Buffer.from("nihaoa")
console.log(b9);
console.log(b9.slice(0, 5).toString("utf8"));/*i am append*//*i am append*//*i am append*/