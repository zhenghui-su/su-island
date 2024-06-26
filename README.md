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
