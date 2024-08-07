import cac from 'cac';
import { build } from './build';
import { resolve } from 'path';
import { resolveConfig } from './config';
import { CLIServeOption, preview } from './preview';

// 创建cli
const cli = cac('su-island').version('0.0.1').help();

// 添加dev命令
cli
  .command('[root]', 'start dev server')
  .alias('dev')
  .action(async (root: string) => {
    // 创建服务器-同时用于热更新重启服务器
    const createServer = async () => {
      // cli 的产物其实在 dev 的产物目录下
      const { createDevServer } = await import('./dev.js');
      // 创建开发服务器
      const server = await createDevServer(root, async () => {
        // 关闭之前的服务器
        await server.close();
        // 重新创建服务器
        await createServer();
      });
      // 监听端口
      await server.listen();
      // 打印启动后信息
      server.printUrls();
    };
    // 首次启动服务器
    await createServer();
  });

// 添加build命令
cli
  .command('build [root]', 'build in production')
  .action(async (root: string) => {
    try {
      root = resolve(root);
      const config = await resolveConfig(root, 'build', 'production');
      await build(root, config);
    } catch (e) {
      console.log(e);
    }
  });

cli
  .command('start [root]', 'serve for production') // default command
  .option('--port <port>', 'port to use for serve')
  .option('--host <host>', '[string] specify hostname')
  .action(async (root: string, serveOptions: CLIServeOption) => {
    try {
      root = resolve(root);
      await preview(root, serveOptions);
    } catch (e) {
      console.log(e);
    }
  });
// 解析命令
cli.parse();

// 调试 CLI:
// 1. 在 package.json 中声明 bin 字段
// 2. 通过 npm link 将命令 link 到全局
// 3. 执行 island dev 命令
