import { createServer as createViteDevServer } from 'vite';
import { pluginIndexHtml } from '../plugin-island/indexHtml';
import react from '@vitejs/plugin-react';
import { PACKAGE_ROOT } from './constants';
/**
 * 用于创建开发服务器
 *
 * @param root 当前工作目录
 * @returns 开发服务器
 */
export async function createDevServer(root: string) {
  return createViteDevServer({
    root,
    plugins: [pluginIndexHtml(), react()],
    server: {
      fs: {
        allow: [PACKAGE_ROOT]
      }
    }
  });
}
