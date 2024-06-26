import cac from 'cac';
import { createDevServer } from './dev';
import { build } from './build';
import { resolve } from 'path';

// 创建cli
const cli = cac('su-island').version('0.0.1').help();

// 添加dev命令
cli
  .command('[root]', 'start dev server')
  .alias('dev')
  .action(async (root: string) => {
    // 创建开发服务器
    const server = await createDevServer(root);
    // 监听端口
    await server.listen();
    // 打印启动后信息
    server.printUrls();
  });

// 添加build命令
cli
  .command('build [root]', 'build in production')
  .action(async (root: string) => {
    root = resolve(root);
    await build(root);
  });

// 解析命令
cli.parse();

// 调试 CLI:
// 1. 在 package.json 中声明 bin 字段
// 2. 通过 npm link 将命令 link 到全局
// 3. 执行 island dev 命令
