# Promise 的一些理解

1. ### **什么是 Promise?**

> Promise 是 ES6 中提出，用来解决 JS 中异步编程的一种方法。

2. ### **Promise 解决了什么**

   由于 js 是单线程执行的比如：

```javascript
   setTimeout(()=>{
    ​console.log(1);
   },1000);
    console.log(2);
```

在浏览器中输出的顺序是 2，1。

在 js 中我们常用来解决异步的方式是回调函数，比如：

```javascript
$.ajax(()={
  //你要执行的操作
});
```

然而这样有个问题就是一旦回调函数变多，就容易形成回调地狱

```javascript
   $.ajax(()=>{
    $.ajax(()={
    ​//.....
    })
   })
```

这样做就存在如下问题

- 代码逻辑书写顺序与执行顺序不一致，不利于阅读与维护。
- 异步操作的顺序变更时，需要大规模的代码重构。
- 回调函数基本都是匿名函数，bug 追踪困难。
- 回调函数是被第三方库代码（如上例中的 ajax ）而非自己的业务代码所调用的，造成了 IoC 控制反转。

**promise 就是用来解决这些问题的**

3.  ### **开始使用**

首先我们可以通过 `new Promise`来创建一个 promise 对象

```javascript
let p = new Promise((resolve, reject) => {
  let key = 10;
  setTimeout(() => {
    key = 20;
    if (key == 10) {
      resolve(key);
    } else {
      reject(key);
    }
  }, 1000);
});

​ p.then(() => {
​   // 如果p的状态被resolve了，就进入这里
​ }, () => {
​   // 如果p的状态被reject
​ })
```

第一代码是用 new 生成了一个`promise`的实例，第二段代码是调用了`promise`的`then()`方法。

1. #### 构造实例

- 构造函数接受一个函数作为参数。

- 调用构造函数得到实例 p 的同时，作为参数的函数会立即执行。

- 参数函数接受两个回调函数参数 resolve 和 reject。

- 在参数函数被执行的过程中，如果在其内部调用 resolve，会将 p 的状态变。成 fulfilled，或者调用 reject，会将 p 的状态变成 rejected。

2. #### 调用`then`方法

- 调用.then 可以为实例 p 注册两种状态回调函数

- 当实例 p 的状态为 fulfilled，会触发第一个函数执行

- 当实例 p 的状态为 rejected，则触发第二个函数执行

有了`promise`对于上面的回调地狱我们就可以改写为

```javascript
ajax1()
  .then(ajax2)

  .then(ajax3)

  .then(ajax4);
```

​ 代码是线性的，流程清晰，阅读起来也比较舒适。

如果想异步任务**并行**，则可以使用`pormise.all()`,即

```javascript
pormise.all([ajax1, ajax2, ajax3]);
```

##一些小结
3 种状态

首先，promise 实例有三种状态：

- pending（待定）
- fulfilled（已执行）
- rejected（已拒绝）

fulfilled 和 rejected 可以说是已成功和已失败，这两种状态又归为已完成状态，`Promise`只有在完成状态下才能触发回调。

`Promise`实例可以通过`resolve`和`reject`这两种方法来达到 fulfilled 或 rejected。

**Promise API**
promise 的内容分为构造函数、实例方法和静态方法

- 1 个构造函数：`new Promise`
- 2 个实例方法：`.then` 和 `.catch`
- 4 个静态方法：`Promise.all`、`Promise.race`、`Promise.resolve`和`Promise.reject`

下面逐个讲下他们的作用

1. `new Promise` 能将一个异步过程转化成 `promise` 对象。先有了 `promise` 对象，然后才有 `promise` 编程方式。
2. `.then` 用于为 `promise` 对象的状态注册回调函数。它会返回一个 `promise` 对象，所以可以进行链式调用，也就是`.then` 后面可以继续`.then`。在注册的状态回调函数中，可以通过 `return` 语句改变`.then`返回的 `promise` 对象的状态，以及向后面`.then` 注册的状态回调传递数据；也可以不使用 `return` 语句，那样默认就是将返回的 `promise` 对象 `resolve`。
3. `.catch` 用于注册 `rejected` 状态的回调函数，同时该回调也是程序出错的回调，即如果前面的程序运行过程中出错，也会进入执行该回调函数。同`.then` 一样，也会返回新的 `promise` 对象。
4. 调用 `Promise.resolve` 会返回一个状态为 `fulfilled` 状态的 `promise` 对象，参数会作为数据传递给后面的状态回调函数

```javascript
Promise.resolve("hello").then(function(value) {
  console.log(value);
});

// 相当于
const promise = new Promise(resolve => {
  resolve("hello");
});
```

5. `Promise.reject` 与 `Promise.resolve` 同理，区别在于返回的 `promise` 对象状态为 `rejected`



# **async/await 的一些理解**

ES7提出的asyc函数，可以说是javascript异步操作的终极解决方案

### **1. 语法**
**async作为一个关键字放在函数之前，async函数返回一个Promise对象**
``` javascript 
 async function f(){
    //.......
 }
```
`async`函数内部return返回的值。会成为`then`方法回调函数的参数。

```javascript 
async function f(){
 return 'hello world';
 }
f().then(res=>console.log(res)); //hello world
```
如果`async`函数内部抛出异常，则会导致返回的`Promise`对象状态变为`rejected`。抛出的错误会被`catch`方法接收到。

```javascript
async function f(){
 throw new Error('error');
 }
f().then(res=>{console.log(res});
.catch(e=>console.log(e));
```

async返回的Promise对象，必须等到内部所有的await命令的Promise对象执行完，才会发生状态改变。
**也就是说，只有`async`函数内部的异步操作都执行玩，才会执行`then`方法的回调**
```javascript 
      const key = function(time) {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve();
          }, time);
        });
      };

      async function f() {
        await key(2000);
        await key(1000);
        await key(3000);
        return "hello";
      }
      f().then(res => {
        console.log(res); //6秒后输出hello
      });
```

一般情况下`await`后面跟着的是一个`Promise`对象,如果不是，则会被`Promise.resolve()`转换为一个`Promise`
如：
```javascript 
async function f(){
   return await 1;
}
f().then(res=>{
   console.log(res) //1
});
```
如果返回的是rejected状态,则会被`catch`方法捕获。
### **2. 错误处理**
由于`async`的特性,代码中有时会出现一些意外情况
比如：
```javascript 
let a;
async function f() {
    await Promise.reject("error");
    a = await 1; // 这段 await 并没有执行
}
f().catch(e => console.log(a)); //undefined
```
可以使用 `try/catch`
```javascript 
let a;
async function f(){
    try{
       await Promise.reject('err')
    }catch(error){
       console.log(error);
    }
    a=await 1;
    return a
}

f()
  .then(res=>console.log(a)) //1
  .catch(e=>console.log(e)); //err
```