# Promise 的一些理解

1. ### **什么是 Promise?**

> Promise 是 ES6 中提出，用来解决 JS 中异步编程的一种方法。

2. ### **Promise 解决了什么**

   由于 js 是单线程执行的比如：

   `setTimeout(()=>{`

   ​ &nbsp;&nbsp;`console.log(1);`

   `},1000);`

   `console.log(2);`

   在浏览器中输出的顺序是 2，1。

   在 js 中我们常用来解决异步的方式是回调函数，比如：

   `$.ajax(()={`

   &nbsp;&nbsp;`//你要执行的操作-`

   `});`

   然而这样有个问题就是一旦回调函数变多，就容易形成回调地狱

   `$.ajax(()=>{`

   ​&nbsp;&nbsp;`$.ajax(()={`

   ​&nbsp;&nbsp;&nbsp;&nbsp;`.....`

   ​&nbsp;&nbsp; `})`

   `})`

   这样做就存在如下问题

- 代码逻辑书写顺序与执行顺序不一致，不利于阅读与维护。
- 异步操作的顺序变更时，需要大规模的代码重构。
- 回调函数基本都是匿名函数，bug 追踪困难。
- 回调函数是被第三方库代码（如上例中的 ajax ）而非自己的业务代码所调用的，造成了 IoC 控制反转。

**promise 就是用来解决这些问题的**

3.  ### **开始使用**

首先我们可以通过 `new Promise`来创建一个 promise 对象

`var p=new Promise((resolve,reject)=>{`
`//一些操作，`
`if(true){`
`resolve();`
`}else if(false){`
`reject();`
`}`
`});`

​ `p.then(() => {`
​ `// 如果p的状态被resolve了，就进入这里`
​ `}, () => {`
​ `// 如果p的状态被reject`
​ `})`

第一代码是用 new 生成了一个`promise`的实例，第二段代码是调用了`promise`的`then()`方法。

1. #### 构造实例

   - 构造函数接受一个函数作为参数
   - 调用构造函数得到实例 p 的同时，作为参数的函数会立即执行
   - 参数函数接受两个回调函数参数 resolve 和 reject
   - 在参数函数被执行的过程中，如果在其内部调用 resolve，会将 p 的状态变成 fulfilled，或者调用 reject，会将 p 的状态变成 rejected

2. #### 调用`then`方法

- 调用.then 可以为实例 p 注册两种状态回调函数

- 当实例 p 的状态为 fulfilled，会触发第一个函数执行

- 当实例 p 的状态为 rejected，则触发第二个函数执行

有了`promise`对于上面的回调地狱我们就可以改写为

`ajax1()`

`.then(ajax2)`

`.then(ajax3)`

`.then(ajax4);`

​ 代码是线性的，流程清晰，阅读起来也比较舒适。
