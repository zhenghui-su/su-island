import { build as viteBuild, InlineConfig } from 'vite';
import type { RollupOutput } from 'rollup';
import { CLIENT_ENTRY_PATH, SERVER_ENTRY_PATH } from './constants';
import { dirname, join } from 'path';
import fs from 'fs-extra';
// import ora from 'ora';
import { pathToFileURL } from 'url';
import { SiteConfig } from 'shared/types';
import { createVitePlugins } from './vitePlugins';
import { Route } from './plugin-routes';

// 用于绕过tsc, 不让其将import的导入转为require
// const dynamicImport = new Function("m", "return import(m)")

export async function bundle(root: string, config: SiteConfig) {
  /**
   * 复用打包代码
   *
   * @param isServer 服务端渲染还是客户端渲染
   * @returns 返回 vite 打包配置
   */
  const resolveViteConfig = async (
    isServer: boolean
  ): Promise<InlineConfig> => {
    return {
      mode: 'production',
      root,
      plugins: await createVitePlugins(config, undefined, isServer),
      ssr: {
        // 将引入第三方包变为将这个包打包进产物
        noExternal: ['react-router-dom']
      },
      build: {
        ssr: isServer,
        outDir: isServer ? join(root, '.temp') : join(root, 'build'),
        rollupOptions: {
          input: isServer ? SERVER_ENTRY_PATH : CLIENT_ENTRY_PATH,
          output: {
            format: isServer ? 'cjs' : 'esm'
          }
        }
      }
    };
  };
  // 创建动画
  // const spinner = ora();
  // spinner.start('Building client + server bundles...');
  try {
    const [clientBundle, serverBundle] = await Promise.all([
      // client build
      viteBuild(await resolveViteConfig(false)),
      // server build
      viteBuild(await resolveViteConfig(true))
    ]);
    return [clientBundle, serverBundle] as [RollupOutput, RollupOutput];
  } catch (e) {
    console.log(e);
  }
}
/**
 *
 * @param render 用于将 HTML 转为字符串的函数
 * @param root 路径
 * @param clientBundle 客户端打包产物
 */
export async function renderPages(
  render: (url: string) => string,
  routes: Route[],
  root: string,
  clientBundle: RollupOutput
) {
  console.log('Rendering page in server side...');
  // 1. 找到客户端打包的入口chunk文件
  const clientChunk = clientBundle.output.find(
    (chunk) => chunk.type === 'chunk' && chunk.isEntry
  );
  return Promise.all(
    routes.map(async (route) => {
      const routePath = route.path;
      // 根组件 html 字符串代码
      const appHtml = render(routePath);
      // 拼接html, 同时将 js 代码拼入
      const html = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>title</title>
    <meta name="description" content="xxx">
  </head>
  <body>
    <div id="root">${appHtml}</div>
    <script type="module" src="/${clientChunk?.fileName}"></script>
  </body>
</html>`.trim();
      const fileName = routePath.endsWith('/')
        ? `${routePath}index.html`
        : `${routePath}.html`;
      await fs.ensureDir(join(root, 'build', dirname(fileName)));
      await fs.writeFile(join(root, 'build', fileName), html);
      // 移除ssr产物 .temp
      await fs.remove(join(root, '.temp'));
    })
  );
}

/**
 * 用于打包
 *
 * @param root 路径
 */
export async function build(root: string, config: SiteConfig) {
  // 1. bundle - client 端 + server 端
  const [clientBundle] = await bundle(root, config);
  // debugger; 可以起一个debugger terminal 来看这个客户端产物是什么样的
  // 2. 引入 ssr-entry 模块-注意是产物
  const serverEntryPath = join(root, '.temp', 'ssr-entry.js');
  // 3. 服务端渲染, 产出 HTML
  // 为了兼容Windows, 绝对路径前需要加上file前缀
  const { render, routes } = await import(
    pathToFileURL(serverEntryPath).toString()
  );
  try {
    await renderPages(render, routes, root, clientBundle);
  } catch (e) {
    console.log('Render page error.\n', e);
  }
}
