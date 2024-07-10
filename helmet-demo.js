// 用于演示为何不用 react-helmet

const task = async () => {
  return new Promise((resolve) => {
    // eslint-disable-next-line no-undef
    setTimeout(() => {
      resolve();
    }, 20);
  });
};
// react-helmet 使用的是一个全局的单例对象
const helmetStatic = {};

const renderToString = (title) => {
  helmetStatic.title = title;
};

async function renderPages() {
  return Promise.all(
    [1, 2, 3].map(async (title) => {
      // 1. renderToString
      renderToString(title);
      // 2. 执行异步操作
      await task();
      // 3. 拼接 HTML
      return `<html><head>${helmetStatic.title}</head></html>`;
    })
  );
}
// eslint-disable-next-line no-undef
renderPages().then(console.log);
// 跟 build.ts 里的逻辑类似
// 我们执行 renderPages 来进行 SSG，渲染了三个页面
// 按常理来说，最后应该输出三个 title 分别为 1、2、3 的 HTML 字符串
// 但实际上结果不是这样
// 问题就出在 renderToString 之后有异步任务的操作
// 加上我们采用了 Promise.all 进行任务并发
// 那么在执行完第一个页面的 renderToString 之后
// Node.js 遇到了一个异步任务，会紧接着会执行第二个页面的 renderToString
// 然后修改 helmetStatic 这个对象的数据。
// 同样的，当第二个页面的 renderToString 执行完
// 遇到了一个异步任务，紧接着会执行第三个页面的 renderToString
// 那么当第一个页面的异步任务执行之后，拼接 HTML 字符串的时候
// 发现 helmetStatic 中的数据已经其它页面的渲染过程更改了
// 所以最后的 HTML 结果并不符合我们的预期
// 也就是说，不同页面的渲染过程存在数据污染的问题
// 那么，我们怎么样来解决这个问题呢？
// 很简单，我们给每一个页面的渲染过程单独定制一个上下文对象
// 而不再是使用全局的单例对象，而 react-helmet-async 就是用这样的方式来实现的。
