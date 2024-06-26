import { Plugin } from 'vite';
import { readFile } from 'fs/promises';
import { CLIENT_ENTRY_PATH, DEFAULT_HTML_PATH } from '../node/constants';

/**
 * 自定义 vite 插件, 用于首页 html 处理返回给浏览器
 */
export function pluginIndexHtml(): Plugin {
  return {
    name: 'island:index-html',
    // 自动插入 script 标签
    transformIndexHtml(html) {
      return {
        html,
        tags: [
          {
            tag: 'script',
            attrs: {
              type: 'module',
              src: `/@fs/${CLIENT_ENTRY_PATH}`
            },
            injectTo: 'body'
          }
        ]
      };
    },
    configureServer(server) {
      return () => {
        server.middlewares.use(async (req, res, next) => {
          // 1. 读取模板 html 文件
          let html = await readFile(DEFAULT_HTML_PATH, 'utf-8');

          try {
            // 2. 用 vite 转换 html
            html = await server.transformIndexHtml(
              req.url,
              html,
              req.originalUrl
            );
            // 3. 返回给浏览器
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(html);
          } catch (e) {
            return next(e);
          }
        });
      };
    }
  };
}
