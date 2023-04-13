/*
 * @Descripttion: 
 * @version: 
 * @Author: sueRimn
 * @Date: 2022-12-12 20:09:12
 * @LastEditors: sueRimn
 * @LastEditTime: 2022-12-12 21:01:53
 */
let path = require("path")
//获取文件全名
console.log(path.basename("./app/demo/test.js"))
console.log(path.basename("d:\\test\\test.html"));
//获取文件后缀名
console.log(path.extname("./test/app.js"))
console.log(path.extname("d:\\test\\demo.css"));
//获取文件绝对路径的路径部分
console.log(path.dirname("d:\\test\\demo\\one.html"));
console.log(path.dirname("./app/data/tot/test.html"));
//path.delimiter window中是; posix中是:
console.log(path.delimiter);
console.log(process.env.PATH);
console.log(process.env.path.split(path.delimiter));
//parse 解析路径为一个对象
console.log(path.parse("d:\\app\\test\\eat.html"));
console.log(path.parse("c:\\app\\user\\a.js").root);
console.log(path.parse("c:\\app\\user\\a.js").base);
console.log(path.parse("c:\\app\\user\\a.js").dir);
console.log(path.parse("c:\\app\\user\\a.js").ext);
console.log(path.parse("c:\\app\\user\\a.js").name);
//format 将一个对象格式化为一个字符串
console.log(path.format({
  root: "d:\\",
  base: "test.html",
  dir: "d:\\app\\test",
  ext: ".html",
  name: "test"
}));
//isAbsolute(path)
console.log(path.isAbsolute("/fpp/app.html")); //true
console.log(path.isAbsolute("/too/test/a.js")); //true
console.log(path.isAbsolute("test/a.html")); //false
//join 根据当前path系统环境拼装paths
console.log(path.join("d:\\","test\\a.js"));
console.log(path.join("d:/test","app","you.js"));
//normalize 返回规范路径
console.log(path.normalize("d:/test/app/a.js"));
console.log(path.normalize("/foo/bar//baz/asdf/quux/.."));
//path.sep 当前环境下 默认路径符号 window \\ posix /
console.log(path.sep); //windows环境
//path.relative(文件路径1,文件路径2)     windows环境中 ../ 表示当前目录
// console.log(path.relative(require.main.filename,module.filename));
//path.resolve() 把路径序列拼成一个绝对路径
console.log(path.resolve("app","eat/test.html"));
console.log(1)
console.log(path.resolve("/app","eat/test.html"));
console.log(path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif'))
//路径从右往左解析 如果路径还不是绝对路径 用当前工作目录路径补足
console.log(path.resolve("/a/b","/p/test.js"))
