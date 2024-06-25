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

- 1. 在 package.json 中声明 bin 字段
- 2. 通过 `npm link` 将命令 link 到全局
- 3. 执行 `su-island dev` 命令
