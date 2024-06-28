import { join, relative } from 'path';
import { SiteConfig } from 'shared/types/index';
import { Plugin } from 'vite';
import os from 'os';
import { PACKAGE_ROOT } from 'node/constants';

const SITE_DATA_ID = 'su-island:site-data';
/**
 * - 增加虚拟模块, 让前端也能拿到用户配置内容
 * - 同时监听配置文件的变化-启动热更新服务
 *
 * @param config 处理后的配置文件
 * @param restartServer 重启服务的方法
 * @returns 返回一个虚拟模块
 */
export function pluginConfig(
  sitConfig: SiteConfig,
  restartServer?: () => Promise<void>
): Plugin {
  // let server: ViteDevServer | null = null;
  return {
    name: 'su-island:site-data',
    resolveId(id) {
      if (id === SITE_DATA_ID) {
        return '\0' + SITE_DATA_ID;
      }
    },
    load(id) {
      if (id === '\0' + SITE_DATA_ID) {
        return `export default ${JSON.stringify(sitConfig.siteData)}`;
      }
    },
    config() {
      return {
        resolve: {
          alias: {
            '@runtime': join(PACKAGE_ROOT, 'src', 'runtime', 'index.ts')
          }
        }
      };
    },
    // configureServer(s) {
    //   // 将 vite 的 dev server 赋值
    //   server = s;
    // },
    // 用于监听配置文件热更新的函数
    async handleHotUpdate(ctx) {
      // 需要监听的文件
      const isWindows = os.platform() === 'win32';
      const customWatchedFiles = [
        sitConfig.configPath,
        ...sitConfig.dependencies
      ].map((file) => (isWindows ? file.replaceAll('\\', '/') : file));
      // 找寻是否是监听的文件
      const include = (id: string) =>
        customWatchedFiles.some((file) => id.includes(file));
      if (include(ctx.file)) {
        console.log(
          `\n${relative(
            sitConfig.root,
            ctx.file
          )} changed, restarting server...`
        );
        // 重启 Dev Server
        // 方案讨论:
        // 1. 插件内重启 Vite 的 dev server
        // await server.restart();
        // ❌ 没有作用，因为并没有进行 su-island 框架配置的重新读取
        // 2. 手动调用 dev.ts 中的 createServer(restart)
        // 然后每次 import 新的产物
        // ✅ 可行
        await restartServer();
      }
    }
  };
}
