# su-island

一款 SSG 生成框架, 用于快速搭建文档中心, 类似 vitePress

目录结构如下:

```bash
├── .husky // 用于git hooks
├── bin
│   └── island.js // bin所指脚本目录
├── docs // 文档目录-用于模拟使用者
├── e2e // e2e测试目录
├── scripts // 脚本目录
│   └── prepare-e2e.ts // 用于启动e2e相关
├── src
│   ├── node // su-island运行相关
│      ├── __text__ // 测试相关目录
│      ├── constants // 存储常量相关
│      ├── plugin-island
│          ├── config.ts // 用于返回配置文件和热更新相关
│          └── indexHtml.ts // 用于首页 html 处理返回给浏览器
│      ├── plugin-mdx
│          ├── rehypePlugins
│              ├── preWrapper.ts // rehype插件-用于改变md中大代码块编译结果
│              └── shiki.ts // rehype插件-用于代码高亮
│          ├── remarkPlugins
│              └── toc.ts // remark插件-用于生成页面内容右侧的大纲
│          ├── index.ts // 创建mdx插件
│          ├── pluginMdxHmr.ts // 用于mdx文件更新的准确获取热更新边界
│          └── pluginMdxRollup.ts // mdx插件集中rehype和remark插件
│      ├── plugin-routes
│          ├── fixtures // 单元路由测试目录
│          ├── index.ts // vite插件-用于生成约定式路由
│          ├── RouteService.test.ts // 路由服务层测试
│          └── RouteService.ts // 路由服务层
│      ├── build.ts // 打包命令相关
│      ├── cli.ts // cli 命令行相关
│      ├── config.ts // 解析用户配置文件相关
│      ├── dev.ts // 开发服务器
│      ├── index.ts // 导出默认配置
│      ├── unocssOptions.ts // unocss vite插件配置
│      └── vitePlugins.ts // 用于整合所有 vite 插件
│   ├── runtime // 运行时目录
│       ├── App.tsx
│       ├── client-entry.tsx // 客户端入口组件
│       ├── Content.tsx // 根据路由生成内容组件
│       ├── hooks.ts // 导出React-Context上下文
│       ├── index.ts // 导出所需配置
│       └── ssr-entry.tsx // 用于服务端渲染-拿到组件的html字符串
│   ├── shared // 公共共享目录
│       └── types // 公共类型目录
│   ├── theme-default // 默认主题目录
│       ├── Layout // 默认主题布局
│       └── index // 导出
├── .eslintignore
├── .eslintrc.cjs // eslint 配置
├── .gitignore
├── .npmrc // node 版本和包管理器相关
├── .prettierignore
├── .prettierrc.cjs // prettier 配置
├── commitlint.config.cjs // commitlint 配置
├── LICENSE
├── package.json
├── playwright.config.ts // playwright 配置
├── pnpm-lock.yaml
├── README.md
├── template.html // 模板html文件
├── tsconfig.json // ts配置
├── tsupconfig.ts // tsup配置
└── vitest.config.ts // vitest配置
```

启动开发服务器运行:

```bash
su-island dev
```

运行打包命令:

```bash
su-island build docs
```

这将生成打包目录 build 到 docs 下

运行如下命令进行预览

```bash
su-island preview docs
```

tsup 编译运行监控命令:

```bash
pnpm dev
```

su-island 为什么要使用 tsup:

- 我们使用在 build 里使用`import ora from 'ora'`导入, 用`tsc -w`运行, 然后打包会报错
- 我们查看/dist/node/build.js, 会发现 ora 是通过 require 方式引入的, 而 ora 是一个 esm 的包, 因此这里会报错
- 值得注意的是 esm 可以导入 cjs 包, 反之则不行
- 根本原因: 模块加载机制不同, CJS 同步加载, ESM 异步加载

调试 cli 如下:

- 在 package.json 中声明 bin 字段
- 通过 `npm link` 将命令 link 到全局
- 执行 `su-island dev` 命令

su-island 使用 vitest 执行单元测试:

```bash
pnpm test:unit
# 开启 vitest ui界面
pnpm test:init
```

su-island 使用 playwright 执行 e2e 测试:

```bash
pnpm test:e2e
```

在执行 e2e 测试之前, 我们建议您使用如下命令暂行下载无头浏览器:

```bash
pnpm prepare:e2e
```

# LICENSE

[MIT](https://github.com/zhenghui-su/su-island/blob/master/LICENSE)
Copyright (c) 2024 suzhenghui
