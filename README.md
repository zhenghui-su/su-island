# su-island

一款 SSG 生成框架, 用于快速搭建文档中心, 类似 vitePress

目录结构如下:

```bash
.
├── bin
│   └── island.js // bin所指脚本目录
├── src
│   ├── cli.ts // 用于创建 cli 命令
│   ├── dev.ts // 用于创建开发服务器
├── package.json
├── README.md
└── tsconfig.json // ts配置
```

启动开发服务器运行:

```bash
su-island dev
```

ts 编译运行监控命令:

```bash
pnpm start
```

为什么要使用 tsup:

- 我们使用在 build 里使用`import ora from 'ora'`导入, 用`tsc -w`运行, 然后打包会报错
- 我们查看/dist/node/build.js, 会发现 ora 是通过 require 方式引入的, 而 ora 是一个 esm 的包, 因此这里会报错
- 值得注意的是 esm 可以导入 cjs 包, 反之则不行
- 根本原因: 模块加载机制不同, CJS 同步加载, ESM 异步加载

调试 cli 如下:

- 在 package.json 中声明 bin 字段
- 通过 `npm link` 将命令 link 到全局
- 执行 `su-island dev` 命令

运行打包命令:

```bash
su-island build docs
```

这将生成打包目录 build 到 docs 下

预览产物命令暂未书写, 你可以通过进入到 build 目录终端运行如下命令暂时预览

```bash
serve .
```

# LICENSE

[MIT](https://github.com/zhenghui-su/su-island/blob/master/LICENSE)
Copyright (c) 2024 suzhenghui
