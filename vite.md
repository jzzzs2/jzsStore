## vite 构建工具



```
1. vite是构建工具, create-vite 是使用vite的项目脚手架
```

```
2.vite和webpack相比区别:
webpack支持多种模块化,编译前要commonJs和ESModule两种语法统一,当项目大了以后,运行速度比较慢.
vite基于ESModule.
```

```
3.依赖预构建
首先vite会先找到对应依赖,然后调用esbuild(js语法处理库),将代码转化为esmodule规范代码集成,保存在node_modules/.vite/deps
下.
解决了三个问题:
1.第三方包导入导出格式不同
2.编译后的包会放在node_modules/.vite/deps
node_modules/.vite/deps
node_modules/.vite/deps下. 下,可通过.vite/deps访问,方便路径重写.
3.网络多包传输性能问题,资源import引入过多次,请求过多
```

