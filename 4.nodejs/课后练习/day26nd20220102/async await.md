## Async await 使用

```
作用:更好理解异步,promise语法糖
```

```
使用:
async声明异步函数,该函数返回值是promise
await阻塞主线程 执行当前异步任务
await放置在promise对象前,等待promise状态结果后,才会继续向后执行代码

await只能在async函数内部使用
```

```
处理抛出错误和promise为rejected情况,使用trycatch包裹,catch的参数err是reject方法调用传入参数
```



## Promise.all([p1,p2..])  Promise.race([p1,p2..])

```
类似于数组方法,every(ele => return),some(ele => return)
Promise.all,当所有promise状态是成功,才执行回调then,data参数是一个数组
Promise.race,当有一个promise状态成功,就执行回调then,剩余promise不管
他们有一个promise为rejected,就执行catch回调.
```



