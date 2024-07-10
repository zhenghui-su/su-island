import compression from 'compression';
import polka from 'polka';
import { resolveConfig } from './config';
import path from 'path';
import fs from 'fs-extra';
import sirv from 'sirv';

const DEFAULT_PORT = 4173;

/**
 * 预览产物的脚本
 */
export async function preview(root: string, { port }: { port?: number }) {
  const config = await resolveConfig(root, 'serve', 'production');
  // TODO: 支持用户自定义产物目录
  const outputDir = path.resolve(root, 'build');
  const listenPort = port ?? DEFAULT_PORT;
  const notFoundPage = fs.readFileSync(
    path.resolve(outputDir, '404.html'),
    'utf-8'
  );
  const compress = compression();

  const serve = sirv(outputDir, {
    etag: true,
    maxAge: 31536000,
    immutable: true,
    setHeaders(res, pathname) {
      if (pathname.endsWith('.html')) {
        // html文件不做缓存
        res.setHeader('Cache-Control', 'no-cache');
      }
    }
  });

  const onNoMatch: polka.Options['onNoMatch'] = (req, res) => {
    res.statusCode = 404;
    res.end(notFoundPage);
  };

  polka({ onNoMatch })
    .use(compress, serve)
    .listen(listenPort, (err) => {
      if (err) {
        throw err;
      }
      console.log(
        `> Preview server is running at http://localhost:${listenPort}`
      );
    });
}
