import { createServer as createViteDevServer } from 'vite';
import { pluginIndexHtml } from './plugin-island/indexHtml';
import react from '@vitejs/plugin-react';
import { PACKAGE_ROOT } from './constants';
import { resolveConfig } from './config';
import { pluginConfig } from './plugin-island/config';
import { pluginRoutes } from './plugin-routes';
/**
 * 用于创建开发服务器
 *
 * @param root 当前工作目录
 * @returns 开发服务器
 */
export async function createDevServer(
  root: string,
  restartServer: () => Promise<void>
) {
  const siteConfig = await resolveConfig(root, 'serve', 'development');
  return createViteDevServer({
    // 需要设置为su-island框架的路径,
    // 防止vite将用户的资源作为静态资源处理
    root: PACKAGE_ROOT,
    plugins: [
      pluginIndexHtml(),
      react(),
      pluginConfig(siteConfig, restartServer),
      pluginRoutes({ root: siteConfig.root })
    ],
    server: {
      fs: {
        allow: [PACKAGE_ROOT]
      }
    }
  });
}
